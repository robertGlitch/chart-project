import { AfterViewInit, ChangeDetectionStrategy, Component } from "@angular/core";
import Chart, { ChartOptions } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);
import { addCustomBackground, annotations } from "./chart-constants";

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

    this.chart = new Chart('flightChart', {
      type: 'scatter',
      plugins: this.plugins,
      data: { datasets: [] },
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
        annotation: {
          annotations: {
            ...annotations
          }
        }
      }
    }
  }
}



