angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('service', function ($q) {
  var service = {
    pictures: [],
    get: function () {
      var deferred = $q.defer();
      $fh.cloud({
        "path": "/cloud/picture",
        "method": "GET"
      }, function(res) {
        service.pictures = res.pictures;
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
    tweet: function (index) {
      var deferred = $q.defer();
      var win = function (r) {
        console.log("retweeted " + r);
        deferred.resolve(r);
      }.bind(this);

      var fail = function (error) {
        alert("An error has occurred: Code = " + error);
        deferred.reject(error);
      };
      var url = $fh.cloud_props.hosts.url + '/' + service.pictures[index];
      $fh.cloud({
        "path": "/cloud/picture/retweet",
        "data": {
          "url": url
        }
      }, win, fail);
      
      return deferred.promise;
    }
  };
  return service;
});