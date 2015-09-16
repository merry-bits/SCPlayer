;(function($, angular, config) {
  /**
   * @module SCPPlayer
   */

  /**
   * The Player uses an audio tag to play an URL.
   *
   * Using the function {@link SCPPlayer.PlayController#playOrPause} the given
   * track can be started, or, if playing, paused. The paused property of the
   * given track will be set to true whenever the song gets paused or finishes
   * playing.
   *
   * Calling {@link SCPPlayer.PlayController#stopAudio} will pause the current
   * track and stop the audio element from buffering more audio data as well.
   * Use this as a cleanup/close kind of function.
   *
   * @class PlayController
   * @memberOf SCPPlayer
   *
   * @param $element used to access the audio tag
   * @param $scope used to notify tracks about "pasued" changes
   */
  angular.module('SCPPlayer', [])
  .controller(
    'PlayController', ["$element", "$scope", function($element, $scope) {
    var self = this;

    /** 
     * The audio HTML tag, used to play a track.
     *
     * @member audio
     * @memberOf SCPPlayer.PlayController#
     */
    self.audio = $("audio:first", $element)[0];
    
    /** 
     * Current track object, used to manipulate its paused variable.
     *
     * @member currentTrack
     * @memberOf SCPPlayer.PlayController#
     */
    self.currentTrack = null;

    // Connect to the track-ended event of the audio tag in order to set the
    // paused property of the current track correctly.
    this.audio.onended = function() {
      if (self.currentTrack) {
        self.currentTrack.paused = true;
        $scope.$apply();  // tell Angular about the change
      }
    }

    /**
     * Play/resume a track or pause the current track.
     *
     * The paused variable on the track object can be used to check if the track
     * is beeing played or not.
     *
     * @function playOrPause
     * @memberOf SCPPlayer.PlayController#
     *
     * @param track object that should contain download_url
     */
    this.playOrPause = function(track) {
      if (self.currentTrack) {
        self.currentTrack.paused = true;
      }
      self.currentTrack = track;
      if (track) {
        var trackURL = track.download_url + "?client_id=" + config.clientId;
        if (trackURL != self.audio.src) {
          self.audio.src = trackURL;
          self.audio.load();
          self.audio.play();
          self.currentTrack.paused = false;
        } else {
          if (self.audio.paused) {
            self.audio.play();
            self.currentTrack.paused = false;
          } else {
            self.audio.pause();
            self.currentTrack.paused = true;
          }
        }
      } else {
        self.stopAudio();
      }
    }


    /**
     * Stop playing and stop loading more audio data as well, like a reset.
     *
     * @function stopAudio
     * @memberOf SCPPlayer.PlayController#
     */
    this.stopAudio = function() {
      if (self.currentTrack) {
        self.currentTrack.paused = true;
      }
      self.audio.pause();
      self.audio.src = "";
      self.currentTrack = null;
    }
  }]);
})(window.jQuery, window.angular, window.soundCloudPlayerConfig);
