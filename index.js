const { MongoClient } = require("mongodb");
const uri = "";
const client = new MongoClient(uri);

async function run() {
  console.time("time use");

  const oldDatabase = await client.db("sample-1");
  const oldCollection = await oldDatabase.collection("users");

  const newDatabase = await client.db("sample-2");
  const newCollection = await newDatabase.collection("users");

  let page;
  let limit = 5000;
  let skip;

  const count = await oldCollection.countDocuments();
  const totalRound = Math.ceil(count / limit);
  console.log(`total : ${totalRound} round`);

  for (let index = 1; index <= totalRound; index++) {
    console.log("round", index);

    page = index;
    skip = (page - 1) * limit;

    const resoldCollection = await oldCollection
      .find()
      .limit(limit)
      .skip(skip)
      .toArray();

    const options = { ordered: true };
    await newCollection.insertMany(resoldCollection, options);

    // Wait for 1 minute before processing the next chunk
    // await new Promise((resolve) => setTimeout(resolve, 60000));
  }

  console.timeEnd("time use");
}
run();
