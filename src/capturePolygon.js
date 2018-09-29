//draw polygon and display statistics

//draw tools to draw polygon
import MapboxDraw from '@mapbox/mapbox-gl-draw' //this library allows drawing
import map from './map'
import calculate from './calculate'

//get elements by ID from DOM
let clearButton = document.getElementById('clearBtn')
let resetBtn = document.getElementById('resetBtn')
let panelOne = document.getElementById('panelOne')
let panelTwo = document.getElementById('panelTwo')
let drawTools = document.getElementById('draw')

//Mapbox draw create a simple user interface to draw polygons (in this case) on the map.
//tutorial here https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-draw/
const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true
  }
})

//appends the draw tool to the element with id 'draw' in the panel
drawTools.appendChild(draw.onAdd(map))

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

//calls displayStats function on draw, delete and update
map.on('draw.create', displayStats)
map.on('draw.delete', displayStats)
map.on('draw.update', displayStats)

//calculates area and displays stats
function displayStats() {
  //gets data from polygon
  let data = draw.getAll()
  //only calculates and displays stats if length is greater than 0.
  if (data.features.length > 0) {
    //calculates the statistics using the imported function
    let stats = calculate(data)
    //hides the toolbar panel
    panelOne.style.display = 'none'
    //displays the stats panel
    panelTwo.style.display = 'block'

    //displays the statistics in the panel
    let statsDisplay = document.getElementById('stats')
    statsDisplay.innerHTML =
      '<h4>Nominal power: &nbsp;' +
      stats.power +
      ' kW </h4><p>Area Selected: &nbsp;' +
      stats.caclualatedArea +
      ' square meters </p>'
  }
}
