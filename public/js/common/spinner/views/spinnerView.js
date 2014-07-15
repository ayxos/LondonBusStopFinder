define(function(require) {
  'use strict';

  require('spin_jquery');

  var Backbone_refactor = require('backbone')
    , LoaderTpl = require('js/tpl/common/spinner/templates/loader');

  return Backbone_refactor.View.extend({

    template: LoaderTpl,

    initialize: function(){
      console.log('init spinnerView');
    },

    onShow: function() {
      var opts = {
        lines: 9, // The number of lines to draw
        length: 5, // The length of each line
        width: 4, // The line thickness
        radius: 8, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9 // The z-index (defaults to 2000000000)
      };
      this.$el.find('#spinLoading').spin(opts);
    },

    render: function(){
      $(this.el).html();
      return this;
    }
    
  });
});