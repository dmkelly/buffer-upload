describe('utils', function() {
  var utils = require('../../src/utils');

  describe('ensureArray', function() {
    var fn;

    beforeEach(function() {
      fn = utils.ensureArray;
    });

    it('Will not wrap an item that is already an array', function() {
      var result = fn([1, 2, 3]);
      expect(result).toEqual([1, 2, 3]);
    });

    it('Will wrap an item that is not an array', function() {
      var result = fn(1);
      expect(result).toEqual([1]);
    });
  });

  describe('deepExtend', function() {
    var fn;

    beforeEach(function() {
      fn = utils.deepExtend;
    });

    it('Performs a deep extend', function() {
      var target = {
        a: 1,
        b: {
          a: 1,
          b: 2
        }
      };
      var source = {
        b: {
          b: 3,
          c: 4
        },
        c: 4
      };
      var result = fn(target, source);
      expect(result).toEqual({
        a: 1,
        b: {
          a: 1,
          b: 3,
          c: 4
        },
        c: 4
      });
    });
  });
});
