var _ = require('underscore');

function streamToBuffer(stream, callback) {
  var buffers = [];
  stream.on('data', function(buffer) {
    buffers.push(buffer);
  });
  stream.on('end', function() {
    callback(null, Buffer.concat(buffers));
  });
}

function ensureArray(item) {
  if (_.isArray(item)) {
    return item;
  }
  return [item];
}

function deepExtend(target, source) {
  _.each(source, function(value, key) {
    if (_.isObject(target[key])) {
      return deepExtend(target[key], value);
    }
    target[key] = value;
  });
  return target;
}

module.exports.streamToBuffer = streamToBuffer;
module.exports.ensureArray = ensureArray;
module.exports.deepExtend = deepExtend;
