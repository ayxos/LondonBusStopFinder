define(['jade'], function(jade){
  return function (locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<p> Welcome to initView</p><button type="button" data-action="api" class="btn btn-default">List</button>');
}
return buf.join("");
};
});