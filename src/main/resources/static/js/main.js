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
		busPool: [],
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
	            this.markers.push(Marker);
		    }
		},
		clearMarkers: function() {
			var _self = this;
			for(var i = 0; i < _self.markers.length; i++) {
				_self.markers[i].setMap(null);
			}
			this.markers = [];
		},
		cacheDOM: function() {
			this.$buttonEl = $('#goBtn');
			this.$addBtnEl = $('#addBtn');
			this.$inputEl = $('#inputField');
			this.$busInputEl = $('#addBus');
			this.$busListEl = $('#busList');
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
			this.$addBtnEl.on('click', function(e) {
				var bus = _self.$busInputEl.val();
				_self.$busListEl.append('<span class="badge badge-pill badge-primary busItem">'+bus+'</span>');
				_self.busPool.push(bus);
				_self.$busInputEl.val('');
			});
			
			this.$busListEl.on('click','.busItem', function(e) {
				var busNum = $(this).text();
				$(this).remove();

				var index = _self.busPool.indexOf(busNum);
				if (index !== -1) {
				    _self.busPool.splice(index, 1);
				}
			});
			
		},
		updateLocationData: function() {
			console.log("Update data");
			var _self = this;
			
			$.ajax({
				type: "POST",
				url: '/',
				contentType: "application/json; charset=utf-8",
		        dataType: "json",
				data: JSON.stringify(_self.busPool),
				success: function(result) {
					console.log(result);
					_self.locations = result;
					_self.clearMarkers();
					_self.updateMarkers();
				}
			});
		},
		
		addBusToPool: function() {
			
		}
	};
	getDataModule.init();
	
})();
