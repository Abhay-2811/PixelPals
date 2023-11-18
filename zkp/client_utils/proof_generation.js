const snarkjs = require('snarkjs')

async function generate_proof (pixel_location, user_location) {
  const distance = cosineDistanceBetweenPoints(pixel_location, user_location)
  for (let index = 0; index < pixel_location.length; index++) {
    pixel_location[index] = Math.floor(pixel_location[index])
  }
  var input = {
    pixel_location: pixel_location,
    user_distance: Math.floor(distance / 1000)
  }
  console.log(input)
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    input,
    'pixel_inrange_js/pixel_inrange.wasm',
    'circuit_zkey.zkey'
  )
  console.log(proof)
  console.log(publicSignals);
}

//this function returns distance in meters
function cosineDistanceBetweenPoints (pixel_location, user_location) {
  const R = 6371e3
  var lat1 = pixel_location[0]
  var lon1 = pixel_location[1]
  var lat2 = user_location[0]
  var lon2 = user_location[1]
  const p1 = (lat1 * Math.PI) / 180
  const p2 = (lat2 * Math.PI) / 180
  const deltaP = p2 - p1
  const deltaLon = lon2 - lon1
  const deltaLambda = (deltaLon * Math.PI) / 180
  const a =
    Math.sin(deltaP / 2) * Math.sin(deltaP / 2) +
    Math.cos(p1) *
      Math.cos(p2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2)
  const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * R
  return d
}

generate_proof([41.034616, 28.983159], [41.04113, 29.003792])

export default generate_proof;