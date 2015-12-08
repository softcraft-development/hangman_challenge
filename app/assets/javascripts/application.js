// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require underscore  
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require angular  
//= require angular-rails-templates
//= require_tree ./templates
//= require_tree .

Hangman = {};
Hangman.App = angular.module('hangman', ["templates"]);

Hangman.App.controller("GameController", function($scope, $http){
  $http.get('games/1.json').success(function(data) {
    _.extend($scope, data)
  });
});

Hangman.App.directive('position', function() {
  return {
    templateUrl: 'position.html'
  };
});