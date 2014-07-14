define(function(require) {
  'use strict';

  var Backbone = require('backbone')
  , MapView = require('js/apps/BSFinder/views/mapView')

  ;

  return Backbone.Router.extend({

    routes: {
      '' : 'showMap'
    },

    initialize: function(){
    //init app
      Backbone.history.start();
    },

    showMap: function(){
      var mapView = new MapView;
      $("#backbone").append(mapView.render().el);
    }
  });

});