import TrackSegment from './track-segment.js';
import Link from './link.js';

export default class Track {
  constructor(object) {
    this.name = object.name;
    this.cmt = object.cmt;
    this.desc = object.desc;
    this.src = object.src;
    this.number = object.number;
    this.type = object.type;
    this.extensions = object.extensions;
    if (object.link) {
      if (!Array.isArray(object.link)) {
        object.link = [object.link];
      }
      this.link = object.link.map(l => new Link(l));
    }
    if (object.trkseg) {
      if (!Array.isArray(object.trkseg)) {
        object.trkseg = [object.trkseg];
      }
      this.trkseg = object.trkseg.map(seg => new TrackSegment(seg));
    }
  }
}