import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import Metadata from './metadata.js';
import Waypoint from './waypoint.js';
import Route from './route.js';
import Track from './track.js';
import { removeEmpty, allDatesToISOString } from './utils.js';

const defaultAttributes = {
  version: '1.1',
  creator: 'gpx-parser-builder',
  xmlns: 'http://www.topografix.com/GPX/1/1',
  'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  'xsi:schemaLocation':
    'http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd',
};

export default class GPX {
  constructor(object) {
    this.$ = Object.assign(
      {},
      defaultAttributes,
      object.$ || object.attributes || {}
    );
    this.extensions = object.extensions;

    if (object.metadata) {
      this.metadata = new Metadata(object.metadata);
    }
    if (object.wpt) {
      if (!Array.isArray(object.wpt)) {
        object.wpt = [object.wpt];
      }
      this.wpt = object.wpt.map((wpt) => new Waypoint(wpt));
    }
    if (object.rte) {
      if (!Array.isArray(object.rte)) {
        object.rte = [object.rte];
      }
      this.rte = object.rte.map((rte) => new Route(rte));
    }
    if (object.trk) {
      if (!Array.isArray(object.trk)) {
        object.trk = [object.trk];
      }
      this.trk = object.trk.map((trk) => new Track(trk));
    }

    removeEmpty(this);
  }

  static parse(gpxString) {
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributesGroupName: '$',
        attributeNamePrefix: '',
      }),
      xml = parser.parse(gpxString);

    return new GPX({
      attributes: xml.gpx.$,
      metadata: xml.gpx.metadata,
      wpt: xml.gpx.wpt,
      rte: xml.gpx.rte,
      trk: xml.gpx.trk,
    });
  }

  toString(options) {
    options = Object.assign(
      {
        ignoreAttributes: false,
        attributesGroupName: '$',
        attributeNamePrefix: '',
      },
      options
    );

    const builder = new XMLBuilder(options),
      gpx = new GPX(this);
    allDatesToISOString(gpx);
    return builder.build({ gpx: gpx }).replaceAll(`xmlns=""`, '');
  }
}
