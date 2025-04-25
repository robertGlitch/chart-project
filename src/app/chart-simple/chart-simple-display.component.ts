import { AfterViewInit, Component } from "@angular/core";
import Chart, { ChartData, ChartOptions } from "chart.js/auto";
import annotationPlugin from 'chartjs-plugin-annotation';

@Component({
  selector: 'chart-simple-display-component',
  standalone: true,
  styleUrl: './chart-simple-display.component.scss',
  template: `
      <div class="chart-container">
        <canvas id="simpleChart"></canvas>
</div> `
})

export class ChartSimpleDisplayComponent implements AfterViewInit {

  chart!: Chart;
  labels = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun']

  data: ChartData = {
    labels: this.labels,
    datasets: [
      {
        type: 'line',
        label: 'Bitcoin',
        data: [12, 20, 33, 40, 80, 10],
        backgroundColor: (ctx: any) => {
          return ctx.raw > 30 ? 'blue' : 'yellow'
        },
        borderColor: 'green'
      },
      {
        type: 'bar',
        label: 'EARLY',
        data: [11, 21, 28, 9, 1, 0],
        backgroundColor: 'red',
      },
    ]
  };

  options: ChartOptions = {
    animation: false,
    plugins: {
      legend: {
        display: false
      },
      annotation: {
        annotations: {
          profitLine: {
            type: 'line',
            yMin: 20,
            yMax: 20,
            borderColor: 'black',
            borderWidth: 3,
            borderDash: [4]
          }
        }
      }
    }
  }

  ngAfterViewInit(): void {
    this.chart = new Chart('simpleChart', {
      type: 'scatter',
      data: this.data,
      options: this.options,
      plugins: [annotationPlugin]
    })
  }

}
