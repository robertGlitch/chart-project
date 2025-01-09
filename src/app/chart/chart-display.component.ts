import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, inject } from "@angular/core";
import Chart, { ChartOptions } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(annotationPlugin);
Chart.register(ChartDataLabels);
import { addCustomBackground, annotations, flightDatalabels, flightStyles, samAnnotationStyle, samRadiusAnnotationStyle, tooltipStyles } from "./utils/chart-constants";
import { Observable, Subject, takeUntil } from "rxjs";
import { GraphPoint } from "./utils/graph-flight.points";
import { FlightService } from "./flight.service";

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
  flightDataset!: any;
  samActive: boolean = false;

  ngAfterViewInit(): void {
    this.createFlightDataset();
    this.createChart();

    this.flightData$
      .pipe(takeUntil(this.destroyed))
      .subscribe(flightData => {
        console.log("Received:", flightData)
        this.updateFlightData(flightData);
      })


    this.flightService.samActivateSubject$.
      pipe(takeUntil(this.destroyed))
      .subscribe(samActivate => {
        this.samActive = samActivate;
        this.chart.update();
      })
  }

  private createFlightDataset() {
    this.flightDataset = {
      data: [],
      order: 0,
      ...flightStyles,
      ...flightDatalabels
    }
  }

  private createChart() {
    this.chart = new Chart('flightChart', {
      type: 'scatter',
      plugins: this.plugins,
      data:
      {
        datasets: [this.flightDataset]
      },
      options: this.setupChartOptions(),
    })
  }

  private updateFlightData(data: GraphPoint[]) {
    const index = this.chart?.data.datasets.findIndex(d => d.order === 0);
    if (index > -1) {
      this.chart.data.datasets[index].data = data;
      this.chart.update();
    }
  }


  private setupChartOptions() {
    return <ChartOptions>{
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
              xValue: 70,
              yValue: 70,
              ...samAnnotationStyle
            },
            airDefRadius: {
              display: () => Boolean(this.samActive),
              radius: 0,
              xMin: 30,
              xMax: 110,
              yMin: 30,
              yMax: 110,
              ...samRadiusAnnotationStyle
            }
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
  }
}



