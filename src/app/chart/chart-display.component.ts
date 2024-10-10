import { AfterViewInit, ChangeDetectionStrategy, Component } from "@angular/core";
import Chart from 'chart.js/auto';
import { addCustomBackground } from "./chart-constants";

@Component({
  selector: 'chart-display-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <div class="chart-container" style="position: relative; height:65vh; width:85vw">
        <canvas id="myChart"></canvas>
      </div>
  `
})
export class ChartDisplayComponent implements AfterViewInit {
  chart!: Chart;
  plugins = [addCustomBackground('#040624')]

  ngAfterViewInit(): void {

    this.chart = new Chart('myChart', {
      type: "line",
      plugins: this.plugins,
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
          data: [10, 20, 30, 40, 50, 0, 5],
        }]
      },
      options: {
        aspectRatio: 3,
        scales: {
          x: {
            grid: {
              lineWidth: 0.5,
              color: '#42a166',
              tickColor: 'grey'
            }
          },
          y: {
            grid: {
              lineWidth: 0.5,
              color: '#42a166',
              tickColor: 'grey',

            }
          }

        }
      },
    });

  }
}

