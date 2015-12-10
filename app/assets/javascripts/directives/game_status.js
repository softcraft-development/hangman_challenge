Hangman.Directives.directive('gameStatus', function() {
  return {
    link: function(scope, element, attrs) {
        
      var update = function(status){
        element.removeClass("bg-success").removeClass("bg-danger")
        switch(status) {
        case "win":
          element.addClass("bg-success").html("Congratulations! You've won!");
          element.fadeIn();
          break;
        case "loss":
          element.addClass("bg-danger").html("Sorry! You've lost!");
          element.fadeIn();
          break;
        default:
          element.empty();
          element.hide();
        }
      };
      
      scope.$watch("status", function(status){
        update(scope.status);
      });
      
      update(scope.status);
    }
  }
});