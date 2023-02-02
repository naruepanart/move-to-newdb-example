const { faker } = require("@faker-js/faker");
const { MongoClient } = require("mongodb");
const uri = "";
const client = new MongoClient(uri);

const runnn = async () => {
  console.time("time use");

  const oldDatabase = await client.db("sample-1");
  const oldCollection = await oldDatabase.collection("users");

  for (let index = 0; index < 100; index++) {
    setInterval(() => {
      const data = {
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
      };
      oldCollection.insertOne(data);
    }, 10000);
  }

  console.timeEnd("time use");
};

runnn();
