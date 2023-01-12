const { faker } = require("@faker-js/faker");
const { MongoClient } = require("mongodb");
const uri = "";
const client = new MongoClient(uri);

const runnn = async () => {
  console.time("TimeTest");

  console.log("sampleDB => users...");
  const sampleDB = client.db("sampleDB");
  const usersCol = sampleDB.collection("users");

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
      usersCol.insertOne(data);
    }, 1000);
  }

  console.timeEnd("TimeTest");
};

runnn();
