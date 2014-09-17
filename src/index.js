var _ = require('underscore');
var mime = require('mime');
var multiparty = require('multiparty');
var qs = require('qs');
var util = require('./utils');

function attachAsBuffer(names, options) {
  options = options || {};
  names = util.ensureArray(names);

  return function(req, res, next) {
    function callback(err) {
      next(err);
      next = function() {};
    }

    function attachBody(part, callback) {
      util.streamToBuffer(part, function(err, buffer) {
        if (err) {
          return callback(err);
        }
        var encoded = part.name + '=' + buffer;
        var data = qs.parse(encoded);
        util.deepExtend(req.body, data);
        callback();
      });
    }

    req.buffers = {};
    var form = new multiparty.Form(options);
    form.on('part', function(part) {
      var name = part.name;
      if (!part.filename) {
        return attachBody(part, function(err) {
          if (err) {
            callback(err);
          }
        });
      }
      if (names.indexOf(name) < 0) {
        return part.resume();
      }
      var type = part.headers['content-type'];

      if (options.extensions && options.extensions.indexOf(mime.extension(type)) < 0) {
        return callback(new Error('Content type not supported'));
      }

      util.streamToBuffer(part, function(err, buffer) {
        if (err) {
          return callback(err);
        }
        req.buffers[name] = buffer;
      });

      part.resume();
    });
    form.on('close', function() {
      callback();
    });
    form.on('error', function(err) {
      callback(err);
    });
    form.parse(req);
  };
}

module.exports = attachAsBuffer;
