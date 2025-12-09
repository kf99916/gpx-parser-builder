# gpx-parser-builder

A simple gpx parser and builder between GPX string and JavaScript object. It is dependent on [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser).

[![npm](https://img.shields.io/npm/dt/gpx-parser-builder.svg)](https://www.npmjs.com/package/gpx-parser-builder)
[![GitHub stars](https://img.shields.io/github/stars/kf99916/gpx-parser-builder.svg)](https://github.com/kf99916/gpx-parser-builder/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/kf99916/gpx-parser-builder.svg)](https://github.com/kf99916/gpx-parser-builder/network)
[![npm](https://img.shields.io/npm/v/gpx-parser-builder.svg)](https://www.npmjs.com/package/gpx-parser-builder)
[![GitHub license](https://img.shields.io/github/license/kf99916/gpx-parser-builder.svg)](https://github.com/kf99916/gpx-parser-builder/blob/master/LICENSE)

## Requirements

gpx-parser-builder is written with ECMAScript 6 and is now an ES Module.

## Installation

```bash
npm install gpx-parser-builder --save
```

## Usage

```javascript
import GPX from 'gpx-parser-builder';

// Parse gpx
const gpx = GPX.parse('GPX_STRING');

window.console.dir(gpx.metadata);
window.console.dir(gpx.wpt);
window.console.dir(gpx.trk);

// Build gpx
window.console.log(gpx.toString());
```

Get more details about usage with the unit tests.

### GPX

The GPX JavaScript object.

`constructor(object)`

```javascript
const gpx = new Gpx({$:{...}, metadat: {...}, wpt:[{...},{...}]}, trk: {...}, rte: {...})
```

#### Member Variables

`$` the attributes for the gpx element. Default value:

```javascript
{
    'version': '1.1',
    'creator': 'gpx-parser-builder',
    'xmlns': 'http://www.topografix.com/GPX/1/1',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'xsi:schemaLocation': 'http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd'
}
```

`metadata` the metadata for the gpx.

`wpt` array of waypoints. It is corresponded to `<wpt>`. The type of all elements in `wpt` is `Waypoint`;

`rte` array of routes. It is corresponded to `<rte>`. The type of all elements in `rte` is `Route`;

`trk` array of tracks. It is corresponded to `<trk>`. The type of all elements in `trk` is `Track`;

#### Static Methods

`parse(gpxString, options)` parse gpx string to Gpx object. return `null` if parsing failed. The options is for [fast-xml-parser's XMLParser](https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md).

#### Member Methods

`toString(options)` GPX object to gpx string. The options is for [fast-xml-parser's XMLBuilder](https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/3.XMLBuilder.md).

## Save as GPX file in the frontend

You can leverage [StreamSaver.js](https://github.com/jimmywarting/StreamSaver.js) or [FileSaver.js](https://github.com/eligrey/FileSaver.js) to save as GPX file. ⚠️Not all borwsers support the above file techniques. ⚠️️️

## Author

Ke Zheng-Xiang, kf99916@gmail.com

## License

gpx-parser-builder is available under the MIT license. See the LICENSE file for more info.
