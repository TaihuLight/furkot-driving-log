var fs = require('fs');
var path = require('path');
var WritableStreamBuffer = require('stream-buffers').WritableStreamBuffer;

var csv = require('..');

/**
 * Compare files line-by-line
 */
function compareCsv(actual, expected) {
  var a = actual.split('\n');
  var e = expected.split('\n');
  a.should.have.length(e.length);
  a.forEach(function(line, index) {
    line.should.eql(e[index]);
  });
}

function readFileSync(name) {
  return fs.readFileSync(path.join(__dirname, name), 'utf8');
}

function generateCSV(t) {
  var ostream = new WritableStreamBuffer();
  csv(ostream, t);
  return ostream.getContentsAsString('utf8');
}

describe('furkot-driving-log node module', function () {

  it('simple trip', function() {
    var t = require('./fixtures/simple-trip.json'),
      generated = generateCSV(t),
      expected = readFileSync('fixtures/simple.csv');

    compareCsv(generated, expected);
  });

  it('simple trip with adjusted speed', function() {
    var t = require('./fixtures/speed-trip.json'),
      generated = generateCSV(t),
      expected = readFileSync('fixtures/speed.csv');

    compareCsv(generated, expected);
  });

  it('multi trip', function() {
    var t = require('./fixtures/multi-trip.json'),
      generated = generateCSV(t),
      expected = readFileSync('fixtures/multi.csv');

    compareCsv(generated, expected);
  });

  it('begin end time', function() {
    var t = require('./fixtures/time-trip.json'),
    generated = generateCSV(t),
    expected = readFileSync('fixtures/time.csv');

    compareCsv(generated, expected);
  });

  it('multi modal', function() {
    var t = require('./fixtures/multi-modal-trip.json'),
    generated = generateCSV(t),
    expected = readFileSync('fixtures/multi-modal.csv');

    compareCsv(generated, expected);
  });

});
