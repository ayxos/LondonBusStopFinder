module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower: {
      install: {
        options: {
          targetDir: 'public/vendors',
          layout: 'byType',
          install: true,
          verbose: true,
          cleanTargetDir: false,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },

    // make two cleans, if is grunt default or if is production
    clean: ['public/css/*.min.css', 'public/js/apps/home/templates/tpl/', 'public/js/main-built.js'],

    copy: {
      main: {
        expand: true,
        flatten: true,
        src: 'public/vendors/requirejs/require.js',
        dest: 'public/js',
        filter: 'isFile'
      }
    },

    jade: {
      apps: {
        files: {
          'public/js/tpl/': 'public/js/**/**/templates/**/*.jade'
        },
        options: {
          basePath: 'public/js/apps/',
          wrap: {
            wrap: true,
            amd: true,
            node: false,
            dependencies: 'jade'
          },
          runtime: false
        }
      }
    },

    jshint: {
      all: ['public/js/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        laxcomma: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        indent: 2,
        devel: true,
        globals: {
          window: true,
          document: true,
          location: true,
          define: true,
          require: true,
          requirejs: true,
          Backbone: true,
          PeopleCollection:true,
          PeopleModel:true,
          // Here places words gloabla that not need tobe defined
          $: true,
          _:true,
          Mustache:true,
          Rectangulo:true,
        },
        ignores: ['public/js/require.js', 'public/js/apps/**/templates/tpl/*.js']
      },
    },

    processhtml: {
      dev: {
        files: {
          'src/main/webapp/index.htm': ['src/main/webapp/index_base.htm']
        }
      },
      prod: {
        files: {
          'src/main/webapp/index.htm': ['src/main/webapp/index_base.htm']
        }
      }
    },

    requirejs: {

      app: {
        options: {
          name:'js/main',
          baseUrl: "./public/",
          mainConfigFile: "public/js/main.js",
          out: "public/js/main-built.js"
        }
      }

    },

    watch: {
      options: {
        event: ['added', 'changed']
      },
      jade: {
        files: ['public/js/apps/home/templates/*.jade'],
        tasks: ['newer:jade','jade']
      },
      backbone: {
        files: ['public/js/apps/home/**/*.js'],
        tasks: ['jshint']
      }
    }

  });

  // EXTERNAL PLUGINS //


  // JS Code quality
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Watcher, execute multiple task when a file has been changed
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Compile Jade templates to HTML !!!IMPORTANT there is another contrib from jade to HTML
  grunt.loadNpmTasks('grunt-jade');
  // Remove files
  grunt.loadNpmTasks('grunt-contrib-clean');
  // watch newer files
  grunt.loadNpmTasks('grunt-newer');
  // Testing Js code using Jasmine and Phantom
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  // For building the static application
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  // Compress & minify CSS
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Load Bower.json
  grunt.loadNpmTasks('grunt-bower-task');
  // Let move files
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Set dist or dev environment
  grunt.loadNpmTasks('grunt-processhtml');



  // TASKS //

  // production task
  grunt.registerTask('production', ['bower', 'clean', 'jade', 'requirejs']);
  // default task
  grunt.registerTask('default', ['bower', 'clean', 'jshint', 'jade']);
  // untest task
  grunt.registerTask('notest', ['clean','jade', 'concat']);
  // test task
  grunt.registerTask('test', ['jshint', 'jasmine']);
  // jshint task
  grunt.registerTask('checkjs', ['jshint']);
  // just turn sass files into Css
  grunt.registerTask('style', ['clean:style', 'sass', 'cssmin']);
  // just run require app
  grunt.registerTask('req', ['clean','requirejs']);
    // just run require app
  grunt.registerTask('jad', ['jade']);

};
