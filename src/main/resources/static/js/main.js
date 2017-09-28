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
		busDataPool: [],
		busNamePool: [],
		markers: [],
		interval: null,
		init: function() {
			  this.cacheDOM();
			  this.bindEvents();
		},
		updateMarkers: function() {
			var _self = this;
		    for(var i = 0; i < _self.busDataPool.length; i++){
	          var Marker =  new google.maps.Marker({
	                position: {lat: Number(_self.busDataPool[i].lat), lng: Number(_self.busDataPool[i].long)},
	                label: _self.busDataPool[i].desi,
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
			this.$addBtnEl = $('#addBtn');
			this.$busInputEl = $('#addBus');
			this.$busListEl = $('#busList');
			this.$mapEl = $('#map');
		},
		bindEvents: function() {
			var _self = this;

			this.$addBtnEl.on('click', function(e) {
				var bus = _self.$busInputEl.val();
				_self.$busListEl.append('<div class="alert alert-primary busItem"><i class="material-icons">directions_bus</i>'+bus+'<i class="material-icons" style="float: right;">close</i></div>');
				_self.busNamePool.push(bus);
				_self.$busInputEl.val('');
				clearInterval(_self.interval);
				_self.interval = setInterval(function() {
					console.log("update");
					_self.updateLocationData();
				}, 5000);
			});
			
			this.$busListEl.on('click','.busItem', function(e) {
				var busNum = $(this).text();
				$(this).remove();

				var index = _self.busNamePool.indexOf(busNum);
				if (index !== -1) {
				    _self.busNamePool.splice(index, 1);
				}
				if(_self.busNamePool.length < 1) {
					clearInterval(_self.interval);
				}
				_self.updateLocationData();
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
				data: JSON.stringify(_self.busNamePool),
				success: function(result) {
					console.log(result);
					_self.busDataPool = result;
					_self.clearMarkers();
					_self.updateMarkers();
				}
			});
		}
	};
	
	getDataModule.init();
	
})();
