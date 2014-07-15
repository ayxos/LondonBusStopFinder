define(function(require) {
  'use strict';

  var Backbone_refactor = require('backbone');
  
  return Backbone_refactor.View.extend({

    initialize:function (arg) {

      this.template = arg.template;
      this.tagName = arg.tagName;
      this.model = arg.model;
      this.attributes = arg.attributes;

      console.log('New item view', arg);
      this.model.bind("change", this.render, this);
      this.model.bind("destroy", this.close, this);
    },

    render:function () {
      // var dom = $(this.template(this.model.toJSON()));
      // this.setElement(dom);
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }

  });
  
});