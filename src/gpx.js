import xml2js from 'xml2js';

const defaultGpxAttr = {
    version: '1.1',
    creator: 'gpx-parser-builder',
    xmlns: 'http://www.topografix.com/GPX/1/1',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'xsi:schemaLocation':
      'http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd',
  },
  handleDate = function(element, handler) {
    if (Array.isArray(element)) {
      element.forEach(e => {
        handleDate(e, handler);
      });
    } else if (element instanceof Object) {
      if (element.time) {
        element.time = element.time.map(function(time) {
          return handler(time);
        });
      }
    }
  },
  parseDate = function(element) {
    handleDate(element, time => {
      if (time instanceof Date) {
        return time;
      }

      const date = new Date(time);
      if (isNaN(date.valueOf())) {
        return time;
      }

      return date;
    });
  },
  toISOString = function(element) {
    handleDate(element, date => {
      if (date instanceof Date) {
        return date.toISOString();
      }

      return date;
    });
  };

class Gpx {
  constructor(gpxAttr, metadata) {
    this.gpxAttr = defaultGpxAttr;
    if (gpxAttr) {
      for (var key in gpxAttr) {
        if (gpxAttr.hasOwnProperty(key)) {
          this.gpxAttr[key] = gpxAttr[key];
        }
      }
    }

    this.metadata = metadata || [];
    this.waypoints = [];
    this.trackSegments = [];
  }

  addWaypoint(waypoint) {
    parseDate(waypoint);
    this.waypoints.push(waypoint);
  }

  addTrack(track, index) {
    parseDate(track);
    index = index || 0;
    const numTrackSegments = this.trackSegments.length;
    if (index + 1 >= numTrackSegments) {
      for (var i = 0; i < index; i++) {
        if (i >= numTrackSegments) {
          this.trackSegments[i] = [];
        }
      }
    }

    this.trackSegments[index].push(track);
  }

  parse(gpxString) {
    let error;
    xml2js.parseString(gpxString, (err, xml) => {
      if (err) {
        error = err;
        return;
      }
      if (!xml.gpx) {
        error = new TypeError('Invalid gpx');
        return;
      }

      let gpx = xml.gpx;

      this.gpxAttr = gpx.$ || {};
      if (gpx.metadata) {
        this.metadata = gpx.metadata;
        parseDate(this.metadata);
      }
      if (gpx.wpt) {
        this.waypoints = gpx.wpt;
        parseDate(this.waypoints);
      }
      if (gpx.trkseg) {
        this.trackSegments = gpx.trkseg.map(trackSegment => {
          if (trackSegment.trkpt) {
            parseDate(trackSegment.trkpt);
            return trackSegment.trkpt;
          }

          return;
        });
      }
    });

    return error;
  }

  toString(options) {
    options = options || {};
    options.rootName = 'gpx';

    let gpxObject = {
      $: this.gpxAttr,
      metadata: this.metadata,
      wpt: this.waypoints,
      trkseg: this.trackSegments,
    };

    toISOString(gpxObject.metadata);
    toISOString(gpxObject.wpt);
    gpxObject.trkseg = gpxObject.trkseg.map(tracks => {
      toISOString(tracks);
      return {
        trkpt: tracks,
      };
    });

    const builder = new xml2js.Builder(options);
    return builder.buildObject(gpxObject);
  }
}

export default Gpx;
