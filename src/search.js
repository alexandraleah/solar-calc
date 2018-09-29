//Mapbox search tools for the panel

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder' //this library allows searching
import map from './map'
import {mapBoxToken} from './tokens'

//Mapbox geocoder enables search
//documentation and example at https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder/
let geocoder = new MapboxGeocoder({
  accessToken: mapBoxToken,
  zoom: 19 //defines zoom after search is complete
})

//attach the geocoder to the element with id 'geocoder' inside the panel
document.getElementById('geocoder').appendChild(geocoder.onAdd(map))

// use geocoder promximity to bias results to where the maps is currently focused
//based on mapbox documentation at https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder-proximity-bias/
map.on('load', updateGeocoderProximity) // set proximity on map load
map.on('moveend', updateGeocoderProximity) // and then update proximity each time the map moves

function updateGeocoderProximity() {
  // proximity is designed for local scale, if the user is looking at the whole world,
  // it doesn't make sense to factor in the arbitrary centre of the map
  if (map.getZoom() > 9) {
    var center = map.getCenter().wrap() // ensures the longitude falls within -180 to 180 as the Geocoding API doesn't accept values outside this range
    geocoder.setProximity({longitude: center.lng, latitude: center.lat})
  } else {
    geocoder.setProximity(null)
  }
}
