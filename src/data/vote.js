const getConnection = require('./connection')

async function incrementCounter(file, user) {
  const { client, db } = await getConnection()
  await db.collection('sticker').updateOne(
    { file },
    {
      $set: { lastVote: { [user]: new Date() } },
      $inc: { counter: 1 }
    },
    { upsert: true }
  )
  client.close()
}
async function getLastVote(file, user) {
  const { client, db } = await getConnection()
  const sticker = await db.collection('sticker').findOne({ file })
  client.close()
  return sticker && sticker.lastVote[user]
}

module.exports = { incrementCounter, getLastVote }
