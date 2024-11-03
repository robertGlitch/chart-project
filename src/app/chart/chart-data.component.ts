import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ChartDisplayComponent } from "./chart-display.component";
import { ReplaySubject } from "rxjs";
import { GraphPoint } from "./utils/graph-flight.points";

@Component({
  selector: 'chart-data-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChartDisplayComponent],
  templateUrl: './chart-data.component.html'
})
export class ChartDataComponent implements OnInit {
  private readonly flightDataSubject = new ReplaySubject<GraphPoint[]>(1);
  flightData$ = this.flightDataSubject.asObservable();

  ngOnInit(): void {
    this.initilazeFlightData();
  }

  private initilazeFlightData() {
    const flightData: GraphPoint[] = [
      { x: 200, y: 180, id: 1, flightName: 'FR1177', flightSpeed: 800, flightAltitude: 10000 },
      { x: 320, y: 300, id: 1, flightName: 'AUA6982', flightSpeed: 700, flightAltitude: 9000 },
      { x: 500, y: 488, id: 1, flightName: 'DLH1212', flightSpeed: 800, flightAltitude: 10000 },
      { x: 600, y: 500, id: 1, flightName: 'OU3331', flightSpeed: 800, flightAltitude: 10000 },
      { x: 400, y: 270, id: 1, flightName: 'JU5722', flightSpeed: 800, flightAltitude: 10000 },

    ];

    this.flightDataSubject.next(flightData);

  }

}

