const calculatePower = require('./calculate')
const {expect} = require('chai')
let calculate = calculatePower.calculatePower

const data = [[125, -15], [113, -22], [154, -27], [144, -15], [125, -15]]

describe('calculatePower', function() {
  it('is a function', function() {
    expect(calculate).to.be.an('function')
  })
  it('returns an object', function() {
    expect(calculate(data)).to.be.an('object')
  })
  it('calculates the area', function() {
    expect(calculate(data).calculatedArea).to.be.an('integer')
  })
})
