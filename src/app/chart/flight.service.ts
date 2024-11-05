import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { GraphPoint } from "./utils/graph-flight.points";
import { Subject, bufferCount, concatMap, delay, from, map, of, switchMap, timer } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private http = inject(HttpClient);

  private flightURL = 'api/combined.json'

  startSimulation() {
    return this.http.get<[GraphPoint[]]>(this.flightURL)
      .pipe(switchMap(flightData =>
        from(flightData).pipe(concatMap(record => timer(500).pipe(map(() => record))))
      ))
  }
}
