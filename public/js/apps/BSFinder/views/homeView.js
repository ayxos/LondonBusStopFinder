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
      'click #removeBtn':'remove',
      'click #backBtn':'goBack'
    },

    initialize:function (arg) {
      console.log('homeview');
      this.template = homeTpl;
      this.router = arg;
    },

    goBack: function(){
      $("#controls").fadeToggle(600);
      $("#map").fadeToggle(600);
      $("#forkme").fadeToggle(600);
      $("#init").fadeToggle(600);
    },

    showMap: function(){
      mapView = new MapView;
      $("#forkme").fadeToggle(600);
      $("#init").fadeToggle(600);
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
