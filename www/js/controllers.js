angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $location, service) {
  $scope.takePicture = function () {
    getPicture();
  };

  $scope.showImages = function () {
    $location.url('/tab/main');
  };

  $scope.$on('notification', function ($scope, $location, event) {
    $location.url('/tab/picture');
    $scope.notification = event;
    $scope.data = null;
    $scope.$apply();
  });

  $scope.dismissAlert = function () {
    delete $scope.notification;
  };

  $scope.upload = function () {
    service.put({pic: $scope.data, meme: $scope.meme}).then(function (r) {
      $scope.data = null;
      $location.url('/tab/main');
    }).then(null, function (err) {
      alert('Error' + err);
      $location.url('/tab/main');
    });
  };

  function getPicture() {
    var onSuccess = function (data) {
      $scope.canvas = document.getElementById('myCanvas');
      context = $scope.canvas.getContext('2d');
      var imageObj = new Image();

      imageObj.onload = function() {
        context.drawImage(imageObj, 0, 0);
      };

      imageObj.src = data;

      $scope.data = data;
      $scope.$apply();
    };

    var onFail = function (error) {
      console.log('failure ' + error);
    };

    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 640,
      targetHeight: 480,
      popoverOptions: CameraPopoverOptions
    });

    $location.url('/tab/picture');
  }
})

.controller('MainCtrl', function ($scope, service) {
  $scope.fetchPhotos = function () {
    service.get().success(function (res) {
      $scope.photos = res.pictures.map(function (pic) {

        $fh.cloud_props = {hosts: {url: "http://192.168.0.12:8001"}};

        return $fh.cloud_props.hosts.url + '/' + pic;
      });
      window.dispatchEvent(new Event('resize'));
    })
    .error(function (err) {
      console.log(err);
    });
  };

  $fh.cloud_props = {hosts: {url: "http://192.168.0.12:8001"}};
  $scope.fetchPhotos();
})

.controller('PictureCtrl', function ($scope, service) {
});
