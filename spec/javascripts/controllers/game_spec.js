describe("controllers", function(){
  describe("Game", function(){
    var $scope, $httpBackend, controller;
    var gameState;
    
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      gameState = {
        id: Math.floor(Math.random() * 100),
        positions: ["A", null, " ", "C"],
        misses: Math.floor(Math.random() * 100),
        guesses: ["A", "C", "D", "E"]
      };
      
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET("games/" + gameState.id + ".json").respond(gameState);

      $scope = $rootScope.$new();
      $routeParams = {
        gameId: gameState.id
      };
      controller = $controller('Game', {$scope: $scope, $routeParams: $routeParams});
      $httpBackend.flush();
    }));
    
    it("sets the positions", function(){
      expect($scope.positions).toEqual(gameState.positions)
    });

    it("sets the misses", function(){
      expect($scope.misses).toEqual(gameState.misses)
    });

    it("sets the guesses", function(){
      expect($scope.guesses).toEqual(gameState.guesses)
    });
    
    describe("when a guess is made", function(){
      var letter, newGameState;
      
      beforeEach(function(){
        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        letter = letters.charAt(Math.floor(Math.random() * letters.length))
        
        newGameState = {
          id: gameState.id,
          positions: ["X", null, " ", "Y"],
          misses: Math.floor(Math.random() * 100),
          guesses: ["S", "T", "L", "R"]
        };
        
        $httpBackend.expectPUT("games/" + gameState.id + "/guesses/" + letter + ".json").respond({
          game: newGameState
        });
        $scope.makeGuess(letter);
        $httpBackend.flush();
      });
    
      it("sets the new game state", function(){
        _.each(newGameState, function(value, key){
          expect($scope[key]).toEqual(value)
        });
      });
    });
  });
});