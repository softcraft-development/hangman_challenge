Hangman.Controllers.controller("Home", function($scope, $http, $window, currentGame){
  currentGame.reset();
  promise = $http.get('games.json')
  promise.success(function(data) {
    $scope.openGames = data
  });
  promise.error(function(){
    debugger;
  });
  
  $scope.newGame = function(letter){
    promise = $http.post("games.json")
    promise.success(function(data) {
      currentGame.setGameData(data);
      $window.location.hash = "/game/" + data.id;
    });
    promise.error(function(){
      debugger;
    });
  };
});
