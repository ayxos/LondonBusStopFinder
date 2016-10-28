define(['jade'], function(jade){
  return function (locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ "class": ('notification') + ' ' + ('alert') + ' ' + ('fade') + ' ' + ('in') + ' ' + ("" + (alert_type) + "") }, {"class":true}));
buf.push('><a href="#" data-dismiss="alert" class="close">×</a>' + escape((interp = message) == null ? '' : interp) + '</div>');
}
return buf.join("");
};
});