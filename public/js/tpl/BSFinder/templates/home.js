define(['jade'], function(jade){
  return function (locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="init"><p> Welcome to LondonBusStopFinder</p><button type="button" data-action="map" class="btn btn-default">Map</button><a href="http://twitter.com/share?url=http%3A%2F%2Fayxos.com/londonBusFinder&amp;text=Google%20Maps%20London%20BusFinder%20using%20Backbone&amp;via=iBro_13" class="btn btn-default"><i class="fa fa-twitter fa-lg tw"></i></a></div><div id="controls"></div><div id="map"></div>');
}
return buf.join("");
};
});