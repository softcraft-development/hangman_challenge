describe("controllers", function(){
  describe("Home", function(){
    var $scope, $httpBackend, controller;
    var response;
    
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      response = [
        {id: 3},
        {id: 5}
      ]
      
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('games.json').respond(response);

      $scope = $rootScope.$new();
      controller = $controller('Home', {$scope: $scope});
      $httpBackend.flush();
    }));
    
    it("sets the open games", function(){
      expect($scope.openGames).toEqual(response)
    });
  });
});