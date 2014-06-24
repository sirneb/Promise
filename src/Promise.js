var Promise = function() {
  
};

var Deferred = function() {
  var _promise = new Promise();

  this._successCb = [];
  this._failCb = [];

  this.promise = function() {
    return _promise;
  };

};

Deferred.prototype.done = function(handler) {
  this._successCb.push(handler);
};

Deferred.prototype.reject = function(handler) {
  this._failCb.push(handler);
};

Deferred.prototype.resolve = function(value) {
  _.each(this._successCb, function(handler) {
    setTimeout(function() {
      handler.call(null, value);
    }, 0);
  });
};

Deferred.prototype.fail = function(value) {
  _.each(this._failCb, function(handler) {
    setTimeout(function() {
      handler.call(null, value);
    }, 0);
  });
};
