define(function(require) {
  'use strict';

  require('bootstrap_3');

  var Backbone_refactor = require('backbone')
  // templates
  , notificationBaseTpl = require('js/tpl/common/notifications/templates/alert-notification')

  ;

  return Backbone_refactor.View.extend({

    el: $("#loading"),

    events: {
      'click [data-dismiss="alert"]': 'close'
    },

    initialize: function(arg) {
      this.template = notificationBaseTpl;
      this.model = {
        message: arg.msg,
        alert_type: 'alert-' + arg.type
      }
      this.render();
    },

    render: function() {
      $('#alerts').append( this.template(this.model) );
      $("#alerts").alert();
      return this.$el;
    }

  });

});
