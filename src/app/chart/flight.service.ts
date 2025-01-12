import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { GraphPoint } from "./utils/graph-flight.points";
import { BehaviorSubject, Subject, from, switchMap } from "rxjs";
import { ChartData, ChartDataset } from "chart.js";
import { aircraftDatalabels, aircraftStyles, missleStyles } from "./utils/chart-constants";

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private readonly http = inject(HttpClient);
  private readonly flightURL = 'api/combined.json'

  private readonly startPauseRadarSubject = new BehaviorSubject<boolean>(false);
  startPauseRadar$ = this.startPauseRadarSubject.asObservable();

  private readonly samActivateSubject = new Subject<boolean>();
  samActivate$ = this.samActivateSubject.asObservable();

  private readonly samFireSubject = new Subject<boolean>();
  samFire$ = this.samFireSubject.asObservable();

  startSimulation() {
    return this.http.get<[GraphPoint[]]>(this.flightURL)
      .pipe(switchMap(flightData =>
        from(flightData)
      ))
  }

  startPauseRadar(value: boolean) {
    this.startPauseRadarSubject.next(value);
  }


  armSam(value: boolean) {
    this.samActivateSubject.next(value);
  }

  fireSam(value: boolean) {
    this.samFireSubject.next(value);
  }

  createChartDatasets(): ChartData {
    return <ChartData>{
      datasets: [
        {
          data: [],
          order: 0,
          ...aircraftStyles,
          ...aircraftDatalabels
        },
        {
          data: [],
          order: 1,
          ...missleStyles
        }
      ]
    }
  }

  interpolateNextPoint(start: GraphPoint, end: GraphPoint, factor: number = 0.7): GraphPoint {
    let nextPoint = new GraphPoint(0, 0);

    if (start.x === end.x) {
      nextPoint.x = start.x;
      nextPoint.y = start.y + factor * (end.y - start.y)
    }

    else {
      const slope = (end.y - start.y) / (end.x - start.x);
      nextPoint.x = start.x + factor;
      nextPoint.y = start.y + slope * (nextPoint.x - start.x);
    }

    return nextPoint;
  }
}
