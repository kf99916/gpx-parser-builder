import * as xml2js from 'isomorphic-xml2js';
import Metadata from './metadata';
import Waypoint from './waypoint';
import Route from './route';
import Track from './track';
import {removeEmpty, allDatesToISOString} from './utils';

const defaultAttributes = {
  version: '1.1',
  creator: 'gpx-parser-builder',
  xmlns: 'http://www.topografix.com/GPX/1/1',
  'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  'xsi:schemaLocation':
      'http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd'
}

export default class GPX {
  constructor(object) {
    this.$ = Object.assign({}, defaultAttributes, object.$ || object.attributes || {});
    this.extensions = object.extensions;

    if (object.metadata) {
      this.metadata = new Metadata(object.metadata);
    }
    if (object.wpt) {
      if (!Array.isArray(object.wpt)) {
        object.wpt = [object.wpt];
      }
      this.wpt = object.wpt.map(wpt => new Waypoint(wpt));
    }
    if (object.rte) {
      if (!Array.isArray(object.rte)) {
        object.rte = [object.rte];
      }
      this.rte = object.rte.map(rte => new Route(rte));
    }
    if (object.trk) {
      if (!Array.isArray(object.trk)) {
        object.trk = [object.trk];
      }
      this.trk = object.trk.map(trk => new Track(trk));
    }

    removeEmpty(this);
  }
  
  static parse(gpxString) {
    let gpx;
    xml2js.parseString(gpxString, {
      explicitArray: false
    }, (err, xml) => {
      if (err) {
        return;
      }
      if (!xml.gpx) {
        return;
      }

      gpx = new GPX({
        attributes: xml.gpx.$,
        metadata: xml.gpx.metadata,
        wpt: xml.gpx.wpt,
        rte: xml.gpx.rte,
        trk: xml.gpx.trk
      });
    });

    return gpx;
  }

  toString(options) {
    options = options || {};
    options.rootName = 'gpx';

    const builder = new xml2js.Builder(options), gpx = new GPX(this);
    allDatesToISOString(gpx);
    return builder.buildObject(gpx);
  }
}