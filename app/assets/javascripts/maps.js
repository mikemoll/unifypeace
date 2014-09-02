var mapFlyover = {tile: 'http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', subdomains: ['otile1','otile2','otile3','otile4']},
mapHybrid      = {tile: 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', subdomains: ['otile1','otile2','otile3','otile4']}
mapStandar     = {tile: 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', subdomains: ['1','2','3','4']},
mapBox         = {tile: 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png'},
mapDetail      = {tile: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'},
dataMidContent = $("#content-for-map").attr("data-contents"),
latLong        = JSON.parse($("#location-for-map").attr("data-contents")),
latLongContent = $("#content-location-for-map").attr("data-content-information"),
parentType     = $("#content-location-for-map").attr("data-content-type"),
eventType      = $("#event-type").attr("data-event-type"),
mapNavigation  = $("#switch-map").children("li"),
mapLocation    = $("body").attr("data-location-scope"),
currentPage    = $("body").attr("data-action"),
contentType    = $("body").attr("data-content-type"),
mapType        = $("#map-used").attr("data-map"),
lat            = latLong[0],
lng            = latLong[1],
latlngbounds   = null,
dataContent    = null,
placemark      = null,
markers        = null,
icon           = null,
gex            = null,
ge             = null,
map            = null,
redIcon        = null;


var guid = function(){
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

var S4 = function(){
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

if(dataMidContent.length > 0){
  dataContent = JSON.parse(dataMidContent);
}else{
  dataContent = 0;
}

if(latLongContent){
  latLongContent = JSON.parse(latLongContent);
}else{
  latLongContent = 0;
}

var generateMap = function(latLong){
  var mapquest = new L.TileLayer(mapBox.tile, {
    maxZoom: 18,
    attribution: "©<a href='http://openstreetmap.org/' target='_blank'>OpenStreetMap</a> contributors, Tiles Courtesy of <a href='http://open.mapquest.com' target='_blank'>MapQuest</a>",
    id: 'examples.map-i86knfo3'
    // subdomains: mapStandar.subdomains,
  });

  map = new L.Map('map', {
    center: latLong,
    scrollWheelZoom: false,
    zoom: 20,
    layers: [mapquest],
    zoomControl: true
  });
}


var generateMapContent = function(latLong){
  var mapquestContent = new L.TileLayer(mapBox.tile, {
    maxZoom: 18,
    id: 'examples.map-i86knfo3'
  });

  mapContent = new L.Map('map-content', {
    center: latLong,
    scrollWheelZoom: false,
    zoom: 8,
    layers: [mapquestContent],
    zoomControl: true
  });
}

var flagUsing = function(val){
  $("#location_maps").val(val);
}

var mapService = function(val){
  $("#location_maps").val(val);
}

function getElementRect(element) {
  var left = element.offsetLeft;
  var top = element.offsetTop;

  var p = element.offsetParent;
  while (p && p != document.body.parentNode) {
    if (isFinite(p.offsetLeft) && isFinite(p.offsetTop)) {
      left += p.offsetLeft;
      top += p.offsetTop;
    }

    p = p.offsetParent;
  }

  return {
    left: left, top: top,
    width: element.offsetWidth, height: element.offsetHeight
  };
}

var createNativeHTMLButton = function(x, y, width, height) {

  var map_box = document.getElementById('sign_up_box');
  map_box.style.display = 'block';

  var iframeShim = document.createElement('iframe');
  iframeShim.frameBorder = 0;
  iframeShim.scrolling = 'no';
  var pluginRect = getElementRect(document.getElementById('map'));
  alert(Object.keys(pluginRect));
  map_box.style.position = iframeShim.style.position = 'absolute';
  iframeShim.style.left = (pluginRect.left + '412') + 'px';
  iframeShim.style.borderRadius= '12px';
  map_box.style.top= iframeShim.style.top =  '193px';
  iframeShim.style.width = map_box.style.width= '525px';
  iframeShim.style.height = map_box.style.height= '241px';

  map_box.style.zIndex = 10;
  map_box.style.zIndex = map_box.style.zIndex - 1;

  document.body.appendChild(map_box);
  document.body.appendChild(iframeShim);
}

var create_lookat = function(ge,lat,lng){
  var la = ge.createLookAt('');
  la.set(lat, lng, 60000, ge.ALTITUDE_RELATIVE_TO_GROUND, 0, 0, 600);
  ge.getView().setAbstractView(la);
}

var create_marker = function(lat, lng, type, content) {
  placemark = ge.createPlacemark('');
  icon = ge.createIcon('');
  icon.setHref('http://maps.google.com/mapfiles/kml/paddle/red-circle.png');
  var style = ge.createStyle('');
  style.getIconStyle().setIcon(icon);
  placemark.setStyleSelector(style);

  var point = ge.createPoint('');
  point.setLatitude(lat);
  point.setLongitude(lng);
  placemark.setGeometry(point);
  ge.getFeatures().appendChild(placemark);

  google.earth.addEventListener(placemark, 'click', function(event) {
    event.preventDefault();

    var balloon = ge.createHtmlStringBalloon('');
    balloon.setFeature(event.getTarget());
    balloon.setContentString(content);
    ge.setBalloon(balloon);
  });
}

var loadGoogleEarth = function(){
  google.load(
    'earth',
    '1',
    {
      'callback': function()
      {
        if(google.earth.isSupported() == true){
          if(google.earth.isInstalled() == true){
            if(window.ui.os == "Windows" && (window.ui.browser == "Chrome" || window.ui.browser == "Firefox")){
              flagUsing("leaflet");
              leafletMapsView(dataContent, latLong, mapLocation);
              $(mapNavigation[1]).removeClass("active");
              $(mapNavigation[0]).addClass("active");
              mapNotice("We apologise, google earth is still under construction for the browser chrome in windows").show('slide', { direction: 'up' });
              // $.get("/switch/2D/map");
            }else{
              flagUsing("earth");
              googleEarthView(dataContent, latLong);
              $(mapNavigation[0]).removeClass("active");
              $(mapNavigation[1]).addClass("active");
              // $.get("/switch/3D/map");
            }
          }else{
            flagUsing("leaflet");
            leafletMapsView(dataContent, latLong, mapLocation);
            $(mapNavigation[1]).removeClass("active");
            $(mapNavigation[0]).addClass("active");
            // mapNotice("google earth not installed, please install google earth plugin <a href=\"http://www.google.com/earth/explore/products/plugin.html\" target=\"_blank\">here</a>. <br/> If you have installed the plugin and it still has not run in your browser, check your browser add-ons are google earth plug-in available there?");
            // $.get("/switch/2D/map");
          }
        }else{
          flagUsing("leaflet");
          leafletMapsView(dataContent, latLong, mapLocation);
          $(mapNavigation[1]).removeClass("active");
          $(mapNavigation[0]).addClass("active");
          mapNotice("google earth not supported on your browser/os").show('slide', { direction: 'up' });
          // $.get("/switch/2D/map");
        }
      }
    }
  )
}

if((currentPage == "show")){
  leafletMapsViewContent(eventType, latLongContent);
}

if(mapType == "earth"){
  loadGoogleEarth();
  $(mapNavigation[0]).removeClass("active");
  $(mapNavigation[1]).addClass("active");
}else{
  leafletMapsView(dataContent, latLong, mapLocation);
  $(mapNavigation[1]).removeClass("active");
  $(mapNavigation[0]).addClass("active");
  // $.get("/switch/2D/map");
}


setTimeout(function() {
  $(".drag").draggable({
    helper: 'clone',
    containment: 'map',
    start: function(evt, ui) {
      var redIcon = L.icon({iconUrl: ui.helper.attr("src"), iconAnchor: [13, 33], popupAnchor: [0, -30]});
    },
    stop: function(evt, ui) {
      var redIcon = L.icon({iconUrl: ui.helper.attr("src"), iconAnchor: [13, 33], popupAnchor: [0, -30]});

      var options = {
        pid: guid(),
        type: ui.helper.attr('type'),
        icon: redIcon,
        draggable: true
      };

      // if(model == 'community' || model == 'place' || model == 'resource'){
      //   var leftTop = [ui.offset.left - 213, ui.offset.top -479]
      // }else if(model == 'social'){
      //   var leftTop = [ui.offset.left - 213, ui.offset.top -499]
      // }else if(model == 'discussion'){
      var leftTop = [ui.offset.left + 10, ui.offset.top - 300]
      // }

      console.log(map.containerPointToLatLng(leftTop))
      putMarker(map.containerPointToLatLng(leftTop), options);
    }
  });
}, 2000);


var newAddedMarker = null;
var putMarker = function(position, options){
  if(newAddedMarker && map.hasLayer(newAddedMarker)){
    redIcon = L.icon({iconUrl: $('.drag').attr("src")});
    newAddedMarker.setLatLng([position.lat, position.lng]).setIcon(redIcon);
  }else{
    newAddedMarker = L.marker([position.lat, position.lng], options).addTo(map);
    newAddedMarker.on('dragend', function(event){
      putMarker(newAddedMarker.getLatLng(), options);
    });
  }
  var jqxhr = {abort: function () {}};
  jqxhr.abort();
  jqxhr = $.ajax({
    url: "/get_location_by_lat_lng",
    data: { location: { lat: position.lat, lng: position.lng } },
    method: "POST",
    timeout: 30000,
    beforeSend: function(){
      $(".loader-assign").html("<i class=\"fa fa-refresh fa-spin\"></i>");
    },
    success: function(data){
      if(data){
        $("#event_lat").val(data.latitude);
        $("#event_long").val(data.longitude);
        $("#geocomplete").val(data.address);
        $("#address").val(data.formatted_address);
        $("#event_country").val(data.region);
        $("#event_postal_code").val(data.postal_code);
      }else{
        map.removeLayer(newAddedMarker);
        $("#event_lat").val("");
        $("#event_long").val("");
        $("#geocomplete").val("");
        $("#address").val("");
        $("#event_country").val("");
        $("#event_postal_code").val("");
        var alertNotice = $('.notif-modal-change-new').html("<p>Failed to add marker. Please try again.</p>");
        alertNotice.show("drop", { direction: "up"}, 200).delay(1000).hide("drop", { direction: "up"}, 300);
      }

      $(".loader-assign").html("");
    }
  });
}