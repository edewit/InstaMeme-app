angular.module('starter.controllers', [])

.controller('AppCtrl', function ($rootScope, $scope, $timeout, $location, service) {
  $scope.slide = 0;
  
  $scope.takePicture = function () {
    getPicture();
  };

  $scope.showImages = function () {
    $location.url('/tab/main');
  };

  $scope.$on('notification', function ($scope, event) {
    $rootScope.$apply(function() {
      $rootScope.notification = event;  
    });

    $timeout(function () {
      $location.url('/tab/main');
      delete $rootScope.notification;
    }, 2000);
  });

  $scope.dismissAlert = function () {
    delete $rootScope.notification;
  };

  $scope.showTwitter = function() {
    return $scope.data || $location.url() === '/tab/main';
  };
  
  $scope.upload = function () {
    if ($scope.data) {
      service.put({
        pic: $scope.data
      }).then(function (r) {
        reset();
      });
    } else {
      var url = $rootScope.photos[$scope.slide];
      service.tweet(url);
    }
  };

  function reset() {
    $scope.data = null;
  }

  function getPicture() {
    var onSuccess = function (data) {
      $scope.data = "data:image/jpeg;base64," + data;
      $scope.$apply();
    };

    var onFail = function (error) {
      console.log('failure ' + error);
    };

    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 640,
      targetHeight: 480,
      correctOrientation: true,
      popoverOptions: CameraPopoverOptions
    });

    $location.url('/tab/picture');
  }

  reset();
})

.controller('MainCtrl', function ($rootScope, $scope, $ionicSlideBoxDelegate, service) {
  function fetchPhotos(url) {
    service.get().then(function (res) {
      $scope.photos = res.pictures.map(function (pic) {
        return $fh.cloud_props.hosts.url + '/' + pic;
      });
      $ionicSlideBoxDelegate.update();

      if (url) {
        selectSlide(url);
      }
    }, function (err) {
      console.log(err);
    });
  };

  function selectSlide(url) {
    var length = $scope.photos.length;
    for (var i = 0; i < length; i++) {
      if ($scope.photos[i] === url) {
        $ionicSlideBoxDelegate.slide(i);
      }
    }
  }
  
  $scope.$on('notification', function ($scope, event) {
    fetchPhotos(event.payload.url);
  });

  fetchPhotos();
})

.controller('PictureCtrl', function ($scope, service) {});