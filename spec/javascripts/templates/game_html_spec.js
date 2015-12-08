describe("templates", function(){
  describe("game.html", function(){
    var template, $rootScope, $scope, $compile, view;

    function render() {
      $compile(view)($scope);
      $rootScope.$digest();
    }

    beforeEach(inject(function($templateCache, _$compile_, _$rootScope_) {  
      template = $templateCache.get("game.html");
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      view = angular.element(template);
    }));
    
    describe("when letters are guessed", function(){
      beforeEach(function(){
        $scope.guesses = ["Q", "Z", "X"];
        render();
      });
      
      it("assigns the guessed css class to the button for each guess", function(){
        _.each($scope.guesses, function(letter) {
          var button = view.find(".letters .letter button[value='" + letter + "']");
          expect(button).toHaveClass("guessed");
        });
      });
      
      it("does not assign the guessed css class to the button for any ungessed letter", function(){
        _.each(view.find(".letters .letter button"), function(button){
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
        
        makeGuess = jasmine.createSpy("makeGuess")
        $scope.makeGuess = makeGuess
        buttons = view.find(".letters .letter button")
        button = $(_.sample(buttons))
        letter = button.attr("value")
        button.click();
      });
      
      it("makes a guess for that letter", function(){
        expect(makeGuess).toHaveBeenCalledWith(letter)
      });
    });
  });
});