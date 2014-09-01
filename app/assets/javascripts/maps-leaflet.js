var leafletMapsView = function(dataContent, latLong, mapLocation){
  latlngbounds = new L.LatLngBounds();
  markers = L.markerClusterGroup();
  generateMap(latLong);

  if(dataContent.length > 0){
    for (var i = 0; i < dataContent.length; i++) {
      console.log(dataContent[i][2])
      if(dataContent[i][2] === "multi"){
        redIcon = L.icon({ iconUrl: '/assets/markers/multi-icon.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
      }else if(dataContent[i][2] === "meditation/prayer"){
        redIcon = L.icon({ iconUrl: '/assets/markers/medi-icon.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
      }else if(dataContent[i][2] === "music/celebration"){
        redIcon = L.icon({ iconUrl: '/assets/markers/musi-icon.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
      }else if(dataContent[i][2] === "march/action"){
        redIcon = L.icon({ iconUrl: '/assets/march-icon.png', iconAnchor: [13, 33], popupAnchor: [0, -30] });
      }

      var marker = L.marker([parseFloat(dataContent[i][0]), parseFloat(dataContent[i][1])], {icon: redIcon})
        .bindPopup(dataContent[i][3]).openPopup();

      if(dataContent.length === 1){
        latlngbounds.extend([parseFloat(dataContent[i][0]) + 0.1, parseFloat(dataContent[i][1]) + 0.1]);
        latlngbounds.extend([parseFloat(dataContent[i][0]) - 0.1, parseFloat(dataContent[i][1]) - 0.1]);
      }else{
        latlngbounds.extend([parseFloat(dataContent[i][0]), parseFloat(dataContent[i][1])]);
      }

      markers.addLayer(marker);
    }

    map.addLayer(markers);
    map.fitBounds(latlngbounds);
  }else{
    latlngbounds.extend(latLong.map(function(el){ return el + 0.1; }));
    latlngbounds.extend(latLong.map(function(el){ return el - 0.1; }));
    map.fitBounds(latlngbounds);
  }

  if(mapLocation == "worldwide"){
    map.setView(new L.LatLng(0, 0),2);
  }
}

var leafletMapsViewContent = function(contentType, latLongContent){
  var iconUrl = null;
  generateMapContent(latLongContent);

  if(contentType === "Project"){
    iconUrl = '/assets/markers/tree.png';
  }else if(contentType === "Idea"){
    iconUrl = '/assets/markers/idea.png';
  }else if(contentType === "Picture"){
    iconUrl = '/assets/media-image-marker.png';
  }else if(contentType === "Video"){
    iconUrl = '/assets/markers/video.png';
  }else if(contentType === "Music"){
    iconUrl = '/assets/media-music-marker.png';
  }else if(contentType === "Text"){
    iconUrl = '/assets/media-texts-marker.png';
  }else if(contentType === "Web"){
    iconUrl = '/assets/media-link-marker.png';
  }else if(contentType === "Need"){
    iconUrl = '/assets/markers/pie.png';
  }else if(contentType === "Offer"){
    iconUrl = '/assets/markers/gift.png';
  }else if(contentType === "Place"){
    iconUrl = '/assets/markers/place.png';
  }else if(contentType === "Event"){
    iconUrl = '/assets/markers/calendar.png';
  }else if(contentType === "Question"){
    iconUrl = '/assets/markers/question.png';
  }else{
    iconUrl = '/assets/media-texts-marker.png';
  }

  redIcon = L.icon({ iconUrl: iconUrl, iconAnchor: [13, 33], popupAnchor: [0, -30] });

  var marker = L.marker([parseFloat(latLongContent[0]), parseFloat(latLongContent[1])], {icon: redIcon}).addTo(mapContent)
}