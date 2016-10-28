define(function(require) {
  'use strict';

  var Backbone = require('backbone')
  // templates
  , homeTpl = require('js/tpl/apps/BSFinder/templates/home')
  , controlsTpl = require('js/tpl/apps/BSFinder/templates/controls')
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
      this.template = homeTpl;
      this.router = arg;
      mapView = new MapView;
    },

    showMap: function(){
      $("#forkme").fadeToggle(600);
      $("#init").fadeToggle(600);
      $("#map").append(mapView.render().el);
      $("#controls").html(controlsTpl);
    },

    remove: function(){
      mapView.remove();
    },

    render:function () {
      $(this.el).html(this.template);
      return this;
    }

  });

});
