import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
  <p-tabView [activeIndex]="1">
    <p-tabPanel header="Chart simple">
    <div class="tab-panel">
    <chart-simple-display-component></chart-simple-display-component>
    </div>
  </p-tabPanel>
    <p-tabPanel header="Chart detail">
  <div class="content tab-panel" role="main">
  <chart-data-component></chart-data-component>
   </div>
    </p-tabPanel>
  </p-tabView>

<router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'chartProject';
}
