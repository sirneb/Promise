describe('Defer Object', function() {
  var deferred;
  beforeEach(function() {
    deferred = new Deferred();
  });

  describe('#promise', function() {
    it('returns a promise object', function() {
      expect(deferred.promise() instanceof Promise).toBeTruthy();
    });

    it("returns the same promise object every call", function() {
      expect(deferred.promise()).toBe(deferred.promise());
    });
  });

  describe('_promise', function() {
    it('is not accessible publicly', function() {
      expect(deferred._promise).toBeUndefined();
    });
  });

  describe('#done', function() {
    it('takes a callback with a value and puts it in a success array', function() {
      var handler = function(){};
      deferred.done(handler);

      expect(deferred._successCb).toContain(handler);
    });
  });

  describe('#resolve', function() {
    it('takes an argument that is pass to a callback', function() {
      var a = {};
      var b = { handler: function(){} }
      spyOn(b, 'handler')

      deferred.done(b.handler);
      deferred.resolve(a);

      expect(b.handler).toHaveBeenCalledWith(a);
    });
  });

  describe('#reject', function() {
    it('takes a callback with a value and puts it in a fail array', function() {
      var handler = function(){};
      deferred.reject(handler);

      expect(deferred._failCb).toContain(handler);
    });
  });

  describe('#fail', function() {
    var a, b;

    beforeEach(function() {
      a = {};
      b = { handler: function(){done();} };
      spyOn(b, 'handler');

      deferred.reject(b.handler);
      deferred.fail(a);
    });

    it('takes an argument that is pass to a callback', function() {

      expect(b.handler).toHaveBeenCalledWith(a);
    });
  });
});
