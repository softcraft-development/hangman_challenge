describe("templates", function(){
  describe("game.html", function(){
    var template, $rootScope, $scope, $compile, view;

    beforeEach(inject(function($templateCache, _$compile_, _$rootScope_) {  
      template = $templateCache.get("game.html");
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      view = angular.element(template);
    }));
    
    beforeEach(function(){
      $compile(view)($scope);
      $rootScope.$digest();
    });
    
    describe("when a guess button is clicked", function(){
      var makeGuess, letter;
      
      beforeEach(function(){
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