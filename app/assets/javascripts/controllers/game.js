Hangman.Controllers.controller("Game", function($scope, $http, $routeParams){
  promise = $http.get("games/" + $routeParams.gameId + ".json")
  promise.success(function(data) {
    _.extend($scope, data)
  });
  promise.error(function(){
    debugger;
  });
});
