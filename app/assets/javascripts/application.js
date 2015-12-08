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
//= require angular-route  
//= require namespace
//= require_tree ./templates
//= require_tree ./directives  
//= require_tree ./controllers
//= require_tree .

Hangman.App = angular.module('hangman', ["ngRoute", "templates", "Directives", "Controllers"]);
Hangman.App.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
      templateUrl: 'game.html',
      controller: 'GameController'
    });
}]);