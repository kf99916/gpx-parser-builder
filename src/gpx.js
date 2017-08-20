import xml2js from 'xml2js';

const defaultGpxAttr = {
    version: '1.1',
    creator: 'gpx-parser-builder',
    xmlns: 'http://www.topografix.com/GPX/1/1',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'xsi:schemaLocation': 'http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd'
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
            }
            if (gpx.wpt) {
                this.waypoints = gpx.wpt;
            }
            if (gpx.trkseg) {
                this.trackSegments = gpx.trkseg.map((trackSegment) => {
                    if (trackSegment.trkpt) {
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

        const trackSegments = this.trackSegments.map((tracks) => {
            return {
                trkpt: tracks
            };
        });

        const builder = new xml2js.Builder(options);
        return builder.buildObject({
            $: this.gpxAttr,
            metadata: this.metadata,
            wpt: this.waypoints,
            trkseg: trackSegments
        });
    }
}

export default Gpx;