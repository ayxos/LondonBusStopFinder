define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button><h4 class="modal-title">Modal title</h4></div><div class="modal-body"><div id="modal_content"></div></div><div class="modal-footer"><a data-action="closeModal" class="btn">Close</a><a href="#" class="btn btn-primary">Save changes</a></div></div></div>');
}
return buf.join("");
};
});