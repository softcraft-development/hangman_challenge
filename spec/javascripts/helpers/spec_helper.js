#= require angular-mocks

// https://code.angularjs.org/1.4.7/docs/guide/unit-testing
beforeEach(module('hangman'));

beforeEach(inject(function(_$controller_){
  $controller = _$controller_;
}));