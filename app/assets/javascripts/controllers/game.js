Hangman.Controllers.controller("Game", function($scope, $http, $routeParams){
  promise = $http.get("games/" + $routeParams.gameId + ".json")
  promise.success(function(data) {
    _.extend($scope, data)
  });
  promise.error(function(){
    debugger;
  });
  
  $scope.makeGuess = function(letter){
    promise = $http.put("games/" + $routeParams.gameId + "/guesses/" + letter.toUpperCase() + ".json")
    promise.success(function(data){
      _.extend($scope, data.game)
    });
    promise.error(function(){
      debugger;
    });
  };
});
