import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { ChartDisplayComponent } from "./chart-display.component";
import { ReplaySubject, delay } from "rxjs";
import { GraphPoint } from "./utils/graph-flight.points";
import { FlightService } from "./flight.service";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'chart-data-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChartDisplayComponent, HttpClientModule],
  templateUrl: './chart-data.component.html'
})
export class ChartDataComponent implements OnInit {
  private flightService = inject(FlightService);
  private readonly flightDataSubject = new ReplaySubject<GraphPoint[]>(1);
  flightData$ = this.flightDataSubject.asObservable();

  ngOnInit(): void {
    this.flightService.startSimulation()
      .subscribe(data => this.flightDataSubject.next(data));
  }

  // private initilazeFlightData() {
  //   const flightData: GraphPoint[] = [
  //     { x: 20, y: 40, id: 1, flightName: 'FR1177', flightSpeed: 800, flightAltitude: 10000 },
  //     { x: 60, y: 80, id: 2, flightName: 'AUA6982', flightSpeed: 700, flightAltitude: 9000 },
  //     { x: 90, y: 45, id: 3, flightName: 'DLH1212', flightSpeed: 800, flightAltitude: 10000 },
  //     { x: 90, y: 90, id: 4, flightName: 'OU3331', flightSpeed: 800, flightAltitude: 10000 },
  //     { x: 120, y: 60, id: 5, flightName: 'JU5722', flightSpeed: 800, flightAltitude: 10000 },

  //   ];

  //   this.flightDataSubject.next(flightData);

  // }

}

