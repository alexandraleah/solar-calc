//calculates area from polygon using Turf's area library and calculates nominal power
import area from '@turf/area' //this is used to calculate the area of the polygon

//exports the function for use in the capturePolygon module
export default function calculatePower(data) {
  //calculates only if the length is greater than  zero
  let calculatedArea = Math.round(area(data)) //uses turf area to calculate area of the polygon and round to nearest meter
  //calculate the nominal power assuming 150 Watts per meter, round to the nearest watt and convert to kW
  let power = Math.round(calculatedArea * 150) / 1000
  return {calculatedArea, power}
}
