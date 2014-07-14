define(['jade'], function(jade){
  return function (locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<p> Welcome to LondonBusStopFinder</p><button type="button" data-action="map" class="btn btn-default">Map</button><div id="controls"></div><div id="map"></div>');
}
return buf.join("");
};
});