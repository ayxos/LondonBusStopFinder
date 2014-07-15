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
      console.log('init notification base view', this.model, 'args', arg);
      this.render();
    },

    render: function() {
      $(this.el).append( this.template(this.model) );
      this.$el.find(".alert").alert();
      return this.$el;
    }

  });
  
});