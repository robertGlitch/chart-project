import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, inject } from "@angular/core";
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Observable, Subject, takeUntil } from "rxjs";
import { FlightService } from "./flight.service";
import { addCustomBackground, annotations, samAnnotationStyle, samRadiusAnnotationStyle, tooltipStyles } from "./utils/chart-constants";
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
  plugins = [addCustomBackground('#040624')]
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
        // console.log("Received:", flightData)
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
      plugins: this.plugins,
      data: this.initialData,
      options: this.setupChartOptions(),
    })
  }

  private updateFlightData(data: GraphPoint[]) {
    const index = this.chart?.data.datasets.findIndex(d => d.order === 0);
    if (index > -1) {
      // if (this.samFired) {
      //   this.calculateMissleTrajectory(data.find(d => d.id === 4)!);
      //   this.chart.data.datasets[1].data = [this.misslePoint!];
      // }
      this.chart.data.datasets[index].data = data;
      this.chart.update();
    }
  }


  private setupChartOptions() {
    return <ChartOptions>{
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        x: {
          min: 0,
          max: 150,
          ticks: {
            count: 7
          }
        },
        y: {
          min: 0,
          max: 150,
          ticks: {
            count: 7
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          ...tooltipStyles,
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


  calculateMissleTrajectory(targetPoint: GraphPoint) {
    if (!this.misslePoint) {
      const annotations: any = this.chart.config.options?.plugins?.annotation?.annotations;
      const airDefAnnotation = annotations['airDef'];
      this.misslePoint = new GraphPoint(airDefAnnotation.xValue, airDefAnnotation.yValue)
    }
    this.misslePoint = this.flightService.interpolateNextPoint(this.misslePoint, targetPoint)
  }

  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
  }
}



