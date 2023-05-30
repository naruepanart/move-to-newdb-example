const moveDatabase = require("./moveDatabase");

const sourceUrl = ""; // mongodb://localhost:27017
const destinationUrl = ""; // mongodb://localhost:27018
const databaseName = ""; // sampledatabase

moveDatabase(sourceUrl, destinationUrl, databaseName, 10000)
  .then(() => {
    console.log("Database migration completed successfully.");
  })
  .catch((error) => {
    console.error("An error occurred during the database migration:", error);
  });
