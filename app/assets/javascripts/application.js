// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require jquery-ui
//= require maps-leaflet
//= require plugins/leaflet.markercluster-src
//= require jstz-1.0.4.min
//= require timezone
//= require jquery.geocomplete
//= require moment
//= require bootstrap-datetimepicker
//= require new_content
$(document).on('ready page:load', function(){
  navigationAction();
});
$(function(){
	$("#geocomplete").geocomplete({
	  details: "form",
	  types: ["geocode", "establishment"]
	}).bind("geocode:result", function(event, result){
	  console.log(r = result);
	  var lat = result["geometry"]["location"]["k"]
	  var lng = result["geometry"]["location"]["B"]
	  map.setView(new L.LatLng(lat, lng), 15);
	  if(newAddedMarker){
	    newAddedMarker.setLatLng([lat, lng]);
	  }else{
	    newAddedMarker = L.marker([lat, lng], {}).addTo(map);
	  }
	});

	$("#geocomplete").click(function(){
	  $("#geocomplete").trigger("geocode");
	});
});