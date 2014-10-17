angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('service', function ($http, $log, $q) {
  return {
    get: function () {
      var deferred = $q.defer();
      return $http.get($fh.cloud_props.hosts.url + '/cloud/picture');
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
      
      $fh.act({
        "act": "picture",
        "req": {
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
      
      $fh.act({
        "act": "picture/retweet",
        "req": {
          "url": url
        }
      }, win, fail);
    }
  };
});