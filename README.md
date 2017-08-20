# gpx-parser-builder
A simple gpx parser and builder between GPX string and JavaScript object. It is dependent on [node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js).

[![License](https://img.shields.io/github/license/kf99916/gpx-parser-builder.svg)](LICENSE)

## Requirements

gpx-parser-builder is written with ECMAScript 6. You can leverage [Babel](https://babeljs.io/) and [Webpack](https://webpack.js.org/) to make all browsers available.

## Installation

```bash
npm install gpx-parser-builder --save
```

## Usage

```javascript
import Gpx from 'gpx-parser-builder';

let gpx = new Gpx();

// Parse gpx
gpx.parse('<?xml version="1.0" encoding="utf-8" standalone="no"?> <gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.1" xmlns="http://www.topografix.com/GPX/1/1" creator="Hikingbook" xmlns:gpxhb="https://hikingbook.net/xmlschemas/1/0" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd https://hikingbook.net/xmlschemas/1/0 https://hikingbook.net/xmlschemas/1/0/gpxhb.xsd"> <metadata> <name>2017.4.2 - 2017.4.4 Shuiyang Forest</name> <desc>Hikingbook makes hiking safer. Record your hikes completely and get the information of the hiking routes through the hiking records.</desc> <author> <name>Kfs Phone by Hikingbook</name> <link href="https://hikingbook.net/"> <text>Hikingbook</text> </link> </author> <link href="https://hikingbook.net/"> <text>Hikingbook</text> </link> <time>2017-04-18T21:28:36+08:00</time> <keywords>Hikingbook</keywords> </metadata> <wpt lat="23.6344071105343" lon="120.791769968458"> <ele>1660.7646484375</ele> <time>2017-04-02T15:42:03+08:00</time> <name>01 SunLinkSea Hotel</name> <cmt>2017-04-02T15:42:03+08:00</cmt> <desc>01 SunLinkSea Hotel</desc> <src>Hikingbook</src> <link href="https://hikingbook.net/"> <text>Hikingbook</text> </link> <extensions> <gpxhb:weather>Clear</gpxhb:weather> </extensions> </wpt> <trkseg> <trkpt lat="25.136927" lon="121.602847"> <ele>561</ele> <time>2017-03-27T22:38:18.481Z</time> </trkpt> <trkpt lat="25.136927" lon="121.602847"> <ele>561</ele> <time>2017-03-27T22:38:18.481Z</time> </trkpt> <trkpt lat="25.136927" lon="121.602847"> <ele>561</ele> <time>2017-03-27T22:38:18.481Z</time> </trkpt> </trkseg> <trkseg> <trkpt lat="25.136927" lon="121.602847"> <ele>561</ele> <time>2017-03-27T22:38:18.481Z</time> </trkpt> <trkpt lat="25.136927" lon="121.602847"> <ele>561</ele> <time>2017-03-27T22:38:18.481Z</time> </trkpt> <trkpt lat="25.136927" lon="121.602847"> <ele>561</ele> <time>2017-03-27T22:38:18.481Z</time> </trkpt> </trkseg> </gpx>');

window.console.dir(gpx.metadata);
window.console.dir(gpx.waypoints);
window.console.dir(gpx.trackSegments);

// Build gpx
window.console.log(gpx.toString());
```

### Gpx

The Gpx JavaScript object.

`constructor(gpxAttr, metadata)` 

```javascript
let gpx = new Gpx({version: '1.1'}, {name: 'My first hike'})
```

#### Member Variables

`gpxAttr` the attributes for the gpx element. Default value:
```javascript
{
    'version': '1.1',
    'creator': 'gpx-parser-builder',
    'xmlns': 'http://www.topografix.com/GPX/1/1',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'xsi:schemaLocation': 'http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd'
}
```

`metadata` the metadata for the gpx. The type of `time` in the metadata should be `Date`.

`waypoints` array of waypoints. It is corresponded to `<wpt>`. The type of `time` in a waypoint should be `Date`.

`trackSegments` array of track segments. It is corresponded to `<trkseg>`. The type of `time` in a track should be `Date`. Each track segments includes many tracks (`<trkpt>`). As a result, the values should be like as
```javascript
[[{trkpt1}, {trkpt2}, ...], [{trkpt3}, {trkpt4}, ...]]
```

#### Member Methods

`parse(gpxString)` parse gpx string to Gpx object. return error if parsing failed.

`toString(options)` Gpx object to gpx string. The options is for [node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js#options-for-the-builder-class).

`addWaypoint(waypoint)` add a waypoint. The method takes care about the waypoint's time.

`addTrack(track, index)` add a track into the `index`-th track segments. The method takes care about the track's time.

## Save as GPX file in the frontend

You can leverage [FileSaver.js](https://github.com/eligrey/FileSaver.js) to save as GPX file.

```javascript
import Gpx from 'gpx-parser-builder';
import FileSaver from 'file-saver';

let gpx = new Gpx();
// Parse gpx
gpx.parse('<?xml version="1.0" encoding="utf-8" standalone="no"?> <gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.1" xmlns="http://www.topografix.com/GPX/1/1" creator="Hikingbook" xmlns:gpxhb="https://hikingbook.net/xmlschemas/1/0" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd https://hikingbook.net/xmlschemas/1/0 https://hikingbook.net/xmlschemas/1/0/gpxhb.xsd"> <metadata> <name>2017.4.2 - 2017.4.4 Shuiyang Forest</name> <desc>Hikingbook makes hiking safer. Record your hikes completely and get the information of the hiking routes through the hiking records.</desc> <author> <name>Kfs Phone by Hikingbook</name> <link href="https://hikingbook.net/"> <text>Hikingbook</text> </link> </author> <link href="https://hikingbook.net/"> <text>Hikingbook</text> </link> <time>2017-04-18T21:28:36+08:00</time> <keywords>Hikingbook</keywords> </metadata> <wpt lat="23.6344071105343" lon="120.791769968458"> <ele>1660.7646484375</ele> <time>2017-04-02T15:42:03+08:00</time> <name>01 SunLinkSea Hotel</name> <cmt>2017-04-02T15:42:03+08:00</cmt> <desc>01 SunLinkSea Hotel</desc> <src>Hikingbook</src> <link href="https://hikingbook.net/"> <text>Hikingbook</text> </link> <extensions> <gpxhb:weather>Clear</gpxhb:weather> </extensions> </wpt> <trkseg> <trkpt lat="25.136927" lon="121.602847"> <ele>561</ele> <time>2017-03-27T22:38:18.481Z</time> </trkpt> <trkpt lat="25.136927" lon="121.602847"> <ele>561</ele> <time>2017-03-27T22:38:18.481Z</time> </trkpt> <trkpt lat="25.136927" lon="121.602847"> <ele>561</ele> <time>2017-03-27T22:38:18.481Z</time> </trkpt> </trkseg> <trkseg> <trkpt lat="25.136927" lon="121.602847"> <ele>561</ele> <time>2017-03-27T22:38:18.481Z</time> </trkpt> <trkpt lat="25.136927" lon="121.602847"> <ele>561</ele> <time>2017-03-27T22:38:18.481Z</time> </trkpt> <trkpt lat="25.136927" lon="121.602847"> <ele>561</ele> <time>2017-03-27T22:38:18.481Z</time> </trkpt> </trkseg> </gpx>');

const blob = new Blob([gpx.toString()], {type: 'text/xml;charset=utf-8'});
FileSaver.saveAs(blob, 'Shuiyang-Forest.gpx');

```

## Author

Zheng-Xiang Ke, kf99916@gmail.com

## License

gpx-parser-builder is available under the MIT license. See the LICENSE file for more info.
