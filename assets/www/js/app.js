// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	  $ionicConfigProvider.tabs.position('bottom');
$stateProvider


    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


    .state('app.tabs', {
    url: '/tabs',
      views: {
        'menuContent': {
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl'
		}
	  }
  })



    .state('savedcontract', {
      url: '/savedcontract',

          templateUrl: 'templates/savedcontract.html',
          controller: 'SavedcontractCtrl'

    })

     .state('buyer-details', {
      url: '/buyer-details',

          templateUrl: 'templates/buyer-details.html',
          controller: 'BuyerdetailsCtrl'
    })
     .state('editbuyer', {
      url: '/editbuyer',

          templateUrl: 'templates/editbuyer.html',
          controller: 'EditbuyerCtrl'
    })
    .state('app.tabs.offers', {
    url: '/offers',
      views: {
        'tab-offers': {
    templateUrl: 'templates/offers.html',
    controller: 'OffersCtrl'
		}
	  }
  })

      .state('app.tabs.home', {
    url: '/home',
      views: {
        'tab-home': {
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
		}
	  }
  })
        .state('app.tabs.buyeractive', {
    url: '/buyeractive',
      views: {
        'tab-buyers': {
    templateUrl: 'templates/buyeractive.html',
    controller: 'BuyeractiveCtrl'
		}
	  }
  })
      .state('app.homefirst', {
    url: '/homefirst',
      views: {
        'menuContent': {
    templateUrl: 'templates/homefirst.html',
    controller: 'HomefirstCtrl'
		}
	  }
  })

      .state('app.tabs.getstarted', {
    url: '/getstarted',
      views: {
        'tab-getstarted': {
    templateUrl: 'templates/getstarted.html',
    controller: 'GetstartedCtrl'
		}
	  }
  })
  	  .state('editcontract', {
    url: '/editcontract',

        templateUrl: 'templates/editcontract.html',
        controller: 'EditcontractCtrl'

  })
  	  .state('splash', {
    url: '/splash',

        templateUrl: 'splash.html',
        controller: 'SplashCtrl'

  })

    	  .state('signature', {
    url: '/signature',

        templateUrl: 'templates/signature.html',
        controller: 'SignatureCtrl'

  })

    	  .state('propertydetails', {
    url: '/propertydetails',

        templateUrl: 'templates/propertydetails.html',
        controller: 'PropertydetailsCtrl'

  })
      	  .state('offersdetails', {
    url: '/offersdetails',

        templateUrl: 'templates/offersdetails.html',
        controller: 'OffersdetailsCtrl'

  })

  	  .state('addbuyer', {
    url: '/addbuyer',
        templateUrl: 'templates/addbuyer.html',
        controller: 'AddbuyerCtrl'

  })
     .state('pickcontract', {
    url: '/pickcontract',
        templateUrl: 'templates/pickcontract.html',
        controller: 'PickcontractCtrl'

  })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
       controller: 'LoginCtrl'
    })

  .state('register', {
    url: '/register',

        templateUrl: 'templates/register.html',
        controller: 'PlaylistCtrl'

  })
  .state('profile', {
      url: '/profile',

          templateUrl: 'templates/profile_new.html',
          controller: 'ProfileCtrl'

    })
    .state('submit-offer', {
          url: '/submit-offer',

              templateUrl: 'templates/submit-offer.html',
              controller: 'PopupCtrl'

        })

        .state('propertydetailhome', {
                  url: '/propertydetailhome',

                      templateUrl: 'templates/propertydetailhome.html',
                      controller: 'HomeCtrl'

                })

                .state('passcode', {
                      url: '/passcode',
                      templateUrl: 'templates/passcode.html',
                      controller: 'LoginCtrl'

                      })

                 .state('newpass', {
                        url: '/newpass',
                        templateUrl: 'templates/newpass.html',
                        controller: 'LoginCtrl'

                        });

  var app = angular.module('angular_post_demo', []);

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/splash');
});
