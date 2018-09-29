const calculatePower = require('./calculate')

describe('calculatePower', function() {
  it('returns an array', function() {
    expect(calculatePower()).to.be.an('array')
  })
})
