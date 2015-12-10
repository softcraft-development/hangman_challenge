describe("templates", function(){
  describe("game.html", function(){
    var template, $rootScope, $scope, $compile, view, newGame;

    var render = function() {
      $compile(view)($scope);
      $rootScope.$digest();
    }

    var findPositionDisplay = function(){
      return view.find(".word .position").first();
    };
    
    beforeEach(inject(function($templateCache, _$compile_, _$rootScope_) {  
      template = $templateCache.get("game.html");
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      newGame = jasmine.createSpy("newGame");
      $scope.$root.newGame = newGame;
      view = angular.element(template);
    }));
    
    it("displays the game id", function(){
      gameId = "An arbitrary value";
      $scope.id = gameId;
      render()
      expect(view.find("h1")).toContainText("Game #" + gameId);
    });
    
    describe("when the new game link in the game section is clicked", function(){
      beforeEach(function(){
        render();
        view.find(".controls a.new-game").click();
      });
      
      it("triggers a new game", function(){
        expect(newGame).toHaveBeenCalled();
      });
    });
    
    describe("when the position is null", function(){
      beforeEach(function(){
        $scope.positions = [null];
        render();
      });

      it("sets the position display to empty", function(){
        expect(findPositionDisplay()).toBeBlank();
      });
      
      it("adds the blank css class to the position display", function(){
        expect(findPositionDisplay()).toHaveClass("blank");
      });
      
      it("does not add the space css class", function(){
        expect(findPositionDisplay()).not.toHaveClass("space");
      });
    });

    describe("when the position is non null", function(){
      beforeEach(function(){
        $scope.positions = ["A Test Value"];
        render();
      });

      it("sets the contents of the position display to the position value", function(){
        expect(findPositionDisplay()).toHaveText($scope.positions[0]);
      });
      
      it("does not add the blank css class", function(){
        expect(findPositionDisplay()).not.toHaveClass("blank");
      });
      
      it("does not add the space css class", function(){
        expect(findPositionDisplay()).not.toHaveClass("space");
      });
    });
    
    describe("when the position is a space", function(){
      beforeEach(function(){
        $scope.positions = [" "];
        render();
      });

      it("sets the contents to blank", function(){
        expect(findPositionDisplay()).toBeBlank()
      });
      
      it("does not add the blank css class", function(){
        expect(findPositionDisplay()).not.toHaveClass("blank");
      });
      
      it("does adds the space css class", function(){
        expect(findPositionDisplay()).toHaveClass("space");
      });
    });
    
    describe("when letters are guessed", function(){
      beforeEach(function(){
        $scope.guesses = ["Q", "Z", "X"];
        render();
      });
      
      it("assigns the guessed css class to the button for each guess", function(){
        _.each($scope.guesses, function(letter) {
          var button = view.find(".letters button[value='" + letter + "']");
          expect(button).toHaveClass("guessed");
        });
      });
      
      it("does not assign the guessed css class to the button for any ungessed letter", function(){
        _.each(view.find(".letters button"), function(button){
          button = $(button)
          letter = button.attr("value")
          if ($scope.guesses.indexOf(letter) < 0 ){
            expect(button).not.toHaveClass("guessed");
          }
        });
      });
    });
    
    describe("when a guess button is clicked", function(){
      var makeGuess, letter;
      
      beforeEach(function(){
        render();
        
        makeGuess = jasmine.createSpy("makeGuess");
        $scope.makeGuess = makeGuess;
        buttons = view.find(".letters button");
        button = $(_.sample(buttons));
        letter = button.attr("value");
        button.click();
      });
      
      it("makes a guess for that letter", function(){
        expect(makeGuess).toHaveBeenCalledWith(letter);
      });
    });
  });
});