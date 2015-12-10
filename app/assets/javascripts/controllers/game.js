Hangman.Controllers.controller("Game", ["$scope", "$http", "$routeParams", "currentGame", function($scope, $http, $routeParams, currentGame){
  if (currentGame.exists()) {
    _.extend($scope, currentGame.getGameData());
  }
  else {
    promise = $http.get("games/" + $routeParams.gameId + ".json")
    promise.success(function(data) {
      _.extend($scope, data);
    });
    promise.error(function(){
      console.log("An error occurred retrieving the game.");
    });
  }
  
  $scope.$watch("misses", function(newValue){
    // Misses happen to match up with frames, so we can pass newValue directly, 
    // but this is where we'd transform it if necessary.
    $scope.$emit("update", newValue);
  });
  
  $scope.makeGuess = function(letter){
    if ($scope.status == null) {
      promise = $http.put("games/" + $routeParams.gameId + "/guesses/" + letter.toUpperCase() + ".json")
      promise.success(function(data){
        _.extend($scope, data.game)
      });
      promise.error(function(){
        console.log("An error occurred making a guess.");
      });
    }
  };
}]);
