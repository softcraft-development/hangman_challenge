describe("templates", function(){
  describe("home.html", function(){
    var template, $rootScope, $scope, $compile, view;

    beforeEach(inject(function($templateCache, _$compile_, _$rootScope_) {  
      template = $templateCache.get("home.html");
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      view = angular.element(template);
    }));
    
    beforeEach(function(){
      $scope.openGames = [
        {id: 3},
        {id: 5},
      ];
      $compile(view)($scope);
      $rootScope.$digest();
    });

    it("adds a link for each open game", function(){
      _.each($scope.openGames, function(game){
        expect(view).toContainElement("a[href='#/games/" + game.id + "']")
      });
    });
  });
});