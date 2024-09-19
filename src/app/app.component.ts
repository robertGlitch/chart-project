import { Component } from '@angular/core';
import { ChartDataComponent } from './chart/chart-data.component';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
  <div class="content" role="main">
  <chart-data-component></chart-data-component>
</div>

<router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'chartProject';
}
