var leafletMapsView=function(n,e,o){if(latlngbounds=new L.LatLngBounds,markers=L.markerClusterGroup(),generateMap(e),n.length>0){for(var a=0;a<n.length;a++){"multi"===n[a][2]?redIcon=L.icon({iconUrl:"/assets/markers/multi-icon.png",iconAnchor:[13,33],popupAnchor:[-3,-20]}):"Meditation / Ceremony / Prayer"===n[a][2]?redIcon=L.icon({iconUrl:"/assets/markers/medi-icon.png",iconAnchor:[13,33],popupAnchor:[-3,-20]}):"Music / Dance / Celebration"===n[a][2]?redIcon=L.icon({iconUrl:"/assets/markers/musi-icon.png",iconAnchor:[13,33],popupAnchor:[-3,-20]}):"March / Action"===n[a][2]&&(redIcon=L.icon({iconUrl:"/assets/markers/march-icon.png",iconAnchor:[13,33],popupAnchor:[-3,-20]}));var r=L.marker([parseFloat(n[a][0]),parseFloat(n[a][1])],{icon:redIcon}).bindPopup(n[a][3]).openPopup();1===n.length?(latlngbounds.extend([parseFloat(n[a][0])+.1,parseFloat(n[a][1])+.1]),latlngbounds.extend([parseFloat(n[a][0])-.1,parseFloat(n[a][1])-.1])):latlngbounds.extend([parseFloat(n[a][0]),parseFloat(n[a][1])]),markers.addLayer(r)}map.addLayer(markers),map.fitBounds(latlngbounds)}else latlngbounds.extend(e.map(function(n){return n+.1})),latlngbounds.extend(e.map(function(n){return n-.1})),map.fitBounds(latlngbounds);"worldwide"==o&&map.setView(new L.LatLng(0,0),2)},leafletMapsViewContent=function(n,e){var o=null;generateMapContent(e),"multi"===n?o="/assets/markers/multi-icon.png":"Meditation / Ceremony / Prayer"===n?o="/assets/markers/medi-icon.png":"Music / Dance / Celebration"===n?o="/assets/markers/musi-icon.png":"March / Action"===n&&(o="/assets/markers/march-icon.png"),redIcon=L.icon({iconUrl:o,iconAnchor:[13,33],popupAnchor:[0,-30]});L.marker([parseFloat(e[0]),parseFloat(e[1])],{icon:redIcon}).addTo(mapContent)};