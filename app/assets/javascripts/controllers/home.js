Hangman.Controllers.controller("Home", function($scope, $http){
  promise = $http.get('games.json')
  promise.success(function(data) {
    $scope.openGames = data
  });
  promise.error(function(){
    debugger;
  });
});
