import { AfterViewInit, ChangeDetectionStrategy, Component } from "@angular/core";
import Chart, { ChartOptions } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);
import { addCustomBackground, annotations, flightStyles, tooltipStyles } from "./chart-constants";

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
export class ChartDisplayComponent implements AfterViewInit {
  chart!: Chart;
  plugins = [addCustomBackground('#040624')]

  ngAfterViewInit(): void {
    const dataset1 = {
      ...flightStyles,
      data: [{ x: 100, y: 200 }, { x: 200, y: 400 }, { x: 200, y: 500 }]
    };

    this.chart = new Chart('flightChart', {
      type: 'scatter',
      plugins: this.plugins,
      data:
      {
        datasets: [
          dataset1
        ]
      },
      options: this.setupChartOptions(),
    })
  }


  private setupChartOptions() {
    return <ChartOptions>{
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        x: {
          min: 0,
          max: 700,
        },
        y: {
          min: 0,
          max: 700,
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
              return `Value:`;
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
}



