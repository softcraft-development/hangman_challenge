Hangman.Controllers.controller("GameController", function($scope, $http){
  promise = $http.get('games/1.json')
  promise.success(function(data) {
    _.extend($scope, data)
  });
  promise.error(function(){
    debugger;
  });
});
