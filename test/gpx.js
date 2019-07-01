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
        assert.equal(gpx.$.version, '1.1');
        assert.equal(gpx.$.creator, 'Hikingbook');
        assert.equal(gpx.$.xmlns, 'http://www.topografix.com/GPX/1/1');

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

  describe('Build', function() {
    it('Build a gpx string', function(done) {
      const gpx = new GPX({
        metadata: {
          name: 'GPX'
        },
        wpt: [{$: {
          lat: 22.33,
          lon: 120.33
        }, ele: 916, time: '2019-07-01T09:16:00Z', name: 'Waypoint 1', extensions: {
          'gpx:test': 'Waypoint 1'
        }}, {$: {
          lat: 23.33,
          lon: 121.33
        }, ele: 916, time: '2019-07-01T10:16:00Z', name: 'Waypoint 2', extensions: {
          'gpx:test': 'Waypoint 2'
        }}],
        trk: {
          name: 'Track',
          trkseg: [{trkpt: [{$: {
            lat: 22.333,
            lon: 120.333
          }, ele: 1016, time: '2019-07-01T09:16:00Z', name: 'Track Point 1', extensions: {
            'gpx:test': 'Track Point 1'
          }}, {$: {
            lat: 21.333,
            lon: 119.333
          }, ele: 1016, time: '2019-07-01T09:17:00Z', name: 'Track Point 2', extensions: {
            'gpx:test': 'Track Point 2'
          }}], extensions: {
            'gpx:test': 'Track Segment 1'
          }}]
        },
        rte: {
          name: 'Route',
          rtept: [{$: {
            lat: 22.333,
            lon: 120.333
          }, ele: 1016, time: '2019-07-01T09:16:00Z', name: 'Route Point 1', extensions: {
            'gpx:test': 'Route Point 1'
          }}, {$: {
            lat: 22.916,
            lon: 120.916
          }, ele: 1016, time: '2019-07-01T09:16:00Z', name: 'Route Point 2', extensions: {
            'gpx:test': 'Route Point 2'
          }}]
        }
      });
      console.log(gpx.toString());
      done();
    });
  })
});