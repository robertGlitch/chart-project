import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, inject } from "@angular/core";
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Observable, Subject, takeUntil } from "rxjs";
import { FlightService } from "./flight.service";
import { addCustomBackground, annotations, samAnnotationStyle, samRadiusAnnotationStyle, scalesConfig, tooltipStyles } from "./utils/chart-constants";
import { GraphPoint } from "./utils/graph-flight.points";

Chart.register(annotationPlugin);
Chart.register(ChartDataLabels);
Chart.defaults.set('plugins.datalabels', {
  display: false
});

@Component({
  selector: 'chart-display-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './chart-display.component.scss',
  template: `
      <div class="chart-container">
        <canvas id="flightChart"></canvas>
      </div>
  `
})
export class ChartDisplayComponent implements AfterViewInit, OnDestroy {
  private readonly flightService = inject(FlightService);

  @Input() flightData$!: Observable<GraphPoint[]>;
  destroyed = new Subject();


  chart!: Chart;
  initialData!: ChartData;
  flightDataset!: any;
  samActive: boolean = false;
  samFired: boolean = false;
  misslePoint: GraphPoint | null = null;

  ngAfterViewInit(): void {
    this.initialData = this.flightService.createChartDatasets();
    this.createChart();

    this.flightData$
      .pipe(takeUntil(this.destroyed))
      .subscribe(flightData => {
        this.updateFlightData(flightData);
      })


    this.flightService.samActivate$.
      pipe(takeUntil(this.destroyed))
      .subscribe(samActivate => {
        this.samActive = samActivate;
        this.chart.update();
      })

    this.flightService.samFire$.
      pipe(takeUntil(this.destroyed))
      .subscribe(samFire => {
        this.samFired = samFire
      })
  }

  private createChart() {
    this.chart = new Chart('flightChart', {
      type: 'scatter',
      data: this.initialData,
      options: this.setupChartOptions(),
      plugins: [addCustomBackground('#040624')]
    })
  }

  private setupChartOptions() {
    return <ChartOptions>{
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        ...scalesConfig
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          ...tooltipStyles,
          filter: (tooltipItem) => {
            return tooltipItem.dataset.order === 0;
          },
          callbacks: {
            label: (tooltipItem) => {
              const point = <GraphPoint>tooltipItem.dataset.data[tooltipItem.dataIndex];
              return [
                `Altitude: ${point?.flightAltitude!} m`,
                `Speed: ${point?.flightSpeed} km/h`
              ];
            }
          }
        },
        annotation: {
          annotations: {
            ...annotations,
            airDef: {
              display: () => Boolean(this.samActive),
              ...samAnnotationStyle
            },
            airDefRadius: {
              display: () => Boolean(this.samActive),
              ...samRadiusAnnotationStyle
            }
          }
        }
      }
    }
  }

  private updateFlightData(data: GraphPoint[]) {
    const index = this.chart?.data.datasets.findIndex(d => d.order === 0);
    if (index > -1) {
      if (this.samFired) {
        const targetPoint = data.find(d => d.id === null)!;
        this.misslePoint = this.calculateMissleTrajectory(targetPoint);

        if (Math.round(this.misslePoint.x) === Math.round(targetPoint.x)) {
          this.chart.data.datasets[1].data = [];
          this.flightService.fireSam(false);
          this.flightService.markeTargetHit(false);
        }
        else {
          this.chart.data.datasets[1].data = [this.misslePoint];
        }
      }
      this.chart.data.datasets[index].data = data;
      this.chart.update();
    }
  }


  calculateMissleTrajectory(targetPoint: GraphPoint) {
    if (!this.misslePoint) {
      const annotations: any = this.chart.config.options?.plugins?.annotation?.annotations;
      const airDefAnnotation = annotations['airDef'];
      this.misslePoint = new GraphPoint(airDefAnnotation.xValue, airDefAnnotation.yValue)
    }
    return this.flightService.interpolateNextPoint(this.misslePoint, targetPoint)
  }

  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
  }
}



