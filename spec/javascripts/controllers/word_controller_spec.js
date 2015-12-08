describe("wordController", function(){
  describe('$scope.positions', function() {
    it('has 6 positions', function() {
      var $scope = {};
      var controller = $controller('wordController', { $scope: $scope });
      
      expect($scope.positions.length).toEqual(6);
    });
  });
});