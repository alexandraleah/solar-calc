//creates the map

//import mapbox libraries
import mapboxgl from 'mapbox-gl'
import {mapBoxToken} from './tokens'

//set access token
mapboxgl.accessToken = mapBoxToken

//creates the Map box map and attaches it to the div with id 'map'
const map = new mapboxgl.Map({
  container: 'map',
  center: [-71.1111, 42.3243],
  zoom: 19, // starting zoom
  style: 'mapbox://styles/mapbox/satellite-streets-v9' // chose the satellite street style to allow users to view the roofs while also seeing street names for context
})

//adds navigation tools to the map
map.addControl(new mapboxgl.NavigationControl())

export default map //exports the map for use in other files
