import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { ChartDisplayComponent } from "./chart-display.component";
import { ReplaySubject, concatMap, map, switchMap, timer, filter, take } from "rxjs";
import { GraphPoint } from "./utils/graph-flight.points";
import { FlightService } from "./flight.service";
import { HttpClientModule } from "@angular/common/http";
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'chart-data-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, ChartDisplayComponent, HttpClientModule, ToggleButtonModule],
  templateUrl: './chart-data.component.html'
})
export class ChartDataComponent implements OnInit {
  private readonly flightService = inject(FlightService);
  private readonly flightDataSubject = new ReplaySubject<GraphPoint[]>(1);
  flightData$ = this.flightDataSubject.asObservable();
  startPauseRadar$ = this.flightService.startPauseRadar$;

  ngOnInit(): void {

    this.flightService.startSimulation()
      .pipe(concatMap(resposne =>
        timer(500).pipe(
          switchMap(() =>
            this.startPauseRadar$.pipe(
              filter(isRunning => isRunning),
              take(1),
              map(() => resposne)
            )))
      ))
      .subscribe(data => this.flightDataSubject.next(data));
  }

  toggleRadar(value: boolean) {
    this.flightService.startPauseRadar(value);
  }
}



