import Waypoint from './waypoint';

export default class TrackSegment {
  constructor(object) {
    this.trkpt = object.trkpt.map(pt => new Waypoint(pt));
    this.extensions = object.extensions;
  }
}