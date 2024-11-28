import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { GraphPoint } from "./utils/graph-flight.points";
import { BehaviorSubject, concatMap, filter, from, map, switchMap, take, tap, timer } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private readonly http = inject(HttpClient);
  private readonly flightURL = 'api/combined.json'

  private readonly startPauseRadarSubject = new BehaviorSubject<boolean>(false);
  startPauseRadar$ = this.startPauseRadarSubject.asObservable();

  startSimulation() {
    return this.http.get<[GraphPoint[]]>(this.flightURL)
      .pipe(switchMap(flightData =>
        from(flightData)
      ))
  }

  startPauseRadar(value: boolean) {
    this.startPauseRadarSubject.next(value);
  }
}
