requirejs.config({
  waitSeconds: 0,

  baseUrl: './',

  paths: {
    jade                         : 'vendors/jade/runtime',
    jquery                       : 'vendors/jquery/jquery',
    underscore                   : 'vendors/underscore/underscore',
    backbone                     : 'vendors/backbone/backbone',
    'async'                      : 'vendors/requirejs-plugins/async',
    bootstrap_3                  : 'vendors/bootstrap-3/bootstrap'
  },

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    bootstrap_3: {
      deps: ['jquery']
    }
  }
});

require(['js/apps/router'], function(AppRouter) {
  this.app = new AppRouter({});
});
