import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy } from "@angular/core";
import Chart, { ChartOptions } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(annotationPlugin);
Chart.register(ChartDataLabels);
import { addCustomBackground, annotations, flightDatalabels, flightStyles, tooltipStyles } from "./utils/chart-constants";
import { Observable, Subject, from, takeUntil } from "rxjs";
import { GraphPoint } from "./utils/graph-flight.points";
import { HttpClient } from "@angular/common/http";

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
  @Input() flightData$!: Observable<GraphPoint[]>;

  destroyed = new Subject();


  chart!: Chart;
  plugins = [addCustomBackground('#040624')]
  flightDataset!: any;

  ngAfterViewInit(): void {
    this.createFlightDataset();
    this.createChart();

    this.flightData$
      .pipe(takeUntil(this.destroyed))
      .subscribe(flightData => {
        console.log("Received:", flightData)
        this.updateFlightData(flightData);
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
        },
        y: {
          min: 0,
          max: 150,
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
                `Speed: ${point?.flightSpeed} knots`
              ];
            }
          }
        },
        annotation: {
          annotations: {
            ...annotations
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



