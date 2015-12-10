Hangman.Services.factory("currentGame", function(){
  var current = null;
  
  return {
    setGameData: function(data)
    {
      current = data;
    },
  
    getGameData: function() {
      return current;
    },
  
    reset: function() {
      current = null;
    },
  
    exists: function(){
      return current != null;
    }
  };
});