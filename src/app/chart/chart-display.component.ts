import { AfterViewInit, ChangeDetectionStrategy, Component } from "@angular/core";
import Chart from 'chart.js/auto';

@Component({
  selector: 'chart-display-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <div class="chart-container" style="position: relative; height:50vh; width:100vw">
        <canvas id="myChart"></canvas>
      </div>
  `
})
export class ChartDisplayComponent implements AfterViewInit {
  chart!: Chart;

  ngAfterViewInit(): void {

    this.chart = new Chart('myChart', {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 4,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
