import assert from 'assert';
import fs from 'fs';
import GPX from '../src/gpx';

describe('GPX', function() {
  describe('Parse', function() {
    it('Parse a gpx string', function(done) {
      fs.readFile( './test/test.gpx', function(err, data) {
        assert.equal(err, null);
        const gpx = GPX.parse(data.toString());
        assert.notEqual(gpx, null);

        // Attributes
        assert.equal(gpx.attributes.version, '1.1');
        assert.equal(gpx.attributes.creator, 'Hikingbook');
        assert.equal(gpx.attributes.xmlns, 'http://www.topografix.com/GPX/1/1');

        // Metadata
        assert.notEqual(gpx.metadata, null);
        assert.equal(gpx.metadata.name, '2018.12.02 - 2018.12.03 玉山前二峰：主峰與前峰');
        assert.equal(gpx.metadata.link[0].$.href, 'https://hikingbook.net/hikes/91490sNATjSpazduVtd8UJCw');
        assert.equal(gpx.metadata.extensions['gpxhb:postscript'], '感謝老天賜予美好天氣，不過實在是熱到快中暑 😂');

        // Waypoints
        assert.equal(gpx.wpt[0].$.lat, 23.481704933904467);
        assert.equal(gpx.wpt[0].name, '00 排雲管理站');
        assert.equal(gpx.wpt[0].extensions['gpxhb:weather'], '晴');

        // Tracks
        assert.equal(gpx.trk[0].name, '2018.12.02 - 2018.12.03 玉山前二峰：主峰與前峰');
        assert.equal(gpx.trk[0].trkseg[0].trkpt[0].$.lon, 120.93243699532088);
        assert.equal(gpx.trk[0].trkseg[0].trkpt[0].extensions['gpxhb:speed'], 0.980000);

        // Routes
        assert.equal(gpx.rte[0].name, 'Kf\'s Route');
        assert.equal(gpx.rte[0].rtept[0].$.lon, 9.860624216140083);
        assert.equal(gpx.rte[0].rtept[0].name, 'Position 1');

        done();
     });
    });
  })
});