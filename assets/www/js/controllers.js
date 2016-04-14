


angular.module('starter.controllers', ['ionic', 'ngCordova'])
.controller('LoginCtrl', function($scope, $state, UserService, $ionicLoading, $ionicPopup, $http) {

  $scope.googleSignIn = function() {
    $ionicLoading.show({
      template: 'Logging in...'
    });
    window.plugins.googleplus.login(
        {},
        function (user_data) {
          console.log(user_data);
          //for the purpose of this example I will store user data on local storage
          UserService.setUser({
            userID: user_data.userId,
            name: user_data.displayName,
            email: user_data.email,
            picture: user_data.imageUrl,
            accessToken: user_data.accessToken,
            idToken: user_data.idToken
          });
          $ionicLoading.hide();
          $state.go('register');
        },
        function (msg) {
          $ionicLoading.hide();
          console.log(msg);
        }
    );
  };


$scope.email="";


////CONFIRM PASSWORD---------------------------------------------------

    $scope.new_pass = function () {
      if(document.getElementById("pass").value == document.getElementById("cpass").value){

                var request_new_pass = $http({
                                   method: "post",
                                   url: "http://45.55.245.79:81/projects/windly/api/Sample/change_password",
                                   data: {email_id:email,
                                   new_pass:document.getElementById("pass").value
                                   },
                                   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                               });

                               /* Check whether the HTTP Request is successful or not. */
                               request_new_pass.success(function (data) {
                               	//alert("hii");
                                 if(data.status == 'success'){
                      //  $ionicLoading.hide();
                                  $state.go('login');
                                  $ionicPopup.alert({
                                           title: 'Success',
                                           template: 'Password Changed Successfully'
                                           });
                                 }else{

                                 }

                               });

                         request_new_pass.error(function(data, status){
                                   // $scope.res = data+status;
                         		   $ionicLoading.hide();
                         		//alert(data.status);
                         		$ionicPopup.alert({
                                 title: 'Success',
                                 template: data.status
                                 });
                                });

      }else{

      $ionicPopup.alert({
                     title: 'Failure',
                     template:'Password Mismatch'
                     });

      }

      }

  ////////////////////////////
  ////ENTER PASSCODE---------------------------------------------------

    $scope.confirm_pass = function () {
      $ionicPopup.alert({
                           title: 'Success',
                           template:document.getElementById("passcode").value
                           });

                var request_confirm_pass = $http({
                    method: "post",
                    url: "http://45.55.245.79:81/projects/windly/api/Sample/confirm_pass",
                    data: {email_id:email,passcode:document.getElementById("passcode").value},
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });

                /* Check whether the HTTP Request is successful or not. */
                request_confirm_pass.success(function (data) {
                	alert(data.status);
                  if(data.status == 'success'){
                   $ionicLoading.hide();
                   $state.go('newpass');
                  }else{
           $ionicPopup.alert({
                           title: 'Success',
                           template:'Incorrect Passcode! Please try again'
                           });
                  }

                });

          request_confirm_pass.error(function(data, status){
                    // $scope.res = data+status;
          		   $ionicLoading.hide();
          		//alert(data.status);
          		$ionicPopup.alert({
                  title: 'Success',
                  template: data.status
                  });
                 });

               }

  ////////////////////////////
 ///FORGOT PASSWORD--------------------------------------
 $scope.forgot_password = function (emailid) {

            var request_forgot_password = $http({
                method: "post",
                url: "http://45.55.245.79:81/projects/windly/api/Sample/forgot_password",
                data: {email_id:emailid},
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            /* Check whether the HTTP Request is successful or not. */
            request_forgot_password.success(function (data) {
            	alert("success");

            	$ionicLoading.hide();
            	email=emailid;
            	$state.go('passcode');

            });

      request_forgot_password.error(function(data, status){
                // $scope.res = data+status;
      		   $ionicLoading.hide();
      		//alert(data.status);
      		$ionicPopup.alert({
              title: 'Success',
              template: data.status
              });
             });

           }





                   $scope.showPopup = function() {
                   $scope.data = {};
                   // An elaborate, custom popup
                   var myPopup = $ionicPopup.show({
                     template: '<input type="email" ng-model="data.email">',
                     title: 'Enter Your Mail-Id',
                     scope: $scope,
                     buttons: [
                       { text: '<b>Submit</b>',
                         type: 'button-positive'	  },
                       {
                         text: '<b>Cancel</b>',
                         onTap: function(e) {
                           if (!$scope.data.wifi) {
                             //don't allow the user to close unless he enters wifi password
                             e.preventDefault();
                           } else {

                             return $scope.data.wifi;


                           }
                         }
                       }
                     ]
                   });

                      myPopup.then(function(res) {
//                  alert($scope.data.email);
                 $scope.forgot_password($scope.data.email);

                      console.log('Thank you for not eating my delicious ice cream cone');
                 	// $state.go('register');
                    });
                  };




 /////////////////////////////////////////
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})




.controller('SplashCtrl', function($scope, $state, $timeout, $localstorage) {

if($localstorage.get('agent_id','')==''){
    $timeout(function() {
          $state.go('login');
          }, 3000);
}else{
    $timeout(function() {
              $state.go('app.tabs.home');
              }, 3000);
}


    })
.controller('TabsCtrl', function($scope) {
  $scope.savedtext = "1-4 RESIDENTIAL CONTACT"
})
.controller('SignatureCtrl', function($scope) {
})
.controller('HomefirstCtrl', function($scope) {
  $scope.name1 = "JOHN SMITH"
  $scope.name2 = "& KILLY SMITH"
  $scope.number = "(432) 311 0099"
  $scope.mail = "killy@gmail.com"
  $scope.address = "701 Brozes St., Austin, TX,78701"
  $scope.image1 = 'img/homefirst.png';
  $scope.home = "SINGLE FAMILY HOME"
  $scope.price = "$ 750,000"
  $scope.location = "701 Brazos St.Austin"
  $scope.date = "Oct 20, 2015"
})
.controller('HomeCtrl', function($scope, $state, $http, $ionicLoading, $ionicPopup, $localstorage) {

$scope.home_properties = function () {

	//$ionicLoading.show({
    //  template: 'Loading..'
   // });

var request_home_properties = $http({
    method: "post",
    url: "http://45.55.245.79:81/projects/windly/api/Sample/property_highest",
    data: {agent_id:$localstorage.get("agent_id","")},
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

/* Check whether the HTTP Request is successful or not. */
request_home_properties.success(function (data) {
	$scope.tabs =data;

	$ionicLoading.hide();

});

request_home_properties.error(function(data, status){
$ionicLoading.hide();
          // $scope.res = data+status;
		   $ionicLoading.hide();
		//alert(data.status);
		$ionicPopup.alert({
        title: 'Success',
        template: data.status
        });
        alertPopup.then(function(res){

        });
       });
	 }



$scope.details="";

$scope.property_view = function (pid) {
     //alert(pid);

         	//$ionicLoading.show({
             //  template: 'Listing'
              //});


          //document.getElementById("message").textContent = "";
          var request_property_view = $http({
              method: "post",
              url: "http://45.55.245.79:81/projects/windly/api/Sample/property_detail",
              data: {property_id:pid,agent_id:$localstorage.get("agent_id","")},
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });

           request_property_view.success(function (data) {
               	//$scope.items =data.properties;
           // alert(data.property_detail.property_id);
            details="";
            details = data.property_detail;
//            document.getElementById("price_data").value=data.property_detail.property_price;
           //alert($scope.price);
            $ionicLoading.hide();
            $state.go('propertydetailhome', {}, {reload: true});
            });

           request_property_view.error(function(data, status){

     		   $ionicLoading.hide();
     		//alert(data.agent_id);
            });

   }



   $scope.initial_detail = function () {
        //alert(details.property_detail);


        $scope.price=details.property_price;
        $scope.property_type=details.property_type;
        $scope.property_detail=details.property_detail;
        $scope.property_location=details.property_location;
        $scope.bedrooms=details.bedrooms;
        $scope.bathrooms=details.bathrooms;
        $scope.sqft=details.sqft;
        $scope.Agent_name=details.Agent_name;
        $scope.Agent_email=details.Agent_email;
        $scope.property_img=details.property_img;
         //document.getElementById("price_data").value=details.property_price;
   }



  $scope.name1 = "JOHN SMITH"
  $scope.name2 = "& KILLY SMITH"
  $scope.number = "(432) 311 0099"
  $scope.mail = "killy@gmail.com"
  $scope.address = "701 Brozes St., Austin, TX,78701"
  $scope.image1 = 'img/homefirst.png';
  $scope.image2 = 'img/homeimglist.png';
  $scope.home = "SINGLE FAMILY HOME"
  $scope.price = "$ 750,000"
  $scope.location = "701 Brazos St.Austin"
  $scope.date = "Oct 20, 2015"
})
.controller('BuyerdetailsCtrl', function($scope) {
  $scope.name1 = "JOHN SMITH"
  $scope.name2 = "& KILLY SMITH"
  $scope.number = "(432) 311 0099"
  $scope.mail = "killy@gmail.com"
  $scope.address = "701 Brozes St., Austin, TX,78701"
  $scope.image1 = 'img/homeimglist.png';
  $scope.home = "SINGLE FAMILY HOME"
  $scope.price = "$ 750,000"
  $scope.location = "701 Brazos St.Austin"
  $scope.date = "Oct 20, 2015"
  $scope.phone = "08251840191"
})
.controller('GetlistCtrl', function($scope) {
  $scope.image1 = 'img/homeimglist.png';
  $scope.home = "SINGLE FAMILY HOME"
  $scope.price = "$ 750,000"
  $scope.location = "701 Brazos St.Austin"
  $scope.image2 = 'img/bedrooms.png'
  $scope.image3 = 'img/bathrooms.png'
  $scope.image4 = 'img/sqft-img.png'
})
.controller('GetsearchCtrl', function($scope) {
  $scope.image1 = 'img/homeimglist.png';
  $scope.home = "SINGLE FAMILY HOME"
  $scope.price = "$ 750,000"
  $scope.location = "701 Brazos St.Austin"
  $scope.image2 = 'img/bedrooms.png'
  $scope.image3 = 'img/bathrooms.png'
  $scope.image4 = 'img/sqft-img.png'
})
.controller('PropertydetailsCtrl', function($scope) {


  $scope.name = "FOR SALE"
  $scope.add1 = "4803 Harmon Ave\nAustin, TX 78750\nSpicewood at Bull Creek"
  $scope.mail = "larry@gmail.com"
  $scope.image1 = 'img/PropertyDetai_imge_homel.png';
  $scope.home = "DETAILS"
  $scope.list = "LISTING AGENT INFORMATION"
  $scope.list1 = "LARRY SMITH"
  $scope.number = "453.345.3333"
  $scope.price = "$ 750,000"
  $scope.image2 = 'img/bedrooms.png'
  $scope.image3 = 'img/bathrooms.png'
  $scope.image4 = 'img/sqft-img.png'
  $scope.details = "Lorem ipsum dolor sit amet, consectetur\nadipiscing elit. Nam id sapien neque. Cum\nsociis natoque penatibus et magnis dis par-\nturient montes, nascetur ridiculus mus.\nFusce nec ultricies augue,at dictum elit.In\nhac habitasse platea dictumst. In tristique\nnisi ut ipsum ullamcorper,a pulvinar nisi tris-\ntique. Interdum et malesuada fames ac ante\nipsum primis in faucibus. Nulla ultrices ulla-\nmcorper lectus, vel viverra magna sceleris-\nque in. Quisque maximus ut mi id rutrum.\nDonec tincidunt maximus eros, quis rutrum\nenim consectetur sed."
})
.filter('nl3p', function () {
    return function(text){
        text = String(text).trim();
        return (text.length > 0 ? '<p class="pd">' + text.replace(/[\r\n]+/g, '</p><p class="pd">') + '</p>' : null);
    }
})
.controller('OffersdetailsCtrl', function($scope) {
  $scope.name = "FOR SALE"
  $scope.add1 = "4803 Harmon Ave\nAustin, TX 78750\nSpicewood at Bull Creek"
  $scope.mail = "larry@gmail.com"
  $scope.image1 = 'img/PropertyDetai_imge_homel.png';
  $scope.buyer = "Buyer"
  $scope.buyerval = "KELLY SMITH"
  $scope.offers = "Offers"
  $scope.offersval = "$745,000"
  $scope.fee = "Option Fee"
  $scope.feeval = "$100"
  $scope.period = "Option Period"
  $scope.periodval = "10 days"
  $scope.date = "Closing Date"
  $scope.dateval = "Dec 20, 2015"
  $scope.list = "LISTING AGENT INFORMATION"
  $scope.list1 = "LARRY SMITH"
  $scope.number = "453.345.3333"
  $scope.price = "$ 720,000"
  $scope.image2 = 'img/bedrooms.png'
  $scope.image3 = 'img/bathrooms.png'
  $scope.image4 = 'img/sqft-img.png'
})
.filter('nl3p', function () {
    return function(text){
        text = String(text).trim();
        return (text.length > 0 ? '<p class="pd">' + text.replace(/[\r\n]+/g, '</p><p class="pd">') + '</p>' : null);
    }
})
.controller('PickcontractCtrl', function($scope, $http, $localstorage, $ionicLoading, $ionicPopup) {



})
.controller('EditcontractCtrl', function($scope){
    $scope.para1 = "Lorem ipsum dolor sit amet, consectetur\nadipiscing elit. Etiam suscipit fermentum\nnibh, a lobortis magna sollicitudin ac. Sed \nlorem mi, sollicitudin a massa sed, mollis ali- \nquet turpis. Ut ornare maximus lorem et pel- \nlentesque. Sed odio nisl, faucibus eget ligula \nnon, mattis mollis eros."
    $scope.para2 = "Phasellus eu posuere turpis. Pellentesque\nmalesuada tellus a arcu sodales consectetur.\nSed consectetur sit amet neque euismod vi-\nverra. Donec id blandit ex. Maecenas quis\nurna lobortis, vehicula dolor quis, laoreet\njusto. Duis sem augue, posuere sed tellus\nnec, rhoncus sodales neque."
    $scope.para3 = "Curabitur lacus libero, posuere eu faucibus\nut, ultrices sollicitudin mi. Duis iaculis ali-\nquam est, nec faucibus dolor consequat eu.\nSed vestibulum cursus odio at rhoncus.\nPraesent tincidunt leo quis sodales inter-\ndum. Vestibulum ante ipsum primis in fauci-\nbus orci luctus et ultrices posuere cubilia\nCurae; Aenean egestas suscipit massa a fau-\ncibus."
    $scope.para4 = "Duis vel massa eros. Vestibulum et elit con-\nvallis, mollis sapien quis, congue turpis. Pel-\nlentesque imperdiet, arcu quis tincidunt\nplacerat, est diam interdum ex, et consequat\nnibh nibh et felis."
    $scope.para5 = "Pellentesque id ante quam. Pellentesque\ndictum vitae ipsum eu dictum. Proin ante\nlorem, tempus ut convallis vel, scelerisque sit\namet justo. Ut dictum id augue sit amet."

})
.controller('SavedcontractCtrl',function($scope, $ionicPopup, $timeout, $state) {
  $scope.savedtext = "1-4 RESIDENTIAL CONTACT"
 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
       title: 'Contract has been successfully sent to the ',
       template: ''
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
	 $state.go('app.tabs.home');
   });
 };
})
.controller('OffersCtrl', function($scope) {
  $scope.image1 = 'img/homeimglist.png';
  $scope.homepre = "Buyer:\n&nbspKELLY SMITH"
  $scope.price = "$ 750,000"
  $scope.location = "701 Brazos St.Austin"
  $scope.date = "Oct 20, 2015"
})
.filter('n30p', function () {
    return function(text){
        text = String(text).trim();
        return (text.length > 0 ? '<p class="off-namepre">' + text.replace(/[\r\n]+/g, '</p><p class="off-name">') + '</p>' : null);
    }
})


//////////////////////////////////// BUYER CONTROLLER ///////////////////////////////////////////////////////////
.controller('BuyeractiveCtrl', function($scope, $state, $http, $ionicLoading, $ionicPopup, $localstorage,$cordovaSms) {

 $scope.sms={};

      var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT'  // send SMS with the default SMS app
      //intent: ''        // send SMS without open any other app
      }
      };

  $scope.sendSms=function(num,msg){
    alert(num);
    alert(msg);

    $cordovaSms
        .send(num, msg, options)
          .then(function() {
              // Success! SMS was sent
              console.log('Success');
          }, function(error) {
          // An error occurred
              console.log(error);
        });//then
  };//sendSms



    $scope.showstartCard = true;
    $scope.showsecondCard = false;

    $scope.hideCard = function() {
        $scope.showstartCard = false;
        $scope.showsecondCard = true;
        $scope.buyer_closedlist();
    };
   $scope.showCard = function() {
    $scope.showstartCard = true;
    $scope.showsecondCard = false;
    //BUYER LIST FUNCTION CALL
$scope.buyer_list();
};

// BUYER LIST FUNCTION*********************************************************************
    $scope.buyer_list = function () {

       //$ionicLoading.show({
         //  template: 'Loading buyers'
        // });
    //document.getElementById("message").textContent = "";
     var request_buyers = $http({
         method: "post",
         url: "http://45.55.245.79:81/projects/windly/api/Sample/buyers_list",
         data: {agent_id:$localstorage.get("agent_id","")},
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
     });
   /* Check whether the HTTP Request is successful or not. */
     request_buyers.success(function (data) {
       // alert($localstorage.get("agent_id",""));
        $scope.buyeractive=data.buyer_active;
        $scope.buyerclos=data.buyer_closed;
        //alert($scope.buyerclos.length);
//         alert($scope.buyeractive);
         if($scope.buyeractive == false){

//          $ionicPopup.alert({
//                  title: 'Sorry',
//                  template: 'No buyers found!! Add Buyer'
//                  });

         }else{
//         $ionicPopup.alert({
//                           title: 'Yureka',
//                           template: 'Found something'
//                           });

         }

        $ionicLoading.hide();
        //$state.go('buyer-details');


//         }else{
//            $ionicLoading.hide();
//            alert("buyer having error! Try again");
          //document.getElementById("message").textContent = "Invalid credentials "+data.status;
//         }
     });

     request_buyers.error(function(data, status){
     $ionicLoading.hide();
                $scope.res = data+status;
             $ionicLoading.hide();
          //alert(data.status);
          $ionicPopup.alert({
             title: 'Success',
             template: data.status
             });
             alertPopup.then(function(res){

             });
            });
        }
//BUYER BETAILS FUNCTION......................................................
$scope.buyer_details="";

$scope.active_buyer = function (bid) {
     // alert(bid);

         	//$ionicLoading.show({
             //  template: 'Listing'
             // });
          var request_buyer_details = $http({
              method: "post",
              url: "http://45.55.245.79:81/projects/windly/api/Sample/buyer_details",
              data: {"agent_id": $localstorage.get("agent_id",""), "buyer_id": bid},
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
           request_buyer_details.success(function (data) {
            buyer_details="";
            buyer_details = data.buyer;

            $ionicLoading.hide();
            $state.go('buyer-details', {}, {reload: true});
            });

           request_buyer_details.error(function(data, status){

     		   $ionicLoading.hide();

            });

   }

//************************************** BUYER DETAILS ********************************************************
    $scope.buyerdetails = function () {
           //alert(details.buyer);
      $scope.details=data.buyer;

          // $scope.price=details.property_price;
         //  $scope.property_type=details.property_type;
         //  $scope.property_detail=details.property_detail;
         //  $scope.property_location=details.property_location;
          // $scope.bedrooms=details.bedrooms;
         //  $scope.bathrooms=details.bathrooms;
         //  $scope.sqft=details.sqft;
          // $scope.Agent_name=details.Agent_name;
         //  $scope.Agent_email=details.Agent_email;
         //  $scope.property_img=details.property_img;
            //document.getElementById("price_data").value=details.property_price;
      }


        //BUYER CLOSED LIST FUNCTION*********************************************************************
            $scope.buyer_closedlist = function () {

              // $ionicLoading.show({
               //    template: 'Loading '
               //  });
            //document.getElementById("message").textContent = "";
             var request_buyers = $http({
                 method: "post",
                 url: "http://45.55.245.79:81/projects/windly/api/Sample/buyers_list",
                 data: {agent_id:$localstorage.get("agent_id","")},
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             });
           /* Check whether the HTTP Request is successful or not. */
             request_buyers.success(function (data) {
               // alert($localstorage.get("agent_id",""));
                $scope.buyerclosed=data.buyer_closed;
        //         alert($scope.buyeractive);
                 if($scope.buyerclosed == false){

//                  $ionicPopup.alert({
//                          title: 'Sorry',
//                          template: 'no buyers has closed'
//                          });

                 }else{
//                 $ionicPopup.alert({
//                                   title: 'success',
//                                   template: 'yeah got it'
//                                   });

                 }

                $ionicLoading.hide();
                //$state.go('app.tabs.buyeractive');


        //         }else{
        //            $ionicLoading.hide();
        //            alert("buyer having error! Try again");
                  //document.getElementById("message").textContent = "Invalid credentials "+data.status;
        //         }
             });

             request_buyers.error(function(data, status){
             $ionicLoading.hide();
                        $scope.res = data+status;
                     $ionicLoading.hide();
                  //alert(data.status);
                  $ionicPopup.alert({
                     title: 'Success',
                     template: data.status
                     });
                     alertPopup.then(function(res){

                     });
                    });
                }


                   $scope.initial_buyer_detail = function () {

                        $scope.buyer_id = buyer_details[0].buyer_id;
                        $scope.buyer_name = buyer_details[0].buyer_name;
                        $scope.buyer_name2=buyer_details[0].buyer_name2;
                        $scope.addressline_1=buyer_details[0].addressline_1;
                        $scope.addressline_2=buyer_details[0].addressline_2;
                        $scope.buyer_phone=buyer_details[0].buyer_phone;
                        $scope.buyer_email=buyer_details[0].buyer_email;
                        $scope.modified_on=buyer_details[0].modified_on;
                        $scope.buyer_status=buyer_details[0].buyer_status;
                        $scope.add_by=buyer_details[0].add_by;
                        $scope.add_on=buyer_details[0].add_on;
                        $scope.buyer_phone_code=buyer_details[0].buyer_phone_code;
                         //document.getElementById("price_data").value=details.property_price;
                   }
                   ////EDIT BUYER-----------------------------------
             $scope.chk_buyer=function(bid) {
                   //alert(bid);
                  var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/;
                  var phoneNo = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

                   if(document.getElementById("buyer_name").value=='')
                  alert("Name Required");
                  else if(document.getElementById("addressline_1").value=='')
                  alert("Address Required");
                   else if(document.getElementById("addressline_2").value=='')
                  alert("Address Required");
                  else if(document.getElementById("buyer_phone").value=='')
                   alert("Phone Required");
                   else if(!phoneNo.test(document.getElementById("buyer_phone").value))
                  alert("Not a valid number");
                  else if(document.getElementById("buyer_email").value=='')
                   alert("Email Required");
                   else if(!emailRegex.test(document.getElementById("buyer_email").value))
                   alert("Not a valid Email");
                  else
                       $scope.edit_buyer(bid);
                   }

                   $scope.edit_buyer = function (bid) {
                   //alert(bid);
                      //alert(document.getElementById("buyer_name").value);
                          //$ionicLoading.show({
                          //    template: 'Updating buyer'
                          //  });
                       //document.getElementById("message").textContent = "";
                        var request_edit_buyer = $http({
                            method: "post",
                            url: "http://45.55.245.79:81/projects/windly/api/Sample/edit_buyer",
                            data: {agent_id:$localstorage.get("agent_id",""),
                            buyer_id:bid,
                                   name:document.getElementById("buyer_name").value,
                                   buyer2_name:document.getElementById("buyer_name2").value,
                                   addr1: document.getElementById("addressline_1").value,
                                   addr2:document.getElementById("addressline_2").value,
                                   phone:document.getElementById("buyer_phone").value,
                                   email:document.getElementById("buyer_email").value
                                   },
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
                      /* Check whether the HTTP Request is successful or not. */
                        request_edit_buyer.success(function (data) {
                          // alert($localstorage.get("agent_id",""));
                           $scope.buyeractive=data.edit_buyer;
                     $ionicPopup.alert({
                                 title: 'Success',
                                 template: data.status
                                 });

                           $ionicLoading.hide();
                      $state.go('app.tabs.buyeractive');
                        });

                        request_editbuyers.error(function(data, status){
                        $ionicLoading.hide();
                                   $scope.res = data+status;
                                $ionicLoading.hide();
                             //alert(data.status);
                             $ionicPopup.alert({
                                title: 'Success',
                                template: data.status
                                });
                                alertPopup.then(function(res){

                                });
                               });
                           }

/////DELETE BUYER--------------------------------------------
 $scope.delete_buyer = function (bid) {
                   //alert(bid);
                      //alert(document.getElementById("buyer_name").value);
                        $ionicPopup.alert({
                                    title: 'Are you sure, you want to delete??',
                                    template: "Delete Buyer?"
                                    }).then(function(res) {
                              if (res) {
                         // $ionicLoading.show({
                          //    template: 'Deleting'
                          //  });
                       //document.getElementById("message").textContent = "";
                        var request_delete_buyer = $http({
                            method: "post",
                            url: "http://45.55.245.79:81/projects/windly/api/Sample/delete_buyer",
                            data: {agent_id:$localstorage.get("agent_id",""),
                            buyer_id:bid },
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
                      /* Check whether the HTTP Request is successful or not. */
                        request_delete_buyer.success(function (data) {
                          // alert($localstorage.get("agent_id",""));
                           //$scope.buyeractive=data.delete_buyer;
                            $ionicLoading.hide();
                      $state.go('app.tabs.buyeractive');
                     });

                        request_deletebuyers.error(function(data, status){
                                             $ionicLoading.hide();
                                                        $scope.res = data+status;
                                                     $ionicLoading.hide();
                                                  //alert(data.status);
                                                  $ionicPopup.alert({
                                                     title: 'Success',
                                                     template: data.status
                                                     });
                                                     alertPopup.then(function(res){

                                                     });
                                                    });
                                             }

                                         });
 }

////MARK AS CLOSED------------------

 $scope.closed_buyer = function (bid) {
                   //alert(bid);
                      //alert(document.getElementById("buyer_name").value);
                        $ionicPopup.alert({
                              title: 'Do you want to close your buyer account??',
                              template: "Closing Buyer"
                              }).then(function(res) {
                              if (res) {
                          $ionicLoading.show({
                              template: 'Closing'
                            });
                       //document.getElementById("message").textContent = "";
                        var request_closed_buyer = $http({
                            method: "post",
                            url: "http://45.55.245.79:81/projects/windly/api/Sample/close_buyer",
                            data: {agent_id:$localstorage.get("agent_id",""),
                            buyer_id:bid },
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        });
                      /* Check whether the HTTP Request is successful or not. */
                        request_closed_buyer.success(function (data) {
                          // alert($localstorage.get("agent_id",""));
                           //$scope.buyeractive=data.delete_buyer;
                            $ionicLoading.hide();
                      $state.go('app.tabs.buyeractive');
                     });

                        request_closed_buyer.error(function(data, status){
                                             $ionicLoading.hide();
                                                        $scope.res = data+status;
                                                     $ionicLoading.hide();
                                                  //alert(data.status);
                                                  $ionicPopup.alert({
                                                     title: 'Success',
                                                     template: data.status
                                                     });
                                                     alertPopup.then(function(res){

                                                     });
                                                    });
                                             }

                                         });
 }



})


/////////////////////////////////////////////////////////////////////////////////////////////////
.filter('n20p', function () {
    return function(text){
        text = String(text).trim();
        return (text.length > 0 ? '<p class="buyde-align ba-first">' + text.replace(/[\r\n]+/g, '</p><span class="badge badge-assertive sm-badge">') + '</span>' : null);
    }
})
.controller('BuyercloseCtrl', function($scope) {
  $scope.name1 = "KILLY SMITH"
  $scope.number = "(432) 311 0099"
  $scope.offer1 = "3 OFFERS"
  $scope.address = "701 Brazos St., Austin, TX,78701"
  $scope.name2 = "ROGER BRODIE";
  $scope.address1 = "1120 Barton Creek, Austin, TX,78701"
  $scope.price = "$ 750,000"
  $scope.location = "701 Brazos St.Austin"
  $scope.offer2 = "5 OFFERS"
})
.filter('n20p', function () {
    return function(text){
        text = String(text).trim();
        return (text.length > 0 ? '<p class="buyde-align ba-first">' + text.replace(/[\r\n]+/g, '</p><span class="badge badge-assertive sm-badge">') + '</span>' : null);
    }
})
.controller('PlaylistCtrl', function($scope, UserService, $ionicActionSheet, $state, $ionicLoading){
  $scope.user = UserService.getUser();

})

.controller('GetstartedCtrl', function($scope, $state, $ionicLoading, $compile, $localstorage, $ionicPlatform, $cordovaGeolocation, $http, $ionicPopup) {
/// SWARUPA LIST VIEW

$scope.map_view = function () {

     	//$ionicLoading.show({
        //   template: 'Listing properties'
        // });


     //document.getElementById("message").textContent = "";
     var request_map = $http({
         method: "post",
         url: "http://45.55.245.79:81/projects/windly/api/Sample/all_properties",
         data: {agent_id:$localstorage.get("agent_id","")},
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
     });

      request_map.success(function (data) {
          	$scope.items =data.properties;
            $scope.init();

       $ionicLoading.hide();

       });

      request_map.error(function(data, status){

		   $ionicLoading.hide();
		//alert(data.status);
		$ionicPopup.alert({
        title: 'Success',
        template: data.status
        });
        alertPopup.then(function(res){

        });
       });
	 }

$scope.details="";

$scope.detail_view = function (pid,seller_name,seller_id) {
     //alert(pid);

         	//$ionicLoading.show({
             //  template: 'Listing'
              //});
              $localstorage.set('pid', pid);
              $localstorage.set('seller_name', seller_name);
              $localstorage.set('seller_id', seller_id);
//alert(seller_name);

          //document.getElementById("message").textContent = "";
          var request_detail_view = $http({
              method: "post",
              url: "http://45.55.245.79:81/projects/windly/api/Sample/property_detail",
              data: {property_id:pid,agent_id:$localstorage.get("agent_id","")},
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });

           request_detail_view.success(function (data) {
               	//$scope.items =data.properties;
           // alert(data.property_detail.property_id);
            details="";
            details = data.property_detail;
//            document.getElementById("price_data").value=data.property_detail.property_price;
           //alert($scope.price);
            $ionicLoading.hide();
            $state.go('propertydetails', {}, {reload: true});
            });

           request_detail_view.error(function(data, status){

     		   $ionicLoading.hide();
     		//alert(data.agent_id);
            });

   }



   $scope.initial_detail = function () {
        //alert(details.property_detail);


        $scope.price=details.property_price;
        $scope.property_type=details.property_type;
        $scope.property_detail=details.property_detail;
        $scope.property_location=details.property_location;
        $scope.bedrooms=details.bedrooms;
        $scope.bathrooms=details.bathrooms;
        $scope.sqft=details.sqft;
        $scope.Agent_name=details.Agent_name;
        $scope.Agent_email=details.Agent_email;
        $scope.property_img=details.property_img;
         //document.getElementById("price_data").value=details.property_price;
   }





 $scope.list_view = function () {

     	//$ionicLoading.show({
         //  template: 'Listing properties'
         //});


     //document.getElementById("message").textContent = "";
     var request_listing = $http({
         method: "post",
         url: "http://45.55.245.79:81/projects/windly/api/Sample/all_properties",
         data: {agent_id:$localstorage.get("agent_id","")},
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
     });

      request_listing.success(function (data) {
          	$scope.items =data.properties;

       $ionicLoading.hide();
       });

      request_listing.error(function(data, status){

		   $ionicLoading.hide();
		//alert(data.agent_id);
		$ionicPopup.alert({
        title: 'Success',
        template: data.status
        });
        alertPopup.then(function(res){

        });
       });
	 }


//// SWARUPA END

   $scope.disableTap = function () {
				var container = document.getElementsByClassName('pac-container');
				angular.element(container).attr('data-tap-disabled', 'true');
				var backdrop = document.getElementsByClassName('backdrop');
				angular.element(backdrop).attr('data-tap-disabled', 'true');
				// leave input field if google-address-entry is selected
				angular.element(container).on("click", function () {
					document.getElementById('address').blur();
				});
			};

    $scope.init = function() {
              var map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 12.941156, lng: 77.6191914},
				zoom: 13,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			  });
			    $scope.map = map;
				  if(!$scope.map) {
					return;
				}

			  var contentString = "<div class='row npad' ui-sref='propertydetails'><div class='col-40'><img  src='img/homeimglist.png' class='img-pop'></div><div class='col-60' style='padding: 2% 0 0 5%;'><div class='row h-imgtpop' ng-bind-html='home'></div><div class='row h-imgt2'  ng-bind-html='price'></div><div class='row list-pad list-mar'><img ng-src='{{image2}}' class='col-33 img-smpop'><img ng-src='{{image3}}' class='col-33 img-smpop'><img ng-src='{{image4}}' class='col-33 img-smpop'></div><div class='row npad list-mar'><div class='txt-sml'>3</div><div class='txt-sml'>2</div><div class='txt-sml'>1650</div></div></div></div>";
			  var compiled = $compile(contentString)($scope);
			  var infowindow = new google.maps.InfoWindow({
			  content: compiled[0]
			  });

			  	  // SWARUPA MAP MARKER
              			   $scope.markers = [];
              			   var infoWindow = new google.maps.InfoWindow();
              			         var createMarker = function (info){
                                        var marker = new google.maps.Marker({
                                            position: new google.maps.LatLng(info.latitude, info.longitude),
                                            map: $scope.map,
                                            icon: './img/marker.png',
                                            animation: google.maps.Animation.DROP,
                                            title: info.property_type
                                        });
//                                         var contentString = "<div class='row npad' ui-sref='propertydetails'><div class='col-40'><img  src='img/homeimglist.png' class='img-pop'></div><div class='col-60' style='padding: 2% 0 0 5%;'><div class='row h-imgtpop' ng-bind-html='home'></div><div class='row h-imgt2'  ng-bind-html='price'></div><div class='row list-pad list-mar'><img ng-src='{{image2}}' class='col-33 img-smpop'><img ng-src='{{image3}}' class='col-33 img-smpop'><img ng-src='{{image4}}' class='col-33 img-smpop'></div><div class='row npad list-mar'><div class='txt-sml'>3</div><div class='txt-sml'>2</div><div class='txt-sml'>1650</div></div></div></div>";
//                                        			  var compiled = $compile(contentString)($scope);
//                                        			  var infowindow = new google.maps.InfoWindow({
//                                        			  content: compiled[0]
//                                        			  });
//alert(info.property_location);
//$scope.pro_location=
                                        marker.content = '<div class="infoWindowContent">' + info.property_type + '</div>';
                                        google.maps.event.addListener(marker, 'click', function(){
                                        var contentString = "<div class='row npad' ng-click='detail_view("+info.property_id+")'><div class='col-40'><img  src="+'http://45.55.245.79:81/projects/windly/images/'+info.property_img+" class='img-pop'></div><div class='col-60' style='padding: 2% 0 0 5%;'><div class='row h-imgtpop'>"+info.property_type+"</div><div class='row h-imgt2' >"+info.property_price+"</div><div class='row list-pad list-mar'><img ng-src='img/bedrooms.png' class='col-33 img-smpop'><img ng-src='img/bathrooms.png' class='col-33 img-smpop'><img ng-src='img/sqft-img.png' class='col-33 img-smpop'></div><div class='row npad list-mar'><div class='txt-sml'>"+info.bedrooms+"</div><div class='txt-sml'>"+info.bathrooms+"</div><div class='txt-sml'>"+info.sqft+"</div></div></div></div>";
                                        var compiled = $compile(contentString)($scope);
                                            infoWindow.setContent(compiled[0]);


                                            infoWindow.open($scope.map, marker);
                                        });
                                        $scope.markers.push(marker);
                                    }
                                    for (i = 0; i < $scope.items.length; i++){
                                        createMarker($scope.items[i]);
                                    }
//		      var image = 'img/marker.png';
//		      var marker = new google.maps.Marker({
//			  map: map,
//			  icon: image,
//			  position:  {lat: 12.740913, lng: 77.825292}
//		    });
//              google.maps.event.addListener(marker, 'click', function() {
//					  infowindow.open(map,marker);
//				});
			// Create the search box and link it to the UI element.
			  var input = document.getElementById('address');
			  var searchBox = new google.maps.places.SearchBox(input);
			  // Bias the SearchBox results towards current map's viewport.
			  map.addListener('bounds_changed', function() {
				searchBox.setBounds(map.getBounds());
			  });
			  var markers = [];
			  // Listen for the event fired when the user selects a prediction and retrieve
			  // more details for that place.
			  searchBox.addListener('places_changed', function() {
				var places = searchBox.getPlaces();
				if (places.length == 0) {
				  return;
				}
				// Clear out the old markers.
				markers.forEach(function(marker) {
				marker.setMap(null);
				});
				markers = [];
				// For each place, get the icon, name and location.
				var bounds = new google.maps.LatLngBounds();
				places.forEach(function(place) {
				  var icon = {
					url: place.icon,
					size: new google.maps.Size(71, 71),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(25, 25)
				  };
				  // Create a marker for each place.
				  markers.push(new google.maps.Marker({
					map: map,
					icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
					title: place.name,
					position: place.geometry.location
				  }));
				  if (place.geometry.viewport) {
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				  } else {
					bounds.extend(place.geometry.location);
				  }
				});
				  map.fitBounds(bounds);
			  });


};



//$scope.cities = [
   // {
    //    city : 'Location 1',
     //   desc : 'Test',
    //    lat : 12.941156,
    //    long : 77.6191914
   // },
   // {
    //    city : 'Location 2',
    //    desc : 'Test',
   //     lat : 12.9553282,
   //     long : 77.6396903
   // },
   // {
        //city : 'Location 3',
        //desc : 'Test',
       // lat : 12.9729803,
     //   long : 77.6295003
   // },
   // {
    //    city : 'Location 4',
      //  desc : 'Test',
        //lat : 12.9370339,
        //long : 77.6248757
   // }

   // ];



				  $scope.image1 = 'img/homeimglist.png';
				  $scope.home = "SINGLE FAMILY HOME"
				  $scope.price = "$ 750,000"
				  $scope.location = "701 Brazos St.Austin"
				  $scope.image2 = 'img/bedrooms.png'
				  $scope.image3 = 'img/bathrooms.png'
				  $scope.image4 = 'img/sqft-img.png'
				  $scope.showstartCard = true;
				  $scope.showsecondCard = false;
				  $scope.showsearch = false;
				  $scope.hideCard = function() {
					$scope.showstartCard = false;
					$scope.showsecondCard = true;
					$scope.showsearch = false;
					$scope.list_view();
				  };
			      $scope.hideCard1 = function() {
					$scope.showstartCard = false;
					$scope.showsecondCard = true;
					$scope.showsearch = true;
					};
				  $scope.showCard = function() {
					$scope.showstartCard = true;
					$scope.showsecondCard = false;
				};
				$scope.items = [
				{

				}

				];

//	              $scope.items = [
//				{
//					image2 : 'img/bedrooms.png',
//					image3 : 'img/bathrooms.png',
//					image4 : 'img/sqft-img.png',
//					homename: 'SINGLE FAMILY HOME',
//					price: '$ 750,000',
//					location: '701 Brazos St.Austin',
//					image1 : 'img/homeimglist.png'
//				},
//				{
//					image2 : 'img/bedrooms.png',
//					image3 : 'img/bathrooms.png',
//					image4 : 'img/sqft-img.png',
//					homename: 'DOUBLE FAMILY HOME',
//					price: '$ 745,000',
//					location: '1120 Barton Creek, Austin, TX,78701',
//					image1 : 'img/homeimglist.png'
//				},
//
//	];
})

.controller('SideMenuCtrl', function($scope, $localstorage, $ionicPopup, $state, $ionicHistory, $window, $timeout) {

 $scope.mainView = function() {
     $scope.name=$localstorage.get("name","");
     $scope.email=$localstorage.get("email","");
     //alert($localstorage.get("name",""));
     document.getElementById("name").value = $localstorage.get("name","");
     document.getElementById("email").value = $localstorage.get("email","");


  };

  $scope.check_logout = function () {

  $ionicPopup.confirm({
          title: 'System warning',
          template: 'are you sure you want to logout?'
        }).then(function(res) {
          if (res) {
            $localstorage.clearall();
            $state.go('splash',{},{location: 'replace'});
            $timeout(function() {
                      $state.go('login');
                      }, 3000);
            $window.location,reload(true);
            //var current=$state.go('splash');
           // var params = angular.copy($stateParams);
           //$state.transitionTo(current, null, { reload: true, inherit: true, notify: true });
          }

        })

  };


})


.controller('EditbuyerCtrl', function($scope) {

})
.controller('AddbuyerCtrl', function($scope) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };
})

//LOGIN CONTROLLER
.controller('login', function ($scope, $state, $http, $ionicLoading, $localstorage, $ionicPopup) {

/*
* This method will be called on click event of button.
* Here we will read the email and password value and call our PHP file.
*/




$scope.check_credentials = function () {


//$ionicLoading.show({
 //     template: 'Logging in'
   // });
document.getElementById("message").textContent = "";

var request = $http({
    method: "post",
    url: "http://45.55.245.79:81/projects/windly/api/Sample/agent_login",
    data: {
        email: $scope.email,
        password: $scope.password
    },
    headers: { 'Content-Type': 'application/json' }
});

/* Check whether the HTTP Request is successful or not. */
  request.success(function (data) {
	console.log(data);
	if(data.status=='success'){
	$ionicLoading.hide();
	//alert(data.agent_id);
	$localstorage.set('agent_id', data.agent_id);
	$localstorage.set('email', data.email);
	$localstorage.set('name', data.name);
	//alert($localstorage.get('email',''));
	 $state.go('app.tabs.home');
    //alert("Login Successfull")
$ionicPopup.alert({
title: 'Success',
template: 'Logged in Successfully!'
});
alertPopup.then(function(res){

});
	//alert(data);
	}else{
	    $ionicLoading.hide();
		alert("Invalid Credentials")
	}
});

request.error(function(data, status){
           $scope.res = data+status;
           $ionicLoading.hide();
           		alert(data.status);
       });
}
})



.controller('AgentRegister', function ($scope, $state, $http, $ionicLoading, $ionicPopup, $localstorage) {

/*
* This method will be called on click event of button.
* Here we will read the email and password value and call our PHP file.
*/
//$scope.name=null;

$scope.validate=function() {
var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/;
var phoneNo = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

if(document.getElementById("name").value=='')
    alert("Name Required");
else if(document.getElementById("phone").value=='')
alert("Phone Required");
else if(!phoneNo.test(document.getElementById("phone").value))
alert("Not a valid number");
else if(document.getElementById("email").value=='')
alert("Email Required");
else if(!emailRegex.test(document.getElementById("email").value))
alert("Not a valid Email");
else if(document.getElementById("password").value=='')
alert("Password Required");
else if(document.getElementById("company").value=='')
alert("Company name Required");
else if(document.getElementById("licence").value=='')
alert("Licence Required");
else if(document.getElementById("supervisor").value=='')
alert("Supervisor Required");
else if(document.getElementById("company_phone").value=='')
alert("Company Phone Required");
else if(!phoneNo.test(document.getElementById("company_phone").value))
alert("Not a valid number");
else if(document.getElementById("company_email").value=='')
alert("Company mail Required");
else if(document.getElementById("address").value=='')
alert("Address Required");
else
    $scope.register_agent();
}

$scope.register_agent = function () {

//alert(document.getElementById("test").value);
$ionicLoading.show({
      template: 'Registering User'
    });
document.getElementById("message").textContent = "";
var request_agent_register = $http({
    method: "post",
    url: "http://45.55.245.79:81/projects/windly/api/Sample/agent_register",
    data: {
                name: document.getElementById("name").value,
                phone: document.getElementById("phone").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                company: document.getElementById("company").value,
                licence: document.getElementById("licence").value,
                supervisor: document.getElementById("supervisor").value,
                company_phone: document.getElementById("company_phone").value,
                company_email: document.getElementById("company_email").value,
                address: document.getElementById("address").value
    },
    headers: { 'Content-Type': 'application/json' }
});

/* Check whether the HTTP Request is successful or not. */
  request_agent_register.success(function (data) {
	console.log(data);
	if(data.status=='success'){
	 $ionicLoading.hide();
	 $localstorage.set('agent_id', data.agent_id);
     	$localstorage.set('email', data.agent_email);
     	$localstorage.set('name', data.agent_name);
	 $state.go('app.homefirst');
    //alert("Registered Successfully");
    $ionicPopup.alert({
    title: 'Success',
    template: 'Registered Successfully :)'
    });
    alertPopup.then(function(res){

    });

	//alert(data);
	}else{
	 $ionicLoading.hide();
		alert("Sign up error! Try again");
	}
});

request_agent_register.error(function(data, status){
           $scope.res = data+status;
		   $ionicLoading.hide();
		alert(data.status);
       });
}
})




.controller('buyerreg', function ($scope, $state, $http, $ionicLoading, $ionicPopup, $localstorage) {

	$scope.validate_buyer=function() {
var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/;
var phoneNo = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

if(document.getElementById("name_buyer").value=='')
alert("Name Required");
else if(document.getElementById("addressline1").value=='')
alert("Address Required");
else if(document.getElementById("addressline2").value=='')
alert("Address Required");
else if(document.getElementById("phone_buyer").value=='')
alert("Phone Required");
else if(!phoneNo.test(document.getElementById("phone_buyer").value))
alert("Not a valid number");
else if(document.getElementById("email_buyer").value=='')
alert("Email Required");
else if(!emailRegex.test(document.getElementById("email_buyer").value))
alert("Not a valid Email");

else
    $scope.reg_buyer();
}
$scope.reg_buyer = function () {

	$ionicLoading.show({
      template: 'Registering buyer'
    });


//document.getElementById("message").textContent = "";
var request_buyer_register = $http({
    method: "post",
    url: "http://45.55.245.79:81/projects/windly/api/Sample/buyer_register",
    data: {
        buyer_name:document.getElementById("name_buyer").value,
        buyer_name2:document.getElementById("buyername2").value,
        addressline_1: document.getElementById("addressline1").value,
        addressline_2:document.getElementById("addressline2").value,
        buyer_phone:document.getElementById("phone_buyer").value,
        buyer_email:document.getElementById("email_buyer").value,
        agent_id:$localstorage.get("agent_id","")
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

/* Check whether the HTTP Request is successful or not. */
request_buyer_register.success(function (data) {
	console.log(data);
	if(data.status=='success'){
//	 document.getElementById("name").value="";
//               document.getElementById("buyername2").value="";
//               document.getElementById("phone").value="";
//               document.getElementById("email").value="";
//               document.getElementById("addressline1").value="";
//               document.getElementById("addressline2").value="";



	$ionicLoading.hide();
	$state.go('app.tabs.buyeractive');
	//alert("Buyer Registered Successfully");
    //document.getElementById("message").textContent = "Your buyer account has been successfully registered "+data.status;
	$ionicPopup.alert({
    title: 'Success',
    template: 'Buyer registration Successfull!'
    });
}else{
		$ionicLoading.hide();
		alert("buyer having error! Try again");
		//document.getElementById("message").textContent = "Invalid credentials "+data.status;
	}
});

request_buyer_register.error(function(data, status){
$ionicLoading.hide();
           $scope.res = data+status;
		   $ionicLoading.hide();
		//alert(data.status);
		$ionicPopup.alert({
        title: 'Success',
        template: data.status
        });
        alertPopup.then(function(res){

        });
       });
	 }



})


.controller('ImageController', function($scope, $cordovaDevice, $cordovaFile, $ionicPlatform, $cordovaEmailComposer, $ionicActionSheet, ImageService, FileService) {

  $ionicPlatform.ready(function() {
    $scope.images = FileService.images();
    $scope.$apply();
  });

  $scope.urlForImage = function(imageName) {
    var trueOrigin = cordova.file.dataDirectory + imageName;
    return trueOrigin;
  }

  $scope.addMedia = function() {
    $scope.hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Take photo' },
        { text: 'Photo from library' }
      ],
      titleText: 'Add images',
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        $scope.addImage(index);
      }
    });
  }
  $scope.addImage = function(type) {
      $scope.hideSheet();
      ImageService.handleMediaDialog(type).then(function() {
        $scope.$apply();
      });
    }
 })


.controller('ProfileCtrl', function($scope, $state, $ionicLoading, $http, $ionicPopup){

 $scope.profile_credentials = function () {


 //$ionicLoading.show({
   //    template: 'Loading..'
    // });
 //document.getElementById("message").textContent = "";

 var request = $http({
     method: "post",
     url: "http://45.55.245.79:81/projects/windly/api/Sample/my_account",
     data: {agent_id:$localstorage.get("agent_id","")},
     headers: { 'Content-Type': 'application/json' }
 });

 /* Check whether the HTTP Request is successful or not. */
   request.success(function (data) {
  // document.getElementById("name").value=data.account_details.name;

 	//console.log(data.account_details);
 	$scope.account_details=data.account_details;
// 	if(data.status=='success'){
 	$scope.name=data.account_details.name;
 	$scope.email=data.account_details.email;
 	$scope.phone=data.account_details.phone;
    $scope.company=data.account_details.company;

    $ionicLoading.hide();
 	// $state.go('app.tabs.home');
 alertPopup.then(function(res){

 });
 	//alert(data);
// 	}else{
// 	    $ionicLoading.hide();
// 		alert("Invalid Credentials")
// 	}
 });

 request.error(function(data, status){
            $scope.res = data+status;
            $ionicLoading.hide();
            		alert(data.status);
        });
 }

})
.controller('PopupCtrl', function($scope, $state, $ionicLoading, $http, $ionicPopup, $localstorage,$cordovaInAppBrowser){
/////PDF CONTRACT------------------------------


$scope.view_link = function (url) {

            if (ionic.Platform.isAndroid()) {
//                if (link_type !== undefined && link_type !== null) {
//                    if (link_type.toLowerCase() !== 'html') {
                        url123 = 'https://docs.google.com/viewer?url=' + encodeURIComponent(url);
//                         url123 = 'https://docs.google.com/viewer?url=http://www.adobe.com/content/dam/Adobe/en/devnet/acrobat/pdfs/pdf_open_parameters.pdf';
//                    }
//                }
            }
             var options = {
                  location: 'no',
                  clearcache: 'yes',
                  toolbar: 'no'
               };
            $cordovaInAppBrowser.open(url123, '_blank', options)
//            var ref = window.open(url123, '_system', 'location=no');
        }




$scope.view_contract = function () {

$ionicLoading.show({
       template: 'Opening Contract..'
     });

/*{"agent_id":"35","buyer_id":"1","property_id":"1","seller_id":"1","contract":"pdf/contractJerry-Swarupa.pdf"}
*/

var request_view_contract = $http({
                    method: "post",
                    url: "http://45.55.245.79:81/projects/windly/api/Sample/Shw_ctct",
                    data:{"agent_id":"35","buyer_id":"1","property_id":"1","seller_id":"1","contract":"pdf/contractJerry-Swarupa.pdf"},
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });

                /* Check whether the HTTP Request is successful or not. */
                request_view_contract.success(function (data) {
                     $ionicLoading.hide();
                     console.log(data.contract+"jdhjhdf");

                            var myPopup = $ionicPopup.show({
                                                 template: 'Offer Submitted. Do you like to view it?',
                                                 title: 'Success',
                                                 scope: $scope,
                                                 buttons: [
                                                   { text: '<b>YES</b>',
                                                     type: 'button-positive',
                                                     onTap: function(e) {
                                                          $scope.view_link(data.contract); }
                                                     },
                                                   {
                                                     text: '<b>NO</b>',
                                                     onTap: function(e) {                                                     }
                                                   }
                                                 ]
                                               });




                });

          request_view_contract.error(function(data, status){
                    // $scope.res = data+status;
          		   $ionicLoading.hide();
          		//alert(data.status);
          		$ionicPopup.alert({
                  title: 'Success',
                  template: data.status
                  });
                 });


}




$scope.pdf_contract = function () {

$ionicLoading.show({
       template: 'Saving..'
     });



var request_pdf_contract = $http({
                    method: "post",
                    url: "http://45.55.245.79:81/projects/windly/api/Sample/save_offer",
                    data: { "agent_id":$localstorage.get('agent_id', ""), "buyer_id":buyer_id,"seller_id":$localstorage.get('seller_id', "") ,"property_id":$localstorage.get('pid', ""),
                    "buyer_name":document.getElementById("buyer_name").value,
                    "seller_name":document.getElementById("seller_name").value },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });

                /* Check whether the HTTP Request is successful or not. */
                request_pdf_contract.success(function (data) {
                    $ionicLoading.hide();
//                    $ionicPopup.alert({
//                            title: 'Success',
//                            template: data.status
//                            });

                            $scope.view_contract();

                });

          request_pdf_contract.error(function(data, status){
                    // $scope.res = data+status;
          		   $ionicLoading.hide();
          		//alert(data.status);
          		$ionicPopup.alert({
                  title: 'Success',
                  template: data.status
                  });
                 });

               }
///////////////////////////////////////////////////////////////////////
$scope.data = {
    clientSide: ''
  }

  $scope.buyer_id="";
  $scope.buyer_name="";


  $scope.serverSideChange = function(item) {
      //alert("Selected Serverside, text:", item.name, "value:", item.buyer_id);
//      alert(item.name+" "+item.value)
        buyer_id=item.buyer_id;
        buyer_name=item.name;
    }

    $scope.picked_contract = function (cid) {
    //alert(cid);
    $state.go('editcontract');
//    $ionicPopup.alert({
//                   title: 'Success',
//                   template:document.getElementById("buyer_name").value
//                   });
    document.getElementById("buyer_name").value=buyer_name;
    document.getElementById("seller_name").value=$localstorage.get("seller_name","");
     }

$scope.pick_contract = function () {

//$ionicLoading.show({
       //    template: 'Loading Contract'
       //  });
     var request_contract = $http({
         method: "post",
         url: "http://45.55.245.79:81/projects/windly/api/Sample/simple",
         data: {agent_id:$localstorage.get("agent_id","")},
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
     });

      request_contract.success(function (data) {
          	$scope.pickcontract=data.contracts;

       $ionicLoading.hide();
       });

      request_contract.error(function(data, status){

		   $ionicLoading.hide();
		  //$scope.go('pickcontract'),
		//alert(data.agent_id);
		$ionicPopup.alert({
        title: 'Success',
        template: data.status
        });
       });
	 }


    $scope.continue_button=function(){
        //alert(buyer_id+" "+buyer_name);
        if($scope.data.clientSide==''){
            $ionicPopup.alert({
                    title: 'Please select any Buyer',
                    template: ""
                    });
        }else{
            $state.go('pickcontract');
        }
    }

$scope.offer_popup = function () {
var request = $http({
     method: "post",
     url: "http://45.55.245.79:81/projects/windly/api/Sample/all_buyers",
     data: {agent_id:$localstorage.get("agent_id","")},
     headers: { 'Content-Type': 'application/json' }
 });
  request.success(function (data) {
  	$scope.buyerss=data.buyers;
//    $scope.name=data.buyers.name;
//   	alert(data.buyers.name);
    $ionicLoading.hide();
  	// $state.go('app.tabs.home');
    alertPopup.then(function(res){
     });
   });
 request.error(function(data, status){
             $scope.res = data+status;
             $ionicLoading.hide();
             		alert(data.status);
         });

}

})
.run(function($ionicPlatform, $ionicPopup) {
  // Disable BACK button on home
  $ionicPlatform.registerBackButtonAction(function(event) {
    if (true) { // your check here
      $ionicPopup.confirm({
        title: 'System warning',
        template: 'are you sure you want to exit?'
      }).then(function(res) {
        if (res) {
          ionic.Platform.exitApp();
        }
      })
    }
  }, 100);
});




