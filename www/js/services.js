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
        meme = data.meme,
        deferred = $q.defer();

      var win = function (r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);

        deferred.resolve(r);
      }.bind(this);

      var fail = function (error) {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
        deferred.reject(error);
      };

      var options = new FileUploadOptions();
      var ft = new FileTransfer();
      options.fileKey = "file";
      options.mimeType = "image/jpeg";

      options.fileName = guid() + '.jpg';
      ft.upload(photo, encodeURI($fh.cloud_props.hosts.url + '/cloud/picture'), win, fail, options);

      return deferred.promise;
    }
  };
});

var guid = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };
})();