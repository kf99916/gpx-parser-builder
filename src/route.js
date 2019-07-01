import Waypoint from './waypoint';
import Link from './link';

export default class Route {
  constructor(object) {
    this.name = object.name;
    this.cmt = object.cmt;
    this.desc = object.desc;
    this.src = object.src;
    this.number = object.number;
    this.type = object.type;
    this.extensions = object.extensions;
    if (object.link) {
      this.link = object.link.map(l => new Link(l));
    }
    this.rtept = object.rtept.map(pt => new Waypoint(pt));
  }
}