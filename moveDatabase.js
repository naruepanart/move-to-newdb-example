const { MongoClient } = require("mongodb");

/**
 * Moves a database from a source URL to a destination URL.
 *
 * @param {string} sourceUrl - The URL of the source database.
 * @param {string} destinationUrl - The URL of the destination database.
 * @param {string} databaseName - The name of the database to move.
 * @param {number} [batchSize=10000] - The number of documents to move at a time.
 */
async function moveDatabase(
  sourceUrl,
  destinationUrl,
  databaseName,
  batchSize = 10000
) {
  const sourceClient = new MongoClient(sourceUrl, { useUnifiedTopology: true });
  const destinationClient = new MongoClient(destinationUrl, {
    useUnifiedTopology: true,
  });

  try {
    await sourceClient.connect();
    const sourceDb = sourceClient.db(databaseName);

    await destinationClient.connect();
    const destinationDb = destinationClient.db(databaseName);

    const collections = await sourceDb.collections();

    for (const collection of collections) {
      const collectionName = collection.collectionName;
      const sourceCollection = sourceDb.collection(collectionName);
      const destinationCollection = destinationDb.collection(collectionName);

      const destinationCollectionExists =
        (await destinationCollection.countDocuments()) > 0;
      if (destinationCollectionExists) {
        continue;
      }

      let skip = 0;
      let documentsProcessed = 0;

      while (true) {
        const documents = await sourceCollection
          .find({})
          .skip(skip)
          .limit(batchSize)
          .toArray();
        if (documents.length === 0) {
          break;
        }

        await destinationCollection.insertMany(documents);

        skip += batchSize;
        documentsProcessed += documents.length;
      }
    }
  } catch (error) {
    console.error("An error occurred during the database migration:", error);
  } finally {
    await sourceClient.close();
    await destinationClient.close();
  }
}

module.exports = moveDatabase;
