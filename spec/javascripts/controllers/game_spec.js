describe("controllers", function(){
  describe("Game", function(){
    var $scope, $httpBackend, controller;
    var response;
    
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      response = {
        id: Math.floor(Math.random() * 100),
        positions: ["A", null, " ", "C"],
        misses: 2,
        guesses: ["A", "C", "D", "E"]
      };
      
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET("games/" + response.id + ".json").respond(response);

      $scope = $rootScope.$new();
      $routeParams = {
        gameId: response.id
      };
      controller = $controller('Game', {$scope: $scope, $routeParams: $routeParams});
      $httpBackend.flush();
    }));
    
    it("sets the positions", function(){
      expect($scope.positions).toEqual(response.positions)
    });

    it("sets the misses", function(){
      expect($scope.misses).toEqual(response.misses)
    });

    it("sets the guesses", function(){
      expect($scope.guesses).toEqual(response.guesses)
    });
  });
});