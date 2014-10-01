module.exports = function(grunt) {

  var timeGrunt = require('time-grunt');
  
  //timeGrunt(grunt);

  var basePath = 'app/www/',
    DEPLOY_PATH = basePath + 'public/',
    DEPLOY_JS_PATH = DEPLOY_PATH + 'js/',
    DEPLOY_CSS_PATH = DEPLOY_PATH + 'css/';

  grunt.task.registerTask('start', function(){
    console.log('Starting Build...');
  });  

  var cfg = {
    
    pkg: grunt.file.readJSON('package.json'),

    exec: {
      build: {
        command: 'node node_modules/requirejs/bin/r.js -o require-config.js'
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [ basePath + 'js/**/*.js'],
        dest: DEPLOY_JS_PATH + '<%= pkg.name %>.js'
      }
    },

    less: {
      development: {
        options: {
          paths: [ basePath + "css"]
        },
        files: {
          'app/www/public/css/<%= pkg.name %>.min.css' : basePath + 'css/main.less'
        }
      }      
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'app/www/public/js/<%= pkg.name %>.min.js' : ['<%= concat.dist.dest %>']          
        }
      }
    },

    jshint: {
      files: [basePath + 'js/**/*.js'],
      options: {
        globals: {
          console: true,
          module: true
        }
      }
    },

    shrink : {
      begin : {

      }
    }
  };

  grunt.task.registerMultiTask('shrink', 'A sample shrink job', function() {
    var me = this;
    console.log(me);
    console.log('shrink');
  });


  grunt.loadNpmTasks('grunt-contrib-uglify');  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.task.registerTask('default', ['start','concat', 'uglify', 'less']);

  grunt.initConfig(cfg);

};