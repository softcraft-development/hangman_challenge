// inspired by http://thecache.trov.com/unit-testing-angular-views-to-avoid-the-integration-test-scam/

describe("directives", function(){
  describe("position", function(){
    var $rootScope, $scope, $compile, view, container, render;

    beforeEach(inject(function(_$compile_, _$rootScope_) {  
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      container = angular.element("<position />");
    }));
    
    render = function(){
      $compile(container)($scope);
      $rootScope.$digest();
      view = container.find("span");
    };
    
    describe("when the position is null", function(){
      beforeEach(function(){
        $scope.position = null;
        render();
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
        render();
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
        render();
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