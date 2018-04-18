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
    {
      auth
    }
  )
	const db = client.db(database.name)
  return { client, db }
}

async function getPackname() {
  const { client, db } = await getConnection()
  const document = await db.collection('meta').findOne({
    packname: { $exists: true }
  })
	client.close()
  return document.packname
}
async function createPackname(packname) {
	const { client, db } = await getConnection()
	await db.collection('meta').insertOne({ packname })
	client.close()
}

module.exports = {}
