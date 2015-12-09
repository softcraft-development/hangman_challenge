Hangman.Controllers.controller("Game", function($scope, $http, $routeParams){
  promise = $http.get("games/" + $routeParams.gameId + ".json")
  promise.success(function(data) {
    _.extend($scope, data)
  });
  promise.error(function(){
    debugger;
  });
  
  $scope.$watch("misses", function(newValue){
    // Misses happen to match up with frames, so we can pass newValue directly, 
    // but this is where we'd transform it if necessary.
    $scope.$emit("update", newValue);
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
