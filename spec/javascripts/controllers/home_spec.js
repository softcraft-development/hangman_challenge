describe("controllers", function(){
  describe("Home", function(){
    var $scope, $httpBackend, controller, gamesList, currentGame, $rootScope, $window;
    
    beforeEach(inject(["$httpBackend", "$rootScope", "$controller", "currentGame", "$window", function(_$httpBackend_, _$rootScope_, $controller, _currentGame_, _$window_) {
      currentGame = _currentGame_;
      spyOn(currentGame, "reset");
      
      gamesList = [
        {id: 3},
        {id: 5}
      ]
      
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      $window = _$window_;
      $httpBackend.expectGET('games.json').respond(gamesList);

      $scope = $rootScope.$new();
      controller = $controller('Home', {$scope: $scope});
      $httpBackend.flush();
    }]));
    
    it("sets the open games", function(){
      expect($scope.openGames).toEqual(gamesList)
    });
    
    it("resets the current game", function(){
      expect(currentGame.reset).toHaveBeenCalled();
    });
    
    describe("newGame", function(){
      var newGame, letter;
      
      beforeEach(function(){
        letter = "Q";
        newGame = {
          id: Math.floor(Math.random() * 100),
          someOtherGameData: "yes"
        };
        
        $httpBackend.expectPOST('games.json').respond(newGame);
        $rootScope.newGame(letter);
        $httpBackend.flush();
      });
      
      it("sets the current game data", function(){
        expect(currentGame.getGameData()).toEqual(newGame);
      });
      
      it("sets the window location hash to be the game path", function(){
        expect($window.location.hash).toBe("/game/" + newGame.id);
      });
    });
  });
});