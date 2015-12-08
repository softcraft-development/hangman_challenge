// inspired by http://thecache.trov.com/unit-testing-angular-views-to-avoid-the-integration-test-scam/

describe("templates", function(){
  describe("position.html", function(){
    var template, $rootScope, $scope, $compile, view;

    beforeEach(inject(function($templateCache, _$compile_, _$rootScope_) {  
      template = $templateCache.get("position.html");
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      view = angular.element(template);
    }));
    
    describe("when the position is null", function(){
      beforeEach(function(){
        $scope.position = null;
        $compile(view)($scope);
        $rootScope.$digest();
      });

      it("sets the contents to empty", function(){
        expect(view).toBeBlank();
      });
      
      it("adds the blank css class", function(){
        expect(view).toHaveClass("blank");
      });
    });

    describe("when the position is non null", function(){
      beforeEach(function(){
        $scope.position = "A Test Value";
        $compile(view)($scope);
        $rootScope.$digest();
      });

      it("sets the contents to the position value", function(){
        expect(view).toHaveText($scope.position);
      });
      
      it("does not add the blank css class", function(){
        expect(view).not.toHaveClass("blank");
      });
    });
    
    describe("when the position is a space", function(){
      beforeEach(function(){
        $scope.position = " ";
        $compile(view)($scope);
        $rootScope.$digest();
      });

      it("sets the contents to blank", function(){
        expect(view).toBeBlank()
      });
      
      it("does not add the blank css class", function(){
        expect(view).not.toHaveClass("blank");
      });
      
      it("does not add the space css class", function(){
        expect(view).toHaveClass("space");
      });
    });
  });
});