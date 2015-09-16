module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json')
    , meta: {
          jsFilesForTesting: [
              'bower_components/jquery/dist/jquery.min.js'
            , 'bower_components/angular/angular.min.js'
            , 'bower_components/angular-mocks/angular-mocks.js'
            , 'test/**/*Test.js'
          ]
      }
    , 'file-creator': {
          options: {
              openFlags: 'w'
          }
        , config: {
              "js/config.js": function(fs, fd, done) {
                  fs.writeSync(fd, ';window.soundCloudPlayerConfig=');
                  fs.writeSync(fd, 'window.soundCloudPlayerConfig||{};');
                  fs.writeSync(fd, 'window.soundCloudPlayerConfig.clientId="');
                  fs.writeSync(fd, grunt.option('client-id'));
                  fs.writeSync(fd, '";');
                  done();
              }
          }
      }
    , karma: {
          development: {
              configFile: 'karma.conf.js'
            , options: {
                  files: [
                      '<%= meta.jsFilesForTesting %>'
                    , 'js/**/*.js'
                  ]
              }
          }
      }
    , jsdoc: {
          dist: {
              src: ['js/**/*.js']
            , options: {
                  destination: 'doc'
              }
          }
      }
  });

  grunt.loadNpmTasks('grunt-file-creator');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['karma:development']);
};

// ;window.soundCloudPlayerConfig=window.soundCloudPlayerConfig||{};window.soundCloudPlayerConfig.clientId="35a157689caab03131250ae9ea1a569c";