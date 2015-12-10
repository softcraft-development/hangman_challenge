describe("directives", function(){
  var originalFrames;
  beforeEach(function(){
    originalFrames = Hangman.Display.frames;
  });
  
  describe("hangmanDisplay", function(){
    var $rootScope, $scope, $compile, view, render;

    beforeEach(inject(function(_$compile_, _$rootScope_) {  
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      view = angular.element("<canvas hangman-display height='400' width='300'></canvas>");
    }));
    
    render = function(){
      $compile(view)($scope);
      $rootScope.$digest();
    };
    
    describe("when update is fired for 2 frames", function(){
      var resetCalls = function(){
        _.each(Hangman.Display.frames, function(frame){
          frame.draw.calls.reset();
        });
      };
      
      beforeEach(function(){
        Hangman.Display.frames = [
          jasmine.createSpyObj(["draw"]),
          jasmine.createSpyObj(["draw"]),
          jasmine.createSpyObj(["draw"])
        ]
        
        render();
        
        $scope.$emit("update", 1);
      });
      
      it("draws the first frame", function(){
        expect(Hangman.Display.frames[0].draw).toHaveBeenCalledWith(jasmine.any(CanvasRenderingContext2D));
      });

      it("draws the second frame", function(){
        expect(Hangman.Display.frames[1].draw).toHaveBeenCalledWith(jasmine.any(CanvasRenderingContext2D));
      });

      it("does not draw the third frame", function(){
        expect(Hangman.Display.frames[2].draw).not.toHaveBeenCalled();
      });
      
      describe("and then fired for 3 frames", function(){
        beforeEach(function(){
          resetCalls();
          
          $scope.$emit("update", 2);
        });
      
        it("does not draw the first frame", function(){
         expect(Hangman.Display.frames[0].draw).not.toHaveBeenCalled();
        });

        it("does not draw the first frame", function(){
          expect(Hangman.Display.frames[1].draw).not.toHaveBeenCalled();
        });

        it("draws the second frame", function(){
          expect(Hangman.Display.frames[2].draw).toHaveBeenCalledWith(jasmine.any(CanvasRenderingContext2D));
        });
      });
      
      describe("and the directive is rerendered", function(){
        beforeEach(function(){
          resetCalls();
          render();
        });
        
        describe("and the update is fired for 3 frames", function(){
          beforeEach(function(){
            $scope.$emit("update", 2);
          });
          
          it("draws the first frame", function(){
            expect(Hangman.Display.frames[0].draw).toHaveBeenCalledWith(jasmine.any(CanvasRenderingContext2D));
          });

          it("draws the second frame", function(){
            expect(Hangman.Display.frames[1].draw).toHaveBeenCalledWith(jasmine.any(CanvasRenderingContext2D));
          });

          it("draws the third frame", function(){
            expect(Hangman.Display.frames[2].draw).toHaveBeenCalledWith(jasmine.any(CanvasRenderingContext2D));
          });
        });
      });
    });
  });
  
  afterEach(function(){
    Hangman.Display.frames = frames;
  });
});

describe("frames", function() {
  
  // Effectively testing the actual drawing is difficult, to say the least.
  // You'd either want to check specific pixels for color values,
  // or stub out specific calls (effectively duplicating the drawing).
  // While worth investigating in a critical application, it's more than
  // I want to invest for a game of Hangman.
  // It's sufficient to check that the frames draw without generating exceptions,
  // and then manually & visually inspect the results.
  function testDrawing(frame){
    var canvas = $("<canvas></canvas>")[0]
    var context = canvas.getContext("2d");
    expect(function(){
      frame.draw(context);
    }).not.toThrow();
  };
  
  describe("Gallows", function(){
    var frame;
    beforeEach(function(){
      frame = new Hangman.Display.Frames.Gallows();
    });
    
    it("draws successfully", function(){
      testDrawing(frame);
    });
  });
  
  describe("Head", function(){
    var frame;
    beforeEach(function(){
      frame = new Hangman.Display.Frames.Head();
    });
    
    it("draws successfully", function(){
      testDrawing(frame);
    });
  });
  
  describe("Body", function(){
    var frame;
    beforeEach(function(){
      frame = new Hangman.Display.Frames.Body();
    });
    
    it("draws successfully", function(){
      testDrawing(frame);
    });
  });
  
  describe("Limb", function(){
    var frame;
    beforeEach(function(){
      frame = new Hangman.Display.Frames.Limb(0, 0, 10, 10, 0, true);
    });
    
    it("draws successfully", function(){
      testDrawing(frame);
    });
  });
});