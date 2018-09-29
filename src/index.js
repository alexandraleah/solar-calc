//consider splitting this into different files as appropriate
//import styles
import './scss/styles.scss'
import mapboxgl from 'mapbox-gl'
import area from '@turf/area'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import MapboxDraw from '@mapbox/mapbox-gl-draw'

//the Mapbox api token is intended to be public so no need to store it in an environmental variable nor prevent it from being uploaded to github.
mapboxgl.accessToken =
  'pk.eyJ1IjoiYWxleGFuZHJhbGVhaCIsImEiOiJjam1sYmY1encwNmsxM2txdG5tMXg0OWt3In0.dbHRfo-b-M_fPlTcazMi5g'

const map = new mapboxgl.Map({
  container: 'map',
  center: [-71.1111, 42.3243],
  zoom: 19, // starting zoom
  style: 'mapbox://styles/mapbox/satellite-streets-v9' // chose the satellite street style to allow users to view the roofs while also seeing street names for context
})

//adds navigation tools
map.addControl(new mapboxgl.NavigationControl())

//when it searches need to have a way to zoom in closer in on the address and maybe highlight which one it is
//uses Mapbox geocoder to add a search bar and search for an address
//documentation and example here https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder/

let geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  zoom: 19 //defines zoom after search is complete
})
document.getElementById('geocoder').appendChild(geocoder.onAdd(map))

// use geocoder promximity in order to bias results to where the maps is currently focused
//based on mapbox documentation here https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder-proximity-bias/
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

//Mapbox draw create a simple user interface to draw polygons (in this case) on the map.
//tutorial here https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-draw/
const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true
  }
})

document.getElementById('draw').appendChild(draw.onAdd(map))

map.on('draw.create', updateArea)
map.on('draw.delete', updateArea)
map.on('draw.update', updateArea)

//According to pickmysolar.com the average efficiency of solar panels falls between the 15% to 18% efficiency range. This calculator uses at 15% efficiency rate to generate a conservative estimate
//A solar panel with a 15% efficiency rate would produce 150 watts per square meter under standard test conditions
//rewrite this formula as the app devleops to make it make more sense for this context

let clearButton = document.getElementsByClassName('clearBtn')
let resetBtn = document.getElementById('resetBtn')
let panelOne = document.getElementById('panelOne')
let panelTwo = document.getElementById('panelTwo')

clearButton.addEventListener('click', function() {
  draw.deleteAll()
})

function updateArea(e) {
  let data = draw.getAll()
  if (data.features.length > 0) {
    //use turf area to calculate the area of the polygon in square meters and round down to the nearest meter
    //I chose to round down to the nearest square meter because typical residential solar panels roughly 1.6 square meters
    let caclualatedArea = Math.round(area(data))
    //calculate the nominal power assuming 150 Watts per meter and round to the nearest watt and convert to kW
    let nominalPower = Math.round(caclualatedArea * 150) / 1000
    panelOne.style.display = 'none'
    panelTwo.style.display = 'block'

    let answer = document.getElementById('stats')
    answer.innerHTML =
      '<p><span id="power">Nominal power: &nbsp;' +
      nominalPower +
      ' kW </span>Area Selected: &nbsp;' +
      caclualatedArea +
      ' square meters </p>'
  }
}

function reset() {
  panelOne.style.display = 'block'
  panelTwo.style.display = 'none'
  draw.deleteAll()
  nominalPower = 0
  caclualatedArea = 0
}

resetBtn.addEventListener('click', reset)

let calculateBtn = document.getElementById('calculateBtn')

calculateBtn.addEventListener('click', displayPower)
