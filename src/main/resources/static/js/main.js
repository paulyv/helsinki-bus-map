var map;
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
		map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 60.188304, lng: 24.940409},
        styles: mapStyle
    });
}

(function() {

	var getDataModule =  {
		currentBus: '',
		locations: [],
		markers: [],
		init: function() {
			  this.cacheDOM();
			  this.bindEvents();
		},
		updateMarkers: function() {
			var _self = this;
		    for(var i = 0; i < _self.locations.length; i++){
	          var Marker =  new google.maps.Marker({
	                position: {lat: Number(_self.locations[i].lat), lng: Number(_self.locations[i].long)},
	                map: map
	            });
	            _self.markers.push(Marker);
		    }
		},
		clearMarkers: function() {
			var _self = this;
			for(var i = 0; i < _self.markers.length; i++) {
				_self.markers[i].setMap(null);
			}
			_self.markers = [];
		},
		cacheDOM: function() {
			this.$buttonEl = $('#goBtn');
			this.$inputEl = $('#inputField');
			this.$mapEl = $('#map');
		},
		bindEvents: function() {
			var _self = this;
			this.$buttonEl.on('click', function(e) {
				console.log(_self.$inputEl.val());
				_self.currentBus = _self.$inputEl.val();
				_self.updateLocationData();
				e.preventDefault();
			});
			this.$inputEl.on('keydown', function(e) {
				if(e.which == 13) {
					console.log(_self.$inputEl.val());
					_self.currentBus = _self.$inputEl.val();
					_self.updateLocationData();
					e.preventDefault();
				}
			});
		},
		updateLocationData: function() {
			console.log("Update data");
			var _self = this;
			
			$.ajax({
				type: "POST",
				url: '/' + _self.currentBus,
				success: function(result) {
					console.log(result);
					_self.locations = result;
					_self.clearMarkers();
					_self.updateMarkers();
				}
			});
		}
	};
	getDataModule.init();
	
})();
