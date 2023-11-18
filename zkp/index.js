const express = require('express')
const cors = require('cors')
const snarkjs = require('snarkjs')

const app = express()

app.use(cors())

app.use(express.json())

const PORT = process.env.PORT || 8000

app.listen(PORT, async () => {
  console.log('Listening at PORT: ', PORT)
})

// locations are array with [long,lat]
app.post('/gen_proof', async (req, res) => {
  try {
    const _proof = await generate_proof(req.body.pixel_loc, req.body.user_loc)
    res.status(200).json({ proof: _proof })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

async function generate_proof (pixel_location, user_location) {
  const distance = cosineDistanceBetweenPoints(pixel_location, user_location)
  for (let index = 0; index < pixel_location.length; index++) {
    pixel_location[index] = Math.floor(pixel_location[index])
  }
  var input = {
    pixel_location: pixel_location,
    user_distance: Math.floor(distance / 1000)
  }
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    input,
    'pixel_inrange_js/pixel_inrange.wasm',
    'circuit_zkey.zkey'
  )
  return proof
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
