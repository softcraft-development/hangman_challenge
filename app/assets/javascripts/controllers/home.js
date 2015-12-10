Hangman.Controllers.controller("Home", ["$scope", "$http", "$window", "currentGame", function($scope, $http, $window, currentGame){
  currentGame.reset();
  promise = $http.get('games.json')
  promise.success(function(data) {
    $scope.openGames = data
  });
  promise.error(function(){
    console.log("An error occurred getting the games list.");
  });
  
  $scope.$root.newGame = function(letter){
    promise = $http.post("games.json")
    promise.success(function(data) {
      currentGame.setGameData(data);
      $window.location.hash = "/game/" + data.id;
    });
    promise.error(function(){
      console.log("An error occurred creating a new game.");
    });
  };
}]);
