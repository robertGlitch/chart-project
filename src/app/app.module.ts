import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartDataComponent } from './chart/chart-data.component';
import { ChartSimpleDisplayComponent } from './chart-simple/chart-simple-display.component';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabViewModule,
    ChartDataComponent,
    ChartSimpleDisplayComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
