const getConnection = require('./connection')

async function createMeta(chatid, packname) {
  const { client, db } = await getConnection()
  await db.collection('meta').insertOne({ packname, chatid })
  client.close()
}
async function getMeta() {
  const { client, db } = await getConnection()
  const meta = await db.collection('meta').findOne({
    packname: { $exists: true }
  })
  client.close()
  return meta
}

module.exports = { createMeta, getMeta }
