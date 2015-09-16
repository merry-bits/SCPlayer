describe("PlayController", function() {
  var scope;
  var controller;
  var httpBackend;

  // Initialization of the AngularJS application before each test case.
  beforeEach(module("SCPPlaylist"));

  // Injection of dependencies.
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope;
    controller = $controller;
  }));

  it("should set track.paused to false only while playing", function() {
    // Create the controller and mock the audio functions.
    ctrl = controller(
      "PlayController",
      {"$scope": scope, "$element": $("<div><audio/></div>")});
    ctrl.audio.load = function() {};
    ctrl.audio.play = function() {};
    ctrl.audio.pause = function() {};
    expect(ctrl.currentTrack).toBeNull();

    // Play something.
    var track1 = {download_url: ""};
    ctrl.playOrPause(track1);

    // Check for paused.
    expect(track1.paused).toBeFalsy();

    // Now play second track, whish should pause first one.
    var track2 = {download_url: ""};
    ctrl.playOrPause(track2);

    // Check that track1 is paused.
    expect(track1.paused).toBeTruthy();

    // Pause playing of track2.
    ctrl.playOrPause(track2);

    // Check that track2 is paused, too.
    expect(track1.paused).toBeTruthy();    
  });
});
