describe("PlaylistController", function() {
  var scope;
  var controller;
  var httpBackend;
  var scURL = /https:\/\/api.soundcloud.com\/tracks\.json\?.*/;

  // Initialization of the AngularJS application before each test case.
  beforeEach(module("SCPPlaylist"));

  // Injection of dependencies, $http will be mocked with $httpBackend.
  beforeEach(inject(function($rootScope, $controller, $httpBackend) {
    scope = $rootScope;
    controller = $controller;
    httpBackend = $httpBackend;
    // Create Player mock, only needs stopAudio function, used by startLoad.
    scope.scpPlayer = {stopAudio: function() {}}
  }));

  it("should query SoundCloud", function() {
    var testTitle = "title";

    // Mock SoundCloud URL.
    httpBackend.expectGET(scURL).respond(
      '[{"title": "' + testTitle + '", "downloadable":true}]');

    // Start the controller, check tracks.
    ctrl = controller("PlaylistController", {"$scope": scope});
    expect(ctrl.tracks).toBeNull();
    
    // Set search variable and initiate a search.
    scope.scpQ = "buskers";
    ctrl.searchTracks();

    httpBackend.flush();  // respond to the HTTP request
    scope.$apply();  // resolve promisses

    // Check if search results where used and paused was added.
    expect(ctrl.tracks.length).toEqual(1);
    expect(ctrl.tracks[0].title).toEqual(testTitle);
    expect(ctrl.tracks[0].paused).toBeTruthy();
  });

  it("should clear tracks before searching", function() {
    // Mock SoundCloud URL.
    httpBackend.expectGET(scURL).respond('[]');  // no results needed

    // Start the controller, set tracks to something.
    ctrl = controller("PlaylistController", {"$scope": scope});
    ctrl.tracks = [{}];
    
    // Set search variable and initiate a search.
    scope.scpQ = "buskers";
    ctrl.searchTracks();

    // Tracks should now be reset, while the "search" goes on (a call to
    // scope.$apply() would be needed to resolve promisses and populate
    // tracks again).
    expect(ctrl.tracks).toBeNull();
  });
});
