app.controller('homeCtrl', function($scope, $mdSidenav, $http, $state, $rootScope, $window,filterService) {
  console.log("inside homeCtrl");

  $http.get("assets/products.json").then(function(response) {
    $scope.myData = response.data;
    $scope.manufacturerArray = [];
    $scope.osArray = [];
    $scope.cameraArray = [];
    $scope.storageArray = [];
    $scope.toggle = function(item, list) {
      var indx = list.indexOf(item);
      if (indx > -1) {
        list.splice(indx, 1);
      } else {
        list.push(item);
      }
      console.log(list);
    };
  });

  $scope.toggleLeft = buildToggler('left');

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
      if ($scope.myobj == undefined) {
        $scope.myobj = {
          "margin-left": "320px"
        }
      } else {
        $scope.myobj = undefined;
      }
    };
  }
  $scope.toggleright = function() {
    // $window.localStorage.clear();
    $state.go('login');
  }

  $scope.cart = function() {
      $rootScope.cartobject = filterService.readData();
    if ($rootScope.cartobject.length!=undefined && $rootScope.cartobject.length == 0) {
$state.go('emptyCart');
    }else {
    $state.go('cart');
    }

  }

});
