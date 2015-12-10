describe("application", function(){
  var $route;
  beforeEach(inject(function(_$route_) {
    $route = _$route_;
  }));

  it('should map /game/:gameId to games', function() {
    expect($route.routes["/game/:gameId"].controller).toBe('Game');
  });
  
  it('should map everything else to home', function() {
    expect($route.routes[null].controller).toBe('Home');
  });
});