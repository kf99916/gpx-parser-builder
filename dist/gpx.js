"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _xml2js = _interopRequireDefault(require("xml2js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultGpxAttr = {
  version: '1.1',
  creator: 'gpx-parser-builder',
  xmlns: 'http://www.topografix.com/GPX/1/1',
  'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  'xsi:schemaLocation': 'http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd'
},
    handleDate = function handleDate(element, handler) {
  if (Array.isArray(element)) {
    element.forEach(function (e) {
      handleDate(e, handler);
    });
  } else if (element instanceof Object) {
    if (element.time) {
      element.time = element.time.map(function (time) {
        return handler(time);
      });
    }
  }
},
    parseDate = function parseDate(element) {
  handleDate(element, function (time) {
    if (time instanceof Date) {
      return time;
    }

    var date = new Date(time);

    if (isNaN(date.valueOf())) {
      return time;
    }

    return date;
  });
},
    toISOString = function toISOString(element) {
  handleDate(element, function (date) {
    if (date instanceof Date) {
      return date.toISOString();
    }

    return date;
  });
};

var Gpx =
/*#__PURE__*/
function () {
  function Gpx(gpxAttr, metadata) {
    _classCallCheck(this, Gpx);

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
    this.routes = [];
  }

  _createClass(Gpx, [{
    key: "addWaypoint",
    value: function addWaypoint(waypoint) {
      parseDate(waypoint);
      this.waypoints.push(waypoint);
    }
  }, {
    key: "addTrack",
    value: function addTrack(track, index) {
      parseDate(track);
      index = index || 0;
      var numTrackSegments = this.trackSegments.length;

      if (index + 1 >= numTrackSegments) {
        for (var i = 0; i < index; i++) {
          if (i >= numTrackSegments) {
            this.trackSegments[i] = [];
          }
        }
      }

      this.trackSegments[index].push(track);
    }
  }, {
    key: "addRoute",
    value: function addRoute(route) {
      this.routes.push(route);
    }
  }, {
    key: "parse",
    value: function parse(gpxString) {
      var _this = this;

      var error;

      _xml2js["default"].parseString(gpxString, function (err, xml) {
        if (err) {
          error = err;
          return;
        }

        if (!xml.gpx) {
          error = new TypeError('Invalid gpx');
          return;
        }

        var gpx = xml.gpx;
        _this.gpxAttr = gpx.$ || {};

        if (gpx.metadata) {
          _this.metadata = gpx.metadata;
          parseDate(_this.metadata);
        }

        if (gpx.wpt) {
          _this.waypoints = gpx.wpt;
          parseDate(_this.waypoints);
        }

        if (gpx.trkseg) {
          _this.trackSegments = gpx.trkseg.map(function (trackSegment) {
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
  }, {
    key: "toString",
    value: function toString(options) {
      options = options || {};
      options.rootName = 'gpx';
      var gpxObject = {
        $: this.gpxAttr,
        metadata: this.metadata,
        wpt: this.waypoints,
        trkseg: this.trackSegments,
        rte: this.routes
      };
      toISOString(gpxObject.metadata);
      toISOString(gpxObject.wpt);
      gpxObject.trkseg = gpxObject.trkseg.map(function (tracks) {
        toISOString(tracks);
        return {
          trkpt: tracks
        };
      });
      var builder = new _xml2js["default"].Builder(options);
      return builder.buildObject(gpxObject);
    }
  }]);

  return Gpx;
}();

var _default = Gpx;
exports["default"] = _default;
