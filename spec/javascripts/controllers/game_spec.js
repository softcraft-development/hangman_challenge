describe("controllers", function(){
  describe("Game", function(){
    var $scope, $rootScope, $httpBackend, $controller, controller, gameState, currentGame, letter, $http;
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    var activate = function(){
      $scope = $rootScope.$new();
      $routeParams = {
        gameId: gameState.id
      };
      controller = $controller('Game', {$scope: $scope, $routeParams: $routeParams});
    };
    
    function sharedTests(){
      it("sets the positions", function(){
        expect($scope.positions).toEqual(gameState.positions)
      });

      it("sets the misses", function(){
        expect($scope.misses).toEqual(gameState.misses)
      });

      it("sets the guesses", function(){
        expect($scope.guesses).toEqual(gameState.guesses)
      });
      
      it("sets the status", function(){
        expect($scope.status).toEqual(gameState.status)
      });
    
      describe("when the misses change", function(){
        var updateSpy, newMisses;
        beforeEach(function(){
          updateSpy = jasmine.createSpy("update");
          $scope.$on("update", updateSpy);
          newMisses = gameState.misses + 1;
          $scope.misses = newMisses;
          $scope.$apply()
        });
        
        it("triggers update with the new misses", function(){
          expect(updateSpy).toHaveBeenCalledWith(jasmine.any(Object), newMisses);
        });
      });
    }
    
    beforeEach(inject(["$httpBackend", "$rootScope", "$controller", "currentGame", "$http", function(_$httpBackend_, _$rootScope_, _$controller_, _currentGame_, _$http_) {
      gameState = {
        id: Math.floor(Math.random() * 100),
        positions: ["A", null, " ", "C"],
        misses: Math.floor(Math.random() * 100),
        guesses: ["A", "C", "D", "E"],
        status: null
      };
      
      currentGame = _currentGame_;
      $httpBackend = _$httpBackend_;
      $http = _$http_;
      $rootScope = _$rootScope_;
      $controller = _$controller_;
    }]));
    
    describe("when there is a current game", function(){
      beforeEach(function(){
        spyOn($http, "get").and.callThrough();
        currentGame.setGameData(gameState);
        activate();
      });
      
      it("does not make an http request", function(){
        expect($http.get).not.toHaveBeenCalled();
      });
      
      sharedTests();
    });

    describe("when there is no current game", function(){
      beforeEach(function(){
        $httpBackend.expectGET("games/" + gameState.id + ".json").respond(gameState);
        activate();
        $httpBackend.flush();
      });
      
      sharedTests();
    });
    
    var chooseLetter = function(){
      return letters.charAt(Math.floor(Math.random() * letters.length));
    };
    
    describe("when the game is undecided", function(){
      beforeEach(function(){
        gameState.status = null;
        currentGame.setGameData(gameState);
        activate();
      });
      
      describe("and a guess is made", function(){
        var newGameState;

        beforeEach(function(){
          letter = chooseLetter();
          newGameState = {
            id: gameState.id,
            positions: ["X", null, " ", "Y"],
            misses: Math.floor(Math.random() * 100),
            guesses: ["S", "T", "L", "R"],
            status: null,
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
    
    function testLockedGame(status) {
      beforeEach(inject(["$http", function(_$http_){
        spyOn($http, "put").and.callThrough();
        gameState.status = status;
        currentGame.setGameData(gameState);
        activate();
      }]));
      
      describe("and a guess is made", function(){
        beforeEach(function(){
          letter = chooseLetter();
          $scope.makeGuess(letter);
        });
        
        it("does not make an http request", function(){
          expect($http.put).not.toHaveBeenCalled();
        });
      });
    }
    
    describe("when the game is won", function(){
      testLockedGame("win");
    });
    
    describe("when the game is lost", function(){
      testLockedGame("loss");
    });
  });
});