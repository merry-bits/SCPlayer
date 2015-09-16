;(function(angular, config) {
  /**
   * @module SCPPlaylist
   */

  var soundCloudTracksURL = "https://api.soundcloud.com/tracks.json";

  /**
   * Searches and displays SoundCloud tracks.
   * 
   * Provides the {@link searchTracks()} function which contacts the SoundCloud
   * [API]{@link https://developers.soundcloud.com/docs/api/reference#tracks}
   * and saves the result in tracks.
   * 
   * The client id for the SoundCloud API is expected to be stored in a global
   * soundCloudPlayerConfig.clienId variable.
   *
   * To stop all audio before starting a new search the controller looks for
   * scpPlayer in the scope and calls stopAudio() on it.
   *
   * The track list itself should use the same variable to play/pause the given
   * track.
   * 
   * @class PlaylistController
   * @memberOf SCPPlaylist
   *
   * @param $scope to access the scpPlayer controller
   * @param $http used to call the SoundCloud API
   */
  var PlaylistController = angular.module('SCPPlaylist', ['SCPPlayer'])
  .controller(
    'PlaylistController', ["$scope", "$http", function($scope, $http) {
    var self = this;

    /** 
     * The search term.
     */
    $scope.scpQ = "";

    /** 
     * The search results from the SoundCloud API.
     *
     * List of objects, containing, for example title, user.username, duration.
     * The controller adds a paused boolean to indicate whenever a track is
     * being played or not. Note: it is the player that has to set this to true
     * again when the track ended by itself.
     *
     * @member tracks
     * @memberOf SCPPlaylist.PlaylistController#
     */
    self.tracks = null;  // null signals no search results, yet

    // Called before a new search, stop audio, remove results.
    function startLoad() {
      self.tracks = null;
      $scope.scpPlayer.stopAudio();
    }
    
    /**
     * The search function.
     *
     * Calls the SoundCloud API and on success populates
     * {@link SCPPlaylist.PlaylistController#tracks}.
     *
     * @function searchTracks
     * @memberOf SCPPlaylist.PlaylistController#
     */
    self.searchTracks = function(term) {
      startLoad();
      var conf = {params: {client_id: config.clientId, q: term, limit: 50}};
      $http.get(soundCloudTracksURL, conf).success(function (data) {
        // Keep only downloadable tracks and add paused field.
        var tracks = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].downloadable) {
            data[i].paused = true;
            tracks.push(data[i]);
          }
        }
        self.tracks = tracks;
      });
    };
  }]);
})(window.angular, window.soundCloudPlayerConfig);
