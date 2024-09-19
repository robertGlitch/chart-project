import { AfterViewInit, ChangeDetectionStrategy, Component } from "@angular/core";
// import { Chart } from "chart.js";
import Chart from 'chart.js/auto';
import { ChartDisplayComponent } from "./chart-display.component";

@Component({
  selector: 'chart-data-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChartDisplayComponent],
  template: `<chart-display-component></chart-display-component>`
})
export class ChartDataComponent {


}
