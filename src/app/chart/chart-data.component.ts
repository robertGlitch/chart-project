import { AfterViewInit, ChangeDetectionStrategy, Component } from "@angular/core";
import { ChartDisplayComponent } from "./chart-display.component";

@Component({
  selector: 'chart-data-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChartDisplayComponent],
  templateUrl: './chart-data.component.html'
})
export class ChartDataComponent {


}

