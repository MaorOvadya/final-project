const { MongoClient, ObjectId } = require("mongodb");

const URL = process.env.MONGO_URL,
  dbName = process.env.MONGO_DB_NAME;

const mongoConnect = async () => {
  const dbo = await MongoClient.connect(URL);

  //check if db exists
  const dbList = await dbo.db().admin().listDatabases();
  const dbExists = dbList.databases.find((db) => db.name === dbName);
  if (!dbExists) {
    //seed the db
    // const recipes = [
    //   {
    //     recipe: "The Accursed God",
    //     ingredients: "Vivek Dutta Mishra",
    //     preparation: "A great read",
    //   },
    //   {
    //     recipe: "The Count of Monte Cristo",
    //     ingredients: "Alexandre Dumas",
    //     preparation: "A classic",
    //   },
    //   {
    //     recipe: "The Fountainhead",
    //     ingredients: "Ayn Rand",
    //     preparation: "Ayn Rand's best",
    //   },
    // ];

    await dbo.db(dbName).collection("recipes").insertMany(recipes);
  }

  console.log(`Connected to database ${dbName}!`);
  return await dbo.db(dbName);
};

module.exports = { mongoConnect, ObjectId };
