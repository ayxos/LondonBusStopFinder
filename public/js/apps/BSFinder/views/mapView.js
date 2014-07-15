define(function(require) {
  'use strict';

  // implemented google maps API to backbone
  require('async!http://maps.google.com/maps/api/js?sensor=false');

  //local variables using main require config file
  var $ = require('jquery')
  , _ = require('underscore')
  , Backbone = require('backbone')
  // notification view
  , Notification = require('js/common/notifications/views/notificationBaseView') 
  , mark = []
  ;


  var Map = Backbone.View.extend({

    _map: null,

    // init method, just shows the map
    render: function(){

      var mapElement = this.$el.find('#map');
      console.log('map', mapElement);

      this.createMapElement(this.$el, this.el);

      return this;
    },

    createMapElement: function($element, el ){
      var self = this;
      console.log('$element', $element, 'el', el);
      $element.css({margin: 'auto auto', 'margin-top': '20px', width: (window.innerWidth - 60) + 'px', height: (window.innerHeight - 60) + 'px'});

      this.map = new google.maps.Map(el,{
        zoom: 14,
        center: new google.maps.LatLng(51.5286416,-0.1015987)
      });

      // SHOW NOTIIFICATION
      var not = new Notification({
        // type could be: info/danger/success/warning
        type: 'info',
        msg: 'menu loaded'
      });

      google.maps.event.addListener(this.map, 'click', function(event) {
        if (self.map.zoom < 7){
          self.placeMarker(event.latLng, self.map);
        }
      });

    },

    remove: function(){
      console.log('cleaning map..');
      for(var i=0;i<mark.length;i++){
        mark[i].setMap(null);
      }
    },

    placeMarker: function(location, map) {
      this.getStops(map.getBounds());
      map.setCenter(location);
    },

    // it must be a collection
    getStops: function(location){
      var result
      , northEast = location.xa.j + ',' + location.pa.j
      , southWest = location.xa.k + ',' + location.pa.k
      , self = this;
      $.ajax({
        async: true,
        type: "GET",
        url: 'http://digitaslbi-id-test.herokuapp.com/bus-stops?northEast=' + northEast + '&southWest=' + southWest,
        dataType: "jsonp",
        success : function(data) {
          console.log('data',data);
          result = data.markers;
          self.showStops(result);
        },
        error: function(jqXHR, textStatus, errorThrown){
          console.log("FETCH COLLECTION FAILED: " + errorThrown);
        }
      });
    },

    // makers for every data entry
    showStops: function(stopList){
      var self = this;
      var image = 'assets/bus.png';
      for(var i=0; i<stopList.length; i++){
        // console.log('fewqfewewqfew', stopList[i]);
        var myLatlng = new google.maps.LatLng(stopList[i].lat,stopList[i].lng);
        mark[i] = new google.maps.Marker({
          position: myLatlng,
          map: this.map,
          icon: image,
          id: stopList[i].id
        });
      }
      for(var i=0; i<mark.length;i++){
        google.maps.event.addListener(mark[i], 'click', function() {
          self.getPopupInfo(this.id,this);
        });
      }
      console.log('refinish mark');
    },

    // method to init popup info
    showPopupInfo: function(info, mark){
      console.log('info', info);
      var contentString = '<div id="content">'+
        '<h1 id="firstHeading" class="firstHeading">Stop nº: ' + mark.id + '</h1>' +
        '<div id="bodyContent">'+ '<ul>';

      contentString += this.createContent(info);

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      infowindow.open(this.map,mark);

    },

    // better if its moved to a external template like jade or handlebars
    createContent: function(info){
      var result;
      for(var i=0;i<info.arrivals.length;i++){
        result += '<li>Bus: <a style="color:blue">' + info.arrivals[i].routeId + ' </a> Destination: <c style="color:grey"> ' +  info.arrivals[i].destination + '</c> left: <b>' + info.arrivals[i].estimatedWait + '</b></li>';
      }
      result+='</ul></div></div>';

      return result;
    },

    //get popup info must be a Backbone Collection because its an Ajax call
    getPopupInfo: function(id, mark){
      var resultSingleStop
      , self = this;
      $.ajax({
        async: true,
        type: "GET",
        url: 'http://digitaslbi-id-test.herokuapp.com/bus-stops/' + id,
        dataType: "jsonp",
        success : function(data) {
          self.showPopupInfo(data, mark);
        },
        error: function(jqXHR, textStatus, errorThrown){
          console.log("FETCH COLLECTION FAILED: " + errorThrown);
        }
      });
    }

  });

  return Map;

});
