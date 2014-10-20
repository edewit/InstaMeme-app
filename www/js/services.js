angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('service', function ($q) {
  return {
    get: function () {
      var deferred = $q.defer();
      $fh.cloud({
        "path": "/cloud/picture",
        "method": "GET"
      }, function(res) {
        deferred.resolve(res);
      });
      
      return deferred.promise;
    },
    put: function (data) {
      var photo = data.pic,
        deferred = $q.defer();

      var win = function (r) {
        console.log("put " + r);
        deferred.resolve(r);
      }.bind(this);

      var fail = function (error) {
        alert("An error has occurred: Code = " + error);
        deferred.reject(error);
      };
      
      $fh.cloud({
        "path": "/cloud/picture",
        "data": {
          "data": data.pic.split(',')[1]
        }
      }, win, fail);

      return deferred.promise;
    },
    tweet: function (url) {
      var deferred = $q.defer();
      var win = function (r) {
        console.log("retweeted " + r);
        deferred.resolve(r);
      }.bind(this);

      var fail = function (error) {
        alert("An error has occurred: Code = " + error);
        deferred.reject(error);
      };
      
      $fh.cloud({
        "path": "/cloud/picture/retweet",
        "data": {
          "url": url
        }
      }, win, fail);
    }
  };
});