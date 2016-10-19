define(function(require) {
  'use strict';

  // implemented google maps API to backbone
  require('async!http://maps.google.com/maps/api/js?sensor=false');
  require('spin');

  //local variables using main require config file
  var $ = require('jquery')
  , _ = require('underscore')
  , Backbone = require('backbone')
  // notification view
  , Notification = require('js/common/notifications/views/notificationBaseView')
  , mark = []

  , URL = 'https://api.tfl.gov.uk/StopPoint'
  , AUTH;


  var Map = Backbone.View.extend({

    _map: null,

    initialize: function(){
      this.getCredentials();
    },

    getCredentials: function(){
      $.ajax({
        async: true,
        type: "GET",
        url: '/auth',
        dataType: "json",
        success : function(data) {
          AUTH = '?app_key=' + data.app_key + '&app_id=' + data.app_id;
        },
        error: function(jqXHR, textStatus, errorThrown){
          console.log("AUTH COLLECTION FAILED: " + errorThrown);
        }
      });
    },

    // init method, just shows the map
    render: function(){
      var mapElement = this.$el.find('#map');
      this.createMapElement(this.$el, this.el);
      return this;
    },

    createMapElement: function($element, el ){
      var self = this;
      $element.css({margin: 'auto auto', 'margin-top': '20px', width: (window.innerWidth - 60) + 'px', height: (window.innerHeight - 60) + 'px'});

      this.map = new google.maps.Map(el,{
        zoom: 14,
        center: new google.maps.LatLng(51.5286416,-0.1015987)
      });

      // SHOW NOTIIFICATION
      setTimeout(function(){
        new Notification({
          // type could be: info/danger/success/warning
          type: 'info',
          msg: 'to load Bus stops just click'
        });
      },2000);


      google.maps.event.addListener(this.map, 'click', function(event) {
        self.remove();
        if (self.map.zoom > 15){
          self.placeMarker(event.latLng, self.map);
        }
        else{
          // SHOW NOTIIFICATION
          new Notification({
            // type could be: info/danger/success/warning
            type: 'warning',
            msg: 'you need more zoom!'
          });
        }
      });

    },

    remove: function(){
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
      , self = this
      , swLat = '&swLat=' + location.f.f
      , swLon = '&swLon=' + location.b.b
      , neLat = '&neLat=' + location.f.b
      , neLon = '&neLon=' + location.b.f
      , stopTypes = '&stopTypes=CarPickupSetDownArea,NaptanAirAccessArea,NaptanAirEntrance,NaptanAirportBuilding,NaptanBusCoachStation,NaptanBusWayPoint,NaptanCoachAccessArea,NaptanCoachBay,NaptanCoachEntrance,NaptanCoachServiceCoverage,NaptanCoachVariableBay,NaptanFerryAccessArea,NaptanFerryBerth,NaptanFerryEntrance,NaptanFerryPort,NaptanFlexibleZone,NaptanHailAndRideSection,NaptanLiftCableCarAccessArea,NaptanLiftCableCarEntrance,NaptanLiftCableCarStop,NaptanLiftCableCarStopArea,NaptanMarkedPoint,NaptanMetroAccessArea,NaptanMetroEntrance,NaptanMetroPlatform,NaptanMetroStation,NaptanOnstreetBusCoachStopCluster,NaptanOnstreetBusCoachStopPair,NaptanPrivateBusCoachTram,NaptanPublicBusCoachTram,NaptanRailAccessArea,NaptanRailEntrance,NaptanRailPlatform,NaptanRailStation,NaptanSharedTaxi,NaptanTaxiRank,NaptanUnmarkedPoint&useStopPointHierarchy=True&includeChildren=True&returnLines=True';

      $.ajax({
        async: true,
        type: "GET",
        url: URL + AUTH + swLat + swLon + neLat + neLon + stopTypes,
        dataType: "json",
        success : function(data) {
          console.log('data',data);
          result = data;
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

      function noIdFound(el) {
        return el.naptanId;
      }

      for(var i=0; i<stopList.length; i++){
        var myLatlng = new google.maps.LatLng(stopList[i].lat,stopList[i].lon);
        mark[i] = new google.maps.Marker({
          position: myLatlng,
          map: this.map,
          icon: image,
          id: stopList[i].children.length ? stopList[i].children[0].naptanId : noIdFound(stopList[i])
        });
      }
      for(var i=0; i<mark.length;i++){
        google.maps.event.addListener(mark[i], 'click', function() {
          self.getPopupInfo(this.id,this);
        });
      }
    },

    // method to init popup info
    showPopupInfo: function(info, mark){
      var contentString = '<div id="content">'+
        '<h1 id="firstHeading" class="firstHeading">Stop nº: ' + mark.id + '</h1>' +
        '<div id="bodyContent">';

      contentString += this.createContent(info);

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      infowindow.open(this.map,mark);

    },

    // better if its moved to a external template like jade or handlebars
    createContent: function(info) {

      function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      }

      var result;
      if (!info || !info.length) {
        result = 'No data';
      } else {
        result = '<ul> Bus stops List for: ' + info[0].stationName + '\nTowards: ' + info[0].towards;
        var previousValue;
        for (var i=0; i < info.length; i++) {
          // sometimes API returns same data twice
          var addValue = (previousValue) ? (JSON.stringify(previousValue) === JSON.stringify(info[i])) : true;
          result += (addValue) ? '<li>BusLine: <a style="color:red">' + info[i].lineId + ' </a> Destination: <c style="color:blue"> ' +  info[i].destinationName + '</c> left: <b>' + millisToMinutesAndSeconds(info[i].timeToStation) + '</b></li>' : ''; 
          previousValue = info[i];
        }
      }
      
      result += '</ul></div></div>';

      return result;
    },

    //get popup info must be a Backbone Collection because its an Ajax call
    getPopupInfo: function(id, mark){
      var resultSingleStop
      , self = this;
      $.ajax({
        async: true,
        type: "GET",
        url: URL + '/' + id + '/arrivals',
        dataType: "json",
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
