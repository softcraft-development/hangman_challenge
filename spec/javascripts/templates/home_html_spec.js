describe("templates", function(){
  describe("home.html", function(){
    var template, $rootScope, $scope, $compile, view, newGame;
    var render = function(){
      $compile(view)($scope);
      $rootScope.$digest();
    }

    beforeEach(inject(["$templateCache", "$compile", "$rootScope", function($templateCache, _$compile_, _$rootScope_) {  
      template = $templateCache.get("home.html");
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      view = angular.element(template);
      newGame = jasmine.createSpy("newGame");
      $scope.$root.newGame = newGame;
    }]));
    
    beforeEach(function(){
      $scope.openGames = [
        {id: 3},
        {id: 5},
      ];
      render();
    });

    it("adds a link for each open game", function(){
      _.each($scope.openGames, function(game){
        expect(view).toContainElement("a[href='#/game/" + game.id + "']")
      });
    });
    
    describe("when the new game button in the title is clicked", function(){
      beforeEach(function(){
        view.find(".title button.new-game").click();
      });
      
      it("triggers a new game", function(){
        expect(newGame).toHaveBeenCalled();
      });
    });

    describe("when the new game link in the game section is clicked", function(){
      beforeEach(function(){
        view.find(".games-section a.new-game").click();
      });
      
      it("triggers a new game", function(){
        expect(newGame).toHaveBeenCalled();
      });
    });
  });
});