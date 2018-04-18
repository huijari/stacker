const getConnection = require('./connection')

async function getOriginal(file) {
  const { client, db } = await getConnection()
  const sticker = await db.collection('sticker').findOne({ file })
  db.close()
  if (sticker.original) return sticker.original
  return file
}
async function getTop() {
  const amount = 15
  const { client, db } = await getConnection()
  const stickers = await db
    .collection('sticker')
    .aggregate([{ $sort: { counter: -1 } }, { $limit: amount }])
    .toArray()
  client.close()
  return stickers
}

module.exports = { getOriginal, getTop }
