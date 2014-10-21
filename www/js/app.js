// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    var pushConfig = {
      pushServerURL: "https://push-ipaasdevoxx.rhcloud.com/ag-push/",
      android: {
        senderID: "517285908032",
        variantID: "bb4d2e21-9baf-4204-b0b6-33873fb0b0fc",
        variantSecret: "39de7063-7232-43c0-b18c-d401cc23a71d"
      },
      ios: {
        variantID: '0fb33585-3b53-4de6-8f02-1a93a42f0d5c',
        variantSecret: 'e4a07d8f-66cd-4d40-ad6d-a4e8000f42d8'
      }
    };
    
    push.register(onNotification, successHandler, errorHandler, pushConfig);

    function onNotification(event) {
      angular.element(document.getElementById('root')).scope().$broadcast('notification', event);
    }

    function successHandler() {
      console.log('success');
    }

    function errorHandler(message) {
      console.log('error ' + message);
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
    controller: 'AppCtrl'
  })

  .state('tab.main', {
    url: "/main",
    views: {
      'tab-dash': {
        templateUrl: "templates/main.html",
        controller: 'MainCtrl'
      }
    }
  })

  .state('tab.picture', {
    url: "/picture",
    views: {
      'tab-dash': {
        templateUrl: "templates/picture.html",
        controller: 'PictureCtrl'
      }
    }
});

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/picture');

});
