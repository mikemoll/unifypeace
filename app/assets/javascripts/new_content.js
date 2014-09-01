

// // var locationService = $("#locationService").attr("data-location-service");
// // var newLocation = JSON.parse(locationService);
// // var markerDetect = $("#locationService").attr("data-markers")
// // var dataMarker = JSON.parse(markerDetect);
// // var model = $("#locationService").attr("data-model");

// // var redIcon = null;
// // var mapquest = new L.TileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
// //   maxZoom: 18,
// //   id: 'examples.map-i86knfo3'
// // });

// // if(model == 'event'){
// //   $('#event_start_date').fdatetimepicker();
// //   $('#event_end_date').fdatetimepicker();
// // }

// // var modalMap = new L.Map('mapFormNew', {
// //   center: new L.LatLng(newLocation.latitude, newLocation.longitude), 
// //   zoom: 18,
// //   layers: [mapquest],
// //   zoomControl: true,
// //   scrollWheelZoom: false
// // });

// // if(dataMarker){
// //   var dataLocation = dataMarker;

// //   console.log(newLocation)
// //   var latLong = (newLocation.latitude, newLocation.longitude);
// //   var latlngbounds = new L.LatLngBounds();
// //   var markerGroup = null;

// //   if(dataLocation.length > 0){
// //     if(dataLocation[2] === "Project"){
// //       var redIcon = L.icon({ iconUrl: '/assets/markers/tree.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
// //     }else if(dataLocation[2] === "Idea"){
// //       var redIcon = L.icon({ iconUrl: '/assets/markers/idea.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
// //     }else if(dataLocation[2] === "Picture"){
// //       var redIcon = L.icon({ iconUrl: '/assets/media-image-marker.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
// //     }else if(dataLocation[2] === "Video"){
// //       var redIcon = L.icon({ iconUrl: '/assets/markers/video.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
// //     }else if(dataLocation[2] === "Music"){
// //       var redIcon = L.icon({ iconUrl: '/assets/media-music-marker.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
// //     }else if(dataLocation[2] === "Text"){
// //       var redIcon = L.icon({ iconUrl: '/assets/media-texts-marker.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
// //     }else if(dataLocation[2] === "Web"){
// //       var redIcon = L.icon({ iconUrl: '/assets/media-webpage-marker.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
// //     }else if(dataLocation[2] === "Need"){
// //       var redIcon = L.icon({ iconUrl: '/assets/markers/pie.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
// //     }else if(dataLocation[2] === "Offer"){
// //       var redIcon = L.icon({ iconUrl: '/assets/markers/gift.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
// //     }else if(dataLocation[2] === "Place"){
// //       var redIcon = L.icon({ iconUrl: '/assets/markers/place.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
// //     }else if(dataLocation[2] === "Question"){
// //       var redIcon = L.icon({ iconUrl: '/assets/markers/question.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
// //     }else if(dataLocation[2] === "Event"){
// //       var redIcon = L.icon({ iconUrl: '/assets/markers/calendar.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
// //     }else{
// //       var redIcon = L.icon({ iconUrl: '/assets/media-texts-marker.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
// //     }

// //     var newAddedMarker = L.marker([parseFloat(dataLocation[0]), parseFloat(dataLocation[1])], {icon: redIcon})
// //     .bindPopup(dataLocation[3]).openPopup().addTo(modalMap);

// //     latlngbounds.extend([parseFloat(dataLocation[0]) + 0.1, parseFloat(dataLocation[1]) + 0.1]);
// //     latlngbounds.extend([parseFloat(dataLocation[0]) - 0.1, parseFloat(dataLocation[1]) - 0.1]);

// //     modalMap.fitBounds(latlngbounds);
// //   }else{
// //     latlngbounds.extend(latLong.map(function(el){ return el + 0.1; }));
// //     latlngbounds.extend(latLong.map(function(el){ return el - 0.1; }));
// //     modalMap.fitBounds(latlngbounds);
// //   }
// // }

// setTimeout(function() {
//   $(".drag").draggable({
//     helper: 'clone',
//     containment: 'map',
//     start: function(evt, ui) {
//       var redIcon = L.icon({iconUrl: ui.helper.attr("src"), iconAnchor: [13, 33], popupAnchor: [0, -30]});
//     },
//     stop: function(evt, ui) {
//       var redIcon = L.icon({iconUrl: ui.helper.attr("src"), iconAnchor: [13, 33], popupAnchor: [0, -30]});

//       // var options = {
//       //   pid: guid(),
//       //   type: ui.helper.attr('type'),
//       //   icon: redIcon,
//       //   draggable: true
//       // };

//       if(model == 'community' || model == 'place' || model == 'resource'){
//         var leftTop = [ui.offset.left - 213, ui.offset.top -479]
//       }else if(model == 'social'){
//         var leftTop = [ui.offset.left - 213, ui.offset.top -499]
//       }else if(model == 'discussion'){
//         var leftTop = [ui.offset.left - 213, ui.offset.top -489]
//       }

//       putMarker(modalMap.containerPointToLatLng(leftTop), options);
//     }
//   });
// }, 2000);

// // $("body").on("keypress", ".entered-location", function(e){
// //   var setValue = $(this).val();
// //   var contentType = $("img#content-type").attr("value");
// //   if(e.which == 13) {
// //     setLocationServices(setValue, contentType);
// //   }
// // });
