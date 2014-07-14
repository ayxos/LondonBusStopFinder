define(function(require) {
  'use strict';

  var Backbone = require('backbone')
  // , MapView = require('js/apps/BSFinder/views/mapView')
  , HomeView = require('js/apps/BSFinder/views/homeView')

  ;

  return Backbone.Router.extend({

    routes: {
      '' : 'home'
    },

    initialize: function(){
    //init app
      Backbone.history.start();
    },

    home: function(){
      var homeView = new HomeView();
      $("#backbone").append(homeView.render().el);
    }
  });

});