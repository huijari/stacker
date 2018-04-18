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

module.exports = getConnection
