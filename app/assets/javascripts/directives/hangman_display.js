Hangman.Display = {}
Hangman.Display.Frames = {}

Hangman.Display.Frames.ShadowColor = "rgba(0,0,0,0.4)";
Hangman.Display.Frames.NoColor = "rgba(0,0,0,0)";
Hangman.Display.Frames.SkinColor = "rgb(228, 171, 147)"
Hangman.Display.Frames.SkinHighlightColor = "rgb(238, 203, 188)"

Hangman.Display.Frames.shadow = function(context, path) {
  // destination-over compositing draws the shadow on top 
  // of the path, which isn't what we want. Instead,
  // draw the shape, then draw the shadow underneath it
  // by re-drawing the path.
  context.save();
  context.shadowColor = Hangman.Display.Frames.NoColor;
  path();
  
  context.shadowColor = Hangman.Display.Frames.ShadowColor;
  context.globalCompositeOperation = "destination-over";
  path();
  context.restore();
}

Hangman.Display.Frames.Gallows = function(){
};
Hangman.Display.Frames.Gallows.prototype.draw = function(context) {
  context.strokeStyle = "rgb(137, 64, 34)";
  context.lineCap = "square";
  
  var x = 24, y = 72;
  context.beginPath();
  context.lineWidth = 12;
  context.moveTo(x, y);
  context.lineTo(x + 192, y);
  context.stroke();
  
  x = 60; 
  y = 36;
  context.beginPath();
  context.lineWidth = 18;
  context.moveTo(x, y);
  context.lineTo(x, y + 324);
  context.stroke();

  x = 156;
  y = 60;
  context.strokeStyle = "rgb(208, 178, 65)";
  context.lineCap = "round";
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x, y + 72);
  context.stroke();
};

Hangman.Display.Frames.Head = function(){};
Hangman.Display.Frames.Head.prototype.draw = function(context) {
  context.beginPath();
  var x = 132, y = 132, radius = 24;
  context.arc(x, y, radius, 0, 2 * Math.PI);
  gradient = context.createRadialGradient(x - (radius / 3), y - (radius / 6), (radius / 4), x, y, radius);
  gradient.addColorStop(0.1, Hangman.Display.Frames.SkinHighlightColor);
  gradient.addColorStop(1, Hangman.Display.Frames.SkinColor);
  context.fillStyle = gradient;
  context.fill();
};

Hangman.Display.Frames.Body = function(){};
Hangman.Display.Frames.Body.prototype.draw = function(context) {
  context.globalCompositeOperation = "destination-over";
    
  var x = 150, y = 198, shortRadius = 18; longRadius = 66;

  gradient = context.createRadialGradient(x - (shortRadius / 2), y - (longRadius / 6), longRadius / 8, x, y, longRadius);
  gradient.addColorStop(0.1, Hangman.Display.Frames.SkinHighlightColor);
  gradient.addColorStop(1, Hangman.Display.Frames.SkinColor);
  context.fillStyle = gradient;

  Hangman.Display.Frames.shadow(context, function(){
    // Ellipse doesn't work in Firefox, so we have to draw it ourselves
    // context.ellipse(x, y, shortRadius, longRadius, 0, 0, 2 * Math.PI);
    var leftX = x - shortRadius;
    var rightX = x + shortRadius;
    var topY = y - longRadius;
    var bottomY = y + longRadius;
    
    context.beginPath();
    context.moveTo(x, topY);
    context.bezierCurveTo(leftX, topY, leftX, bottomY, x, bottomY);
    context.bezierCurveTo(rightX, bottomY, rightX, topY, x, topY);
    context.fill();
  });
};

Hangman.Display.Frames.Limb = function(jointX, jointY, width, length, curvature, hangsLeft){
  this.jointX = jointX;
  this.jointY = jointY;
  this.length = length;
  this.width = width;
  this.curvature = curvature;
  var direction = hangsLeft ? -1 : 1;
  this.endX = this.jointX + (this.width * direction);
  this.endY = this.jointY + this.length;
};

Hangman.Display.Frames.Limb.prototype.draw = function(context) {
  context.globalCompositeOperation = "destination-over";

  context.strokeStyle = Hangman.Display.Frames.SkinColor;
  context.lineCap = "round";

  var control1Y = this.jointY + (this.length * this.curvature);
  var control2Y = this.endY - (this.length / 3);

  context.lineWidth = 18;
  var _this = this;
  Hangman.Display.Frames.shadow(context, function(){
    context.beginPath();
    context.moveTo(_this.jointX, _this.jointY);
    context.bezierCurveTo(_this.endX, control1Y, _this.endX, control2Y, _this.endX, _this.endY );
    context.stroke();
  });
};

Hangman.Display.frames = [
  new Hangman.Display.Frames.Gallows(),
  new Hangman.Display.Frames.Head(),
  new Hangman.Display.Frames.Body(),
  new Hangman.Display.Frames.Limb(144, 168, 24, 60, 0, true),
  new Hangman.Display.Frames.Limb(156, 162, 24, 60, 0, false),
  new Hangman.Display.Frames.Limb(140, 252, 10, 90, 0.33, true),
  new Hangman.Display.Frames.Limb(162, 252, 10, 90, 0.33, false),
];

Hangman.Directives.directive('hangmanDisplay', function() {
  
  var lastFrameDrawn = -1;
  
  function update(canvas, targetFrame){
    var context = canvas.getContext("2d");
    var targetFrame = Math.min(targetFrame, Hangman.Display.frames.length - 1);
  
    if (lastFrameDrawn > targetFrame) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      lastFrameDrawn = -1;
    }
  
    context.shadowColor = Hangman.Display.Frames.ShadowColor;
    context.shadowBlur = 12;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 4;

    for(var index = lastFrameDrawn + 1; index <= targetFrame; index++) {
      context.save();
      Hangman.Display.frames[index].draw(context);
      context.restore();
      lastFrameDrawn = index;
    }
  };
  
  return {
    link: function(scope, element, attrs) {
      var canvas = element[0];
      
      scope.$on("update", function(event, frame){
        update(canvas, frame);
      });
    }
  };
});
