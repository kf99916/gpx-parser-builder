import Waypoint from './waypoint';

export default class TrackSegment {
  constructor(object) {
    if (object.trkpt) {
      if (!Array.isArray(object.trkpt)) {
        object.trkpt = [object.trkpt];
      }
      this.trkpt = object.trkpt.map(pt => new Waypoint(pt));
    }
    this.extensions = object.extensions;
  }
}