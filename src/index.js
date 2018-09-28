import mapboxgl from 'mapbox-gl'

//the Mapbox api token is intended to be public so no need to store it in an environmental variable nor prevent it from being uploaded to github.
mapboxgl.accessToken =
  'pk.eyJ1IjoiYWxleGFuZHJhbGVhaCIsImEiOiJjam1sYmY1encwNmsxM2txdG5tMXg0OWt3In0.dbHRfo-b-M_fPlTcazMi5g'

const map = new mapboxgl.Map({
  container: 'map',
  center: [-71.08, 42.381], // FullStack NY coordinates; alternatively, use [-87.6354, 41.8885] for Chicago
  zoom: 12, // starting zoom
  style: 'mapbox://styles/mapbox/satellite-streets-v9' // mapbox has lots of different map styles available.
})
