var mapStyle = [
    {
        "stylers": [
            {
                "hue": "#2c3e50"
            },
            {
                "saturation": 250
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 50
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];

  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 60.188304, lng: 24.940409},
        styles: mapStyle
      });
    
    if(message !== null) {
	    for(var i = 0; i < message.length; i++){
	    	new google.maps.Marker({
	    		position: {lat: Number(message[i].lat), lng: Number(message[i].lon)},
	    		map: map
	    	});
	    }
    }
  }