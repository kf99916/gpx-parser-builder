import Link from './link.js';

export default class Waypoint {
  constructor(object) {
    this.$ = {};
    this.$.lat = object.$.lat === 0 || object.lat === 0 ? 0 : object.$.lat || object.lat || -1;
    this.$.lon = object.$.lon === 0 || object.lon === 0 ? 0 : object.$.lon || object.lon || -1;
    this.ele = object.ele;
    if (object.time) {
      this.time = new Date(object.time);
    }
    this.magvar = object.magvar;
    this.geoidheight = object.geoidheight;
    this.name = object.name;
    this.cmt = object.cmt;
    this.desc = object.desc;
    this.src = object.src;
    this.sym = object.sym;
    this.type = object.type;
    this.sat = object.sat;
    this.hdop = object.hdop;
    this.vdop = object.vdop;
    this.pdop = object.pdop;
    this.ageofdgpsdata = object.ageofdgpsdata;
    this.dgpsid = object.dgpsid;
    this.extensions = object.extensions;
    if (object.link) {
      if (!Array.isArray(object.link)) {
        object.link = [object.link];
      }
      this.link = object.link.map(l => new Link(l));
    }
  }
}