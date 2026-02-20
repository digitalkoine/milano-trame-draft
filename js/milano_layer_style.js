/*
  Styling helpers for the Milano Jewish sites layer.
  - Assigns a colour per category.
  - Defines point styling used by the GeoJSON layer.
*/

function siteCategoryPalette(category) {
  // Keep a warm palette, close to the existing project look.
  // Keys are normalised lower-case.
  var cat = (category || '').toLowerCase();

  var palette = {
    "religioso": "#d95f0e",
    "educazione": "#66bd63",
    "associazione": "#74add1",
    "comunitario": "#fe9929",
    "altro": "#ffb6c1"
  };

  return palette[cat] || palette["altro"];
}

function style_sitepoint(feature) {
  var category = feature.properties.category;
  return {
    radius: 7,
    fillColor: siteCategoryPalette(category),
    color: "#FFF",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };
}

// Simple legend helper
function buildMilanoLegend(map) {
  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    var items = [
      { key: "religioso", label: "Religioso" },
      { key: "educazione", label: "Educazione" },
      { key: "associazione", label: "Associazioni" },
      { key: "comunitario", label: "Comunitario" },
      { key: "altro", label: "Altro / non classificato" }
    ];

    div.innerHTML += '<h4>Categoria</h4>';
    for (var i = 0; i < items.length; i++) {
      var c = siteCategoryPalette(items[i].key);
      div.innerHTML +=
        '<div class="legend-row">' +
          '<span class="legend-swatch" style="background:' + c + '"></span>' +
          '<span class="legend-label">' + items[i].label + '</span>' +
        '</div>';
    }
    return div;
  };

  legend.addTo(map);
  return legend;
}
