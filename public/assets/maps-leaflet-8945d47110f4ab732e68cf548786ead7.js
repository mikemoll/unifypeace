var leafletMapsView=function(n,e,a){if(latlngbounds=new L.LatLngBounds,markers=L.markerClusterGroup(),style=L.tileLayer.provider("MapBox.rezalina.jdd24no0"),generateMap(e),n.length>0){for(var o=0;o<n.length;o++){"multi"===n[o][2]?redIcon=L.icon({iconUrl:"/assets/markers/multi-icon.png",iconAnchor:[13,33],popupAnchor:[-3,-20]}):"Meditation / Ceremony / Prayer"===n[o][2]?redIcon=L.icon({iconUrl:"/assets/markers/medi-icon.png",iconAnchor:[13,33],popupAnchor:[-3,-20]}):"Music / Dance / Celebration"===n[o][2]?redIcon=L.icon({iconUrl:"/assets/markers/musi-icon.png",iconAnchor:[13,33],popupAnchor:[-3,-20]}):"March / Action"===n[o][2]&&(redIcon=L.icon({iconUrl:"/assets/markers/march-icon.png",iconAnchor:[13,33],popupAnchor:[-3,-20]}));var r=L.marker([parseFloat(n[o][0]),parseFloat(n[o][1])],{icon:redIcon}).bindPopup(n[o][3]).openPopup();1===n.length?(latlngbounds.extend([parseFloat(n[o][0])+.1,parseFloat(n[o][1])+.1]),latlngbounds.extend([parseFloat(n[o][0])-.1,parseFloat(n[o][1])-.1])):latlngbounds.extend([parseFloat(n[o][0]),parseFloat(n[o][1])]),markers.addLayer(r)}map.addLayer(markers),map.fitBounds(latlngbounds)}else latlngbounds.extend(e.map(function(n){return n+.1})),latlngbounds.extend(e.map(function(n){return n-.1})),map.fitBounds(latlngbounds);"worldwide"==a&&map.setView(new L.LatLng(0,0),2),style.addTo(map)},leafletMapsViewContent=function(n,e){var a=null;style=L.tileLayer.provider("MapBox.rezalina.jdd24no0"),generateMapContent(e),"multi"===n?a="/assets/markers/multi-icon.png":"Meditation / Ceremony / Prayer"===n?a="/assets/markers/medi-icon.png":"Music / Dance / Celebration"===n?a="/assets/markers/musi-icon.png":"March / Action"===n&&(a="/assets/markers/march-icon.png"),redIcon=L.icon({iconUrl:a,iconAnchor:[13,33],popupAnchor:[0,-30]});L.marker([parseFloat(e[0]),parseFloat(e[1])],{icon:redIcon}).addTo(mapContent);style.addTo(mapContent)};