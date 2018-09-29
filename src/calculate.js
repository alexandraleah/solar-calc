//calculates area from polygon using Turf's area library and calculates nominal power
import area from '@turf/area' //this is used to calculate the area of the polygon
import polygonData from './capturePolygon'

//get elements by ID from DOM
let panelOne = document.getElementById('panelOne')
let panelTwo = document.getElementById('panelTwo')

// //fix this function should be returning something
// let nominalPower
// function updateArea() {
//   //gets all the data points from the drawing
//   //calculates only if the length is greater than  zero
//   if (data.features.length > 0) {
//     let caclualatedArea = Math.round(area(data)) //uses turf area to calculate area of the polygon and round to nearest meter
//     //calculate the nominal power assuming 150 Watts per meter, round to the nearest watt and convert to kW
//     nominalPower = Math.round(caclualatedArea * 150) / 1000
//   }
// }
// export {nominalPower}

// //calculates and displays the nominal power

// //calculate area and nominal power

// //According to pickmysolar.com the average efficiency of solar panels falls between the 15% to 18% efficiency range. This calculator uses a 15% efficiency rate to generate a conservative estimate
// //A solar panel with a 15% efficiency rate would produce 150 watts per square meter under standard test conditions (nominal power)

// //calculates and displays nominal power

// //hides the toolbar panel
// panelOne.style.display = 'none'
// //displays the stats panel
// panelTwo.style.display = 'block'

// //displays the statistics in the panel
// let stats = document.getElementById('stats')
// stats.innerHTML =
//   '<p><span id="power">Nominal power: &nbsp;' +
//   nominalPower +
//   ' kW </span>Area Selected: &nbsp;' +
//   caclualatedArea +
//   ' square meters </p>'
