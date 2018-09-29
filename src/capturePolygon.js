//tools to draw polygon and capture its data
//draw tools to draw polygon
import MapboxDraw from '@mapbox/mapbox-gl-draw' //this library allows drawing
import map from './map'

//get elements by ID from DOM
let clearButton = document.getElementById('clearBtn')
let resetBtn = document.getElementById('resetBtn')
let panelOne = document.getElementById('panelOne')
let panelTwo = document.getElementById('panelTwo')

//Mapbox draw create a simple user interface to draw polygons (in this case) on the map.
//tutorial here https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-draw/
const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true
  }
})

//move this document.getElementById with the rest for clarity
//appends the draw tool to the element with id 'draw' in the panel
document.getElementById('draw').appendChild(draw.onAdd(map))

//deletes all polygons when user selects clear button on panel one
clearButton.addEventListener('click', function() {
  draw.deleteAll()
})

//resets the tools: hides panel two, displays panel one, and deletes all polygons
function reset() {
  panelTwo.style.display = 'none'
  panelOne.style.display = 'block'
  draw.deleteAll()
}

//attaches the reset function to the reset button
resetBtn.addEventListener('click', reset)

//updates area draw, delete and update
map.on('draw.create', captureArea)
map.on('draw.delete', captureArea)
map.on('draw.update', captureArea)
//fix this so functional
let data
function captureArea() {
  data = draw.getAll()
}
export default data
//exports data for use in calculate module
