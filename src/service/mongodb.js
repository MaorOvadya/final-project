const { MongoClient, ObjectId } = require('mongodb')

const URL = process.env.MONGO_URL, dbName = process.env.MONGO_DB_NAME

const mongoConnect = async () => {
    const dbo = await MongoClient.connect(URL)

    //check if db exists
    const dbList = await dbo.db().admin().listDatabases()
    const dbExists = dbList.databases.find(db => db.name === dbName)
    if (!dbExists) {
        //seed the db
        const books = [
            {title: "The Accursed God",author: "Vivek Dutta Mishra",comments: "A great read"},
            {title: "The Count of Monte Cristo",author: "Alexandre Dumas",comments: "A classic"},
            {title: "The Fountainhead",author: "Ayn Rand",comments: "Ayn Rand's best"},
        ]

        await dbo.db(dbName).collection("books").insertMany(books)
    }

    console.log(`Connected to ${dbName}!`)
    return await dbo.db(dbName)
}

module.exports = { mongoConnect, ObjectId }