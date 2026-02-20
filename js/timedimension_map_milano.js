/*
  Map bootstrap for TRAME — Milano ebraica nel tempo

  Responsibilities:
  - Create the Leaflet map centered on Milan.
  - Enable Leaflet.TimeDimension and configure the time interval (years).
  - Add base tiles and common controls (scale, coordinates).
  - Create the TimeDimension control and expose a stable reference for autoplay.
*/

function createAndSetUpMapMilano(start_date, end_date) {
  var timeInterval = `${start_date}/${end_date}`;
  // Create the map with TimeDimension enabled, but instantiate the control manually
  // so we always have a reliable reference to the player (needed for autoplay).
  var map = L.map('map',  {
    center: [45.4642, 9.1900], // Milano
    zoom: 12,
    preferCanvas: false,
    timeDimension: true,
    timeDimensionOptions: {
      timeInterval: timeInterval,
      period: "P1Y",
      currentTime: Date.parse(start_date),
    },
    timeDimensionControl: false
  });

  // TimeDimension player + control (bottom-left)
// We create the player explicitly so autoplay is always reliable.
var tdPlayer = new L.TimeDimension.Player({
  transitionTime: 400,
  loop: true,
  startOver: true
}, map.timeDimension);

var tdControl = L.control.timeDimension({
  position: 'bottomleft',
  loopButton: true,
  displayDate: false,
  autoPlay: false, // we start it ourselves after the map is ready
  minSpeed: 2,
  maxSpeed: 50,
  limitSliders: true,
  timeSliderDragUpdate: true,
  player: tdPlayer
}).addTo(map);

// Keep stable references for autoplay.
map._tdControl = tdControl;
map._tdPlayer = tdPlayer;

  L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{
      minZoom: 0,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }
  ).addTo(map);

  var coordinatesControl = new L.control.coordinates({
    // Keep bottom-left free for the time slider
    position:"bottomright",
    decimals:5,
    decimalSeperator:",",
    labelTemplateLat:  "Lat: {y}",
    labelTemplateLng:  "Lon: {x}"
  });
  coordinatesControl.addTo(map);

  // Keep bottom-left free for the time slider
  var currentTime = L.control({position: 'bottomright'});
  map.timeDimension.on('timeload', function() {
    var getcurrentTime = map.timeDimension.getCurrentTime();
    var dateCurrentTime = new Date(getcurrentTime);
    var options = { year: 'numeric' };
    var year = dateCurrentTime.toLocaleDateString('it-IT', options);

    currentTime.onAdd = function (){
      var div = L.DomUtil.create('div', 'yearbox');
      div.innerHTML += '<h1>' + year + '</h1>';
      return div;
    };
    currentTime.addTo(map);
  });

  return map;
}
