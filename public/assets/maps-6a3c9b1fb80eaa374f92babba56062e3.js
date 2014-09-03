function getElementRect(e){for(var t=e.offsetLeft,a=e.offsetTop,o=e.offsetParent;o&&o!=document.body.parentNode;)isFinite(o.offsetLeft)&&isFinite(o.offsetTop)&&(t+=o.offsetLeft,a+=o.offsetTop),o=o.offsetParent;return{left:t,top:a,width:e.offsetWidth,height:e.offsetHeight}}var mapFlyover={tile:"http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg",subdomains:["otile1","otile2","otile3","otile4"]},mapHybrid={tile:"http://a.tile.openstreetmap.org/{z}/{x}/{y}.png",subdomains:["otile1","otile2","otile3","otile4"]};mapStandar={tile:"http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png",subdomains:["1","2","3","4"]},mapBox={tile:"https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png"},mapDetail={tile:"http://{s}.tile.osm.org/{z}/{x}/{y}.png"},dataMidContent=$("#content-for-map").attr("data-contents"),latLong=JSON.parse($("#location-for-map").attr("data-contents")),latLongContent=$("#content-location-for-map").attr("data-content-information"),parentType=$("#content-location-for-map").attr("data-content-type"),eventType=$("#event-type").attr("data-event-type"),mapNavigation=$("#switch-map").children("li"),mapLocation=$("body").attr("data-location-scope"),currentPage=$("body").attr("data-action"),contentType=$("body").attr("data-content-type"),mapType=$("#map-used").attr("data-map"),lat=latLong[0],lng=latLong[1],latlngbounds=null,dataContent=null,placemark=null,markers=null,icon=null,gex=null,ge=null,map=null,redIcon=null;var guid=function(){return S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()},S4=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};dataContent=dataMidContent.length>0?JSON.parse(dataMidContent):0,latLongContent=latLongContent?JSON.parse(latLongContent):0;var generateMap=function(e){var t=new L.TileLayer(mapBox.tile,{maxZoom:18,attribution:"\xa9<a href='http://openstreetmap.org/' target='_blank'>OpenStreetMap</a> contributors, Tiles Courtesy of <a href='http://open.mapquest.com' target='_blank'>MapQuest</a>",id:"examples.map-i86knfo3"});map=new L.Map("map",{center:e,scrollWheelZoom:!1,zoom:20,layers:[t],zoomControl:!0})},generateMapContent=function(e){var t=new L.TileLayer(mapBox.tile,{maxZoom:18,id:"examples.map-i86knfo3"});mapContent=new L.Map("map-content",{center:e,scrollWheelZoom:!1,zoom:8,layers:[t],zoomControl:!0})},flagUsing=function(e){$("#location_maps").val(e)},mapService=function(e){$("#location_maps").val(e)},createNativeHTMLButton=function(){var e=document.getElementById("sign_up_box");e.style.display="block";var t=document.createElement("iframe");t.frameBorder=0,t.scrolling="no";var a=getElementRect(document.getElementById("map"));alert(Object.keys(a)),e.style.position=t.style.position="absolute",t.style.left=a.left+"412px",t.style.borderRadius="12px",e.style.top=t.style.top="193px",t.style.width=e.style.width="525px",t.style.height=e.style.height="241px",e.style.zIndex=10,e.style.zIndex=e.style.zIndex-1,document.body.appendChild(e),document.body.appendChild(t)},create_lookat=function(e,t,a){var o=e.createLookAt("");o.set(t,a,6e4,e.ALTITUDE_RELATIVE_TO_GROUND,0,0,600),e.getView().setAbstractView(o)},create_marker=function(e,t,a,o){placemark=ge.createPlacemark(""),icon=ge.createIcon(""),icon.setHref("http://maps.google.com/mapfiles/kml/paddle/red-circle.png");var n=ge.createStyle("");n.getIconStyle().setIcon(icon),placemark.setStyleSelector(n);var l=ge.createPoint("");l.setLatitude(e),l.setLongitude(t),placemark.setGeometry(l),ge.getFeatures().appendChild(placemark),google.earth.addEventListener(placemark,"click",function(e){e.preventDefault();var t=ge.createHtmlStringBalloon("");t.setFeature(e.getTarget()),t.setContentString(o),ge.setBalloon(t)})},loadGoogleEarth=function(){google.load("earth","1",{callback:function(){1==google.earth.isSupported()?1==google.earth.isInstalled()?"Windows"!=window.ui.os||"Chrome"!=window.ui.browser&&"Firefox"!=window.ui.browser?(flagUsing("earth"),googleEarthView(dataContent,latLong),$(mapNavigation[0]).removeClass("active"),$(mapNavigation[1]).addClass("active")):(flagUsing("leaflet"),leafletMapsView(dataContent,latLong,mapLocation),$(mapNavigation[1]).removeClass("active"),$(mapNavigation[0]).addClass("active"),mapNotice("We apologise, google earth is still under construction for the browser chrome in windows").show("slide",{direction:"up"})):(flagUsing("leaflet"),leafletMapsView(dataContent,latLong,mapLocation),$(mapNavigation[1]).removeClass("active"),$(mapNavigation[0]).addClass("active")):(flagUsing("leaflet"),leafletMapsView(dataContent,latLong,mapLocation),$(mapNavigation[1]).removeClass("active"),$(mapNavigation[0]).addClass("active"),mapNotice("google earth not supported on your browser/os").show("slide",{direction:"up"}))}})};("show"==currentPage||"edit"==currentPage)&&leafletMapsViewContent(eventType,latLongContent),"earth"==mapType?(loadGoogleEarth(),$(mapNavigation[0]).removeClass("active"),$(mapNavigation[1]).addClass("active")):(leafletMapsView(dataContent,latLong,mapLocation),$(mapNavigation[1]).removeClass("active"),$(mapNavigation[0]).addClass("active")),setTimeout(function(){$(".drag").draggable({helper:"clone",containment:"map",start:function(e,t){L.icon({iconUrl:t.helper.attr("src"),iconAnchor:[13,33],popupAnchor:[0,-30]})},stop:function(e,t){var a=L.icon({iconUrl:t.helper.attr("src"),iconAnchor:[13,33],popupAnchor:[0,-30]}),o={pid:guid(),type:t.helper.attr("type"),icon:a,draggable:!0},n=[t.offset.left-410,t.offset.top-270];console.log(map.containerPointToLatLng(n)),putMarker(map.containerPointToLatLng(n),o)}})},2e3);var newAddedMarker=null,putMarker=function(e,t){newAddedMarker&&map.hasLayer(newAddedMarker)?(redIcon=L.icon({iconUrl:$(".drag").attr("src")}),newAddedMarker.setLatLng([e.lat,e.lng]).setIcon(redIcon)):(newAddedMarker=L.marker([e.lat,e.lng],t).addTo(map),newAddedMarker.on("dragend",function(){putMarker(newAddedMarker.getLatLng(),t)}));var a={abort:function(){}};a.abort(),a=$.ajax({url:"/get_location_by_lat_lng",data:{location:{lat:e.lat,lng:e.lng}},method:"POST",timeout:3e4,beforeSend:function(){$(".loader-assign").html('<i class="fa fa-refresh fa-spin"></i>')},success:function(e){if(e)console.log(e),$("#event_latitude").val(e.latitude),$("#event_longitude").val(e.longitude),$(".geocomplete").val(e.address),$("#event_country").val(e.country_name),$("#event_city").val(e.region),$("#event_postal_code").val(e.postal_code);else{map.removeLayer(newAddedMarker),$("#event_latitude").val(""),$("#event_longitude").val(""),$(".geocomplete").val(""),$("#event_country").val(""),$("#event_city").val(""),$("#event_postal_code").val("");var t=$(".notif-modal-change-new").html("<p>Failed to add marker. Please try again.</p>");t.show("drop",{direction:"up"},200).delay(1e3).hide("drop",{direction:"up"},300)}$(".loader-assign").html("")}})};