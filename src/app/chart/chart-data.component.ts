import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { ChartDisplayComponent } from "./chart-display.component";
import { ReplaySubject, concatMap, map, switchMap, timer, filter, take, from, toArray, Observable, combineLatest, startWith } from "rxjs";
import { GraphPoint } from "./utils/graph-flight.points";
import { FlightService } from "./flight.service";
import { HttpClientModule } from "@angular/common/http";
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'chart-data-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ChartDisplayComponent,
    HttpClientModule,
    ToggleButtonModule,
    ButtonModule
  ],
  templateUrl: './chart-data.component.html'
})
export class ChartDataComponent implements OnInit {
  private readonly flightService = inject(FlightService);
  private readonly flightDataSubject = new ReplaySubject<GraphPoint[]>(1);

  flightData$ = this.flightDataSubject.asObservable();
  startPauseRadar$ = this.flightService.startPauseRadar$;
  startPauseEmparRadar$ = this.flightService.startPauseEmparRadar$;

  airTraffic$ = this.flightService.getFlightData()
    .pipe(concatMap(resposne =>
      timer(1000).pipe(
        switchMap(() =>
          this.startPauseRadar$.pipe(
            filter(isRunning => isRunning),
            take(1),
            map(() => resposne)
          )))
    ))

  unkownAirTraffic$ = this.flightService.getAdditionalFlightData()
    .pipe(concatMap(resposne =>
      timer(500).pipe(
        switchMap(() =>
          this.startPauseEmparRadar$.pipe(
            filter(isRunning => isRunning),
            take(1),
            map(() => resposne)
          )))
    ))

  ngOnInit(): void {

    combineLatest([
      this.airTraffic$.pipe(startWith(null)),
      this.unkownAirTraffic$.pipe(startWith(null))
    ])
      .subscribe(([airTraffic, unkownTraffic]) => {

        let data: GraphPoint[] = [];
        if (airTraffic && unkownTraffic) {
          data = [...airTraffic, unkownTraffic];
        }
        if (airTraffic && unkownTraffic === null) {
          data = airTraffic;
        }
        this.flightDataSubject.next(data);
      })


  }

  toggleRadar(value: boolean) {
    this.flightService.startPauseRadar(value);
  }

  toggleEMPAR(value: boolean) {
    this.flightService.startPauseEmparRadar(value);
  }

  armSAM(value: boolean) {
    this.flightService.armSam(value);
  }

  fireSAM() {
    this.flightService.fireSam(true);
  }
}



