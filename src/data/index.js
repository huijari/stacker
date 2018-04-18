const { createMeta, getMeta } = require('./meta')
const { getOriginal, getTop } = require('./sticker')
const { incrementCounter, getLastVote } = require('./vote')

module.exports = {
  getMeta,
  createMeta,
  getLastVote,
  incrementCounter,
  getOriginal,
  getTop
}
