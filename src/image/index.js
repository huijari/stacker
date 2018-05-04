const Sharp = require('sharp')
const fetch = require('node-fetch')

async function toPng(url) {
  const response = await fetch(url)
  const buffer = await response.arrayBuffer()
  return await Sharp(Buffer.from(buffer))
    .png()
    .withMetadata()
    .toBuffer()
}

module.exports = {
  toPng
}
