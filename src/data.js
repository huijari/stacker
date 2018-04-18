const { MongoClient } = require('mongodb')

const configuration = {
  database: {
    name: process.env['DB_NAME'],
    url: process.env['DB_URL']
  },
  auth: {
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD']
  }
}

async function getConnection() {
  const { database, auth } = configuration
  const client = await MongoClient.connect(
    `mongodb://${database.url}/${database.name}`,
    { auth }
  )
  const db = client.db(database.name)
  return { client, db }
}

async function getMeta() {
  const { client, db } = await getConnection()
  const meta = await db.collection('meta').findOne({
    packname: { $exists: true }
  })
  client.close()
  return meta
}
async function createMeta(chatid, packname) {
  const { client, db } = await getConnection()
  await db.collection('meta').insertOne({ packname, chatid })
  client.close()
}

async function getLastVote(file, user) {
  const { client, db } = await getConnection()
  const sticker = await db.collection('sticker').findOne({ file })
  client.close()
  return sticker && sticker.lastVote[user]
}
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

module.exports = {
  getMeta,
  createMeta,
  getLastVote,
  incrementCounter,
  getOriginal,
  getTop
}
