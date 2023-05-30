# mongodb-mover

This is a JavaScript function that allows you to move a database from a source URL to a destination URL using the MongoDB Node.js driver.

## Installation

Make sure you have the MongoDB Node.js driver installed. You can install it using npm:

```shell
npm install mongodb-mover
```

## Usage

Here's how you can use the `moveDatabase` function:

```javascript
const moveDatabase = require("./moveDatabase");

const sourceUrl = "mongodb://localhost:27017/source";
const destinationUrl = "mongodb://localhost:27017/destination";
const databaseName = "mydatabase";

// Optional: specify the batch size (default: 10000)
const batchSize = 5000;

moveDatabase(sourceUrl, destinationUrl, databaseName, batchSize)
  .then(() => {
    console.log("Database migration completed successfully.");
  })
  .catch((error) => {
    console.error("An error occurred during the database migration:", error);
  });
```

The `moveDatabase` function takes the following parameters:

- `sourceUrl` (string): The URL of the source database.
- `destinationUrl` (string): The URL of the destination database.
- `databaseName` (string): The name of the database to move.
- `batchSize` (optional, number): The number of documents to move at a time. Default: 10000.

The function establishes connections to the source and destination databases using the provided URLs. It retrieves all collections from the source database and copies each collection to the destination database if it doesn't already exist. It retrieves documents from the source collection in batches, inserts them into the destination collection, and repeats the process until all documents are moved.

After the migration is completed or an error occurs, the function closes the database connections.

## License

This project is licensed under the [MIT License](LICENSE).