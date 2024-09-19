import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'chart-data-component',
  templateUrl: './chart.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartDataComponent {

}
