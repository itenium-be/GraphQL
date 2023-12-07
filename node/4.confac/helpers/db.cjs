const {MongoClient, ObjectId} = require('mongodb');

const MONGO = 'mongodb://admin:pwd@itenium.synology.me:9010/confac-test'

async function connectToDatabase() {
  const opts = {authSource: 'admin', useUnifiedTopology: true};
  try {
    const client = await MongoClient.connect(MONGO, opts)
    console.log('Successfully connected to the database!');
    return client.db();
  } catch (err) {
    console.log(`Could not connect to the database. More info: ${err}`)
  }
}

module.exports = {connectToDatabase, ObjectId}
