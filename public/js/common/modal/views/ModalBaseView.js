define(function(require) {
  'use strict';

  var Backbone_refactor = require('backbone') 

  // templates
  , modalBaseTpl = require('js/tpl/common/modal/templates/modalBaseTpl')
    ;
  
  return Backbone_refactor.View.extend({

    // id: 'base-modal',
    className: 'modal fade',

    events: {
      'hidden': 'teardown',
      'click button#close': 'close',
      'click [data-action="closeModal"]': 'close'
    },

    initialize: function(modalContentTpl) {
      this.template = modalBaseTpl;
      this.modalContentTpl = modalContentTpl;
      console.log('init modal base view');
      // _.bindAll(this);
      this.render();
    },

    close: function(){
      this.undelegateEvents();

      this.$el.removeData().unbind(); 

      //Remove view from DOM
      this.remove();  
      Backbone_refactor.View.prototype.remove.call(this);
      $('.modal-backdrop').remove();
    },

    show: function() {
      this.$el.modal('show');
    },

    teardown: function() {
      this.$el.data('modal', null);
      this.remove();
    },

    render: function() {
      this.renderView();
      return this;
    },

    renderView: function() {
      this.$el.html(this.template);
      // this.$el.modal({show:false}); // dont show modal on instantiation
      this.$el.find('#modal_content').html(this.modalContentTpl);
      this.show();
    }


  });
  
});