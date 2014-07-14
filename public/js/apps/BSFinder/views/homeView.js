define(function(require) {
  'use strict';

  var Backbone = require('backbone')
  // templates
  , homeTpl = require('js/tpl/BSFinder/templates/home')
  , controlsTpl = require('js/tpl/BSFinder/templates/controls')
  // views
  , MapView = require('js/apps/BSFinder/views/mapView')

  , mapView
  ;

  return Backbone.View.extend({

    events: {
      'click [data-action="map"]': 'showMap',
      'click #removeBtn':'remove'
    },

    initialize:function (arg) {
      console.log('homeview');
      this.template = homeTpl;
      this.router = arg;
    },

    showMap: function(){
      mapView = new MapView;
      $("#map").append(mapView.render().el);
      $("#controls").html(controlsTpl);
    },

    remove: function(){
      console.log('click on remove');
      mapView.remove();
    },

    render:function () {
      $(this.el).html(this.template);
      return this;
    }

  });

});
