define(function(require) {
  'use strict';

  // TODO: it should changes absolutes paths to relatives paths using config if the lib is being used by multiple files.
  // require('data_Tables');

  var Backbone_refactor = require('backbone'), 

  // views
  ListRowView = require('js/common/list/views/listRowView');

  return Backbone_refactor.View.extend({

    initialize:function (arg) {
     
      this.collection = new arg.collection();
      this.tagName = arg.tagName;
      this.className = arg.className;
      this.row = arg.row;
      
      this.collection.bind("reset", this.render, this);
      this.collection.bind('add', this.add, this);
    },

    render:function () {
      var self = this;
      _.each(this.collection.models, function (model) {
        $(this.el).append(new ListRowView(
          {
            model: model,
            template: self.row.template,
            tagName: self.row.tagName,
            className: self.row.className,
            id: self.row.id,
            attributes: self.row.attributes
          }
        ).render().el);
      }, this);
      return this;
    }

  });

});