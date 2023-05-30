const { faker } = require("@faker-js/faker");
const { MongoClient } = require("mongodb");

const MONGO_URI = ""; // insert your MongoDB URI here
const client = new MongoClient(MONGO_URI);
const DB_NAME = ""; // insert name of your old database here
const COLLECTION_NAME = ""; // insert name of your old collection here
const database = client.db(DB_NAME);
const collection = database.collection(COLLECTION_NAME);

const run = async () => {
  console.time("time use");

  const insertData = async () => {
    const data = [];
    for (let i = 0; i < 1000; i++) {
      data.push({
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
      });
    }
    await collection.insertMany(data);
    setTimeout(insertData, 1000);
  };

  for (let i = 0; i < 100; i++) {
    await insertData();
  }

  console.timeEnd("time use");
};

run();
