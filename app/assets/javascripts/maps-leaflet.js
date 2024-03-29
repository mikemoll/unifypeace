var leafletMapsView = function(dataContent, latLong, mapLocation){
  latlngbounds = new L.LatLngBounds();
  markers = L.markerClusterGroup();
  style = L.tileLayer.provider('MapBox.rezalina.jdd24no0');
  zoom = L.control.zoom({ position: 'topright' });

  generateMap(latLong);

  if(dataContent.length > 0){
    for (var i = 0; i < dataContent.length; i++) {
      if(dataContent[i][2] === "multi"){
        redIcon = L.icon({ iconUrl: '/assets/markers/multi-icon.png', iconAnchor: [13, 33], popupAnchor: [-3, -20] });
      }else if(dataContent[i][2] === "Meditation / Ceremony / Prayer"){
        redIcon = L.icon({ iconUrl: '/assets/markers/medi-icon.png', className: 'marker-meditation', iconAnchor: [13, 33], popupAnchor: [-3, -20] });
      }else if(dataContent[i][2] === "Music / Dance / Celebration"){
        redIcon = L.icon({ iconUrl: '/assets/markers/musi-icon.png', iconAnchor: [13, 33], popupAnchor: [-3, -20] });
      }else if(dataContent[i][2] === "March / Action"){
        redIcon = L.icon({ iconUrl: '/assets/markers/march-icon.png', iconAnchor: [13, 33], popupAnchor: [-3, -20] });
      }

      var marker = L.marker([parseFloat(dataContent[i][0]), parseFloat(dataContent[i][1])], {icon: redIcon}).bindPopup(dataContent[i][3]).openPopup();

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
  style.addTo(map);
  map.addControl(L.control.zoom({position: 'topright'}));
}

var leafletMapsViewContent = function(eventType, latLongContent){
  var iconUrl = null;
  style = L.tileLayer.provider('MapBox.rezalina.jdd24no0');

  generateMapContent(latLongContent);

  if(eventType === "multi"){
    iconUrl = '/assets/markers/multi-icon.png';
  }else if(eventType === "Meditation / Ceremony / Prayer"){
    iconUrl = '/assets/markers/medi-icon.png';
  }else if(eventType === "Music / Dance / Celebration"){
    iconUrl = '/assets/markers/musi-icon.png';
  }else if(eventType === "March / Action"){
    iconUrl = '/assets/markers/march-icon.png';
  }

  redIcon = L.icon({ iconUrl: iconUrl, iconAnchor: [13, 33], popupAnchor: [0, -30] });

  var marker = L.marker([parseFloat(latLongContent[0]), parseFloat(latLongContent[1])], {icon: redIcon}).addTo(mapContent)
  style.addTo(mapContent);
  mapContent.addControl(L.control.zoom({position: 'topright'}));
}