describe("services", function(){
  describe("currentGame", function(){
    var currentGame;
    beforeEach(inject(function($injector) {
      currentGame = $injector.get('currentGame');
    }));
    
    describe("setGameData", function(){
      var value;
      beforeEach(function(){
        value = "A test value";
        currentGame.setGameData(value)
      });
      
      it("sets the game data", function(){
        expect(currentGame.getGameData()).toBe(value);
      });
    });
    
    describe("getGameData", function(){
      it("is null", function(){
        expect(currentGame.getGameData()).toBeNull();
      });
      
      describe("when the game data is previously set", function(){
        // Note that this is effectively the same test as for setGameData.
        // This is redundant, but I'm including it here anyway for
        // consistency. The important part is to have a test
        // for each method. 
        
        var value;
        beforeEach(function(){
          value = "A test value";
          currentGame.setGameData(value)
        });

        it("gets the set value", function(){
          expect(currentGame.getGameData()).toBe(value);
        });
      });
    });
    
    describe("reset", function(){
      describe("when the game data is previously set", function(){
        var value;
        beforeEach(function(){
          value = "A test value";
          currentGame.setGameData(value)
          currentGame.reset();
        });

        it("sets the game data to null", function(){
          expect(currentGame.getGameData()).toBeNull;
        });
      });
    });
    
    describe("exists", function(){
      it("is false", function(){
        expect(currentGame.exists()).toBe(false);
      });
      
      describe("when the game data is previously set", function(){
        var value;
        beforeEach(function(){
          value = "A test value";
          currentGame.setGameData(value)
        });

        it("is true", function(){
          expect(currentGame.exists()).toBe(true);
        });
      });
    });
  });
});