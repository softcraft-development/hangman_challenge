describe("controllers", function(){
  describe("GameController", function(){
    var $scope, $httpBackend, controller;
    var response;
    
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      response = {
        id: 1,
        positions: ["A", null, " ", "C"],
        misses: 2,
        guesses: ["A", "C", "D", "E"]
      };
      
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('games/1.json').respond(response);

      $scope = $rootScope.$new();
      controller = $controller('GameController', {$scope: $scope});
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