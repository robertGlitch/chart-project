export class GraphPoint {
  constructor(
    public x: number,
    public y: number,
    public id?: number,
    public flightName?: string,
    public flightSpeed?: number,
    public flightAltitude?: number
  ) { }
}
