describe("directives", function(){
  describe("gameStatus", function(){
    var $rootScope, $scope, $compile, view, render;
    

    beforeEach(inject(["$compile", "$rootScope", function(_$compile_, _$rootScope_) {  
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      view = angular.element("<div game-status></div>");
    }]));
    
    render = function(){
      setFixtures(sandbox().append(view));
      $compile(view)($scope);
      $rootScope.$digest();
    };
    
    describe("when the status is win", function(){
      beforeEach(function(){
        $scope.status = "win"
        render();
      });
      
      it("shows the status display", function(){
        expect(view).toBeVisible()
      });

      it("displays a win message", function(){
        expect(view).toContainText("won");
      });

      it("adds the success css class", function(){
        expect(view).toHaveClass("bg-success");
      });
      
      it("does not have the failure css class", function(){
        expect(view).not.toHaveClass("bg-danger");
      });
    });
    
    describe("when the status is loss", function(){
      beforeEach(function(){
        $scope.status = "loss"
        render();
      });
      
      it("shows the status display", function(){
        expect(view).toBeVisible()
      });

      it("displays a loss message", function(){
        expect(view).toContainText("lost");
      });

      it("adds the failure css class", function(){
        expect(view).toHaveClass("bg-danger");
      });

      it("does not have the success css class", function(){
        expect(view).not.toHaveClass("bg-success");
      });
    });
    
    describe("when the status is anything else", function(){
      beforeEach(function(){
        // typically null
        $scope.status = null
        render();
      });
      
      it("hides the status display", function(){
        expect(view).not.toBeVisible()
      });

      it("empties the display", function(){
        expect(view).toBeBlank();
      });
      
      it("does not have the failure css class", function(){
        expect(view).not.toHaveClass("bg-danger");
      });
      
      it("does not have the failure css class", function(){
        expect(view).not.toHaveClass("bg-danger");
      });
    });
  });
});