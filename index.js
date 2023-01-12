const { MongoClient } = require("mongodb");
const uri = "";
const client = new MongoClient(uri);

async function run() {
  console.time("TimeTest");

  console.log("sampleDB => users...");
  const databaseOld = await client.db("sampleDB");
  const usersOld = await databaseOld.collection("users");

  console.log("sampleDB2 => users...");
  const databaseNew = await client.db("sampleDB2");
  const usersNew = await databaseNew.collection("users");

  let page;
  let limit = 5000;
  let skip;

  const round = (await usersOld.countDocuments()) / limit;
  const totalRound = Math.ceil(round);
  console.log(`total : ${totalRound} round`);

  for (let index = 1; index <= totalRound; index++) {
    console.log("round", index);

    page = index;
    skip = (page - 1) * limit;

    const resUsersOld = await usersOld.find().limit(limit).skip(skip).toArray();

    const options = { ordered: true };
    await usersNew.insertMany(resUsersOld, options);
  }

  console.timeEnd("TimeTest");
}
run();
