define(['jade'], function(jade){
  return function (locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="padding_big margin_bottom_medium"><div id="spinner"></div></div>');
}
return buf.join("");
};
});