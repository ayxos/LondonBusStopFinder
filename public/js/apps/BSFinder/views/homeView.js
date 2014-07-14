define(function(require) {
  'use strict';

  var Backbone = require('backbone')
  , homeTpl = require('js/tpl/BSFinder/templates/home')
  ;

  return Backbone.View.extend({

    events: {
      'click [data-action="api"]': 'goToMap'
    },

    initialize:function (arg) {
      console.log('homeview');
      this.template = homeTpl;
      this.router = arg;
    },

    goToApi: function() {
      this.router.navigate("/map", true);
    },

    render:function () {
      $(this.el).html(this.template);
      return this;
    }

  });

});
