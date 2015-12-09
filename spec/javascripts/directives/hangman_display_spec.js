
describe("frames", function() {
  
  // Effectively testing the actual drawing is difficult, to say the least.
  // You'd either want to check specific pixels for color values,
  // or stub out specific calls (effectively duplicating the drawing).
  // While worth investigating in a critical application, it's more than
  // I want to invest for a game of Hangman.
  // It's sufficient to check that the frames draw without generating exceptions,
  // and then manually & visually inspec the results.
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