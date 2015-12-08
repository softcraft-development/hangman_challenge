#= require angular-mocks
#= require jasmine-jquery

// https://code.angularjs.org/1.4.7/docs/guide/unit-testing
beforeEach(module('hangman'));


beforeEach(function() {
  jasmine.addMatchers({
    toBeBlank: function(util, customEqualityTesters){
      return {
        compare: function(actual) {
          // This lets us also check the contents of a jQuery object
          if (actual.html) {
            actual = actual.html();
          }
          
          var result = {};
          if (actual) {
            if (typeof(actual) == "string") {
              result.pass = actual.trim().length == 0;
            }
            else {
              result.pass = false;
            }
          }
          else {
            // false, null, undefined, 0, etc
            result.pass = true;
          }
          if (result.pass) {
            result.message = "Expected '" + actual + "' to not be blank";
          }
          else {
            result.message = "Expected '" + actual + "' to be blank";
          }
          return result;
        }
      }
    }
  });
});