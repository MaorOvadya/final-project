// const db = require("../service/sqlite");
// const db = require("../service/mysql")
// const db = require("../service/postgres")

const { mongoConnect, ObjectId } = require("../service/mongodb")
const db = mongoConnect()

module.exports = class Book {
  constructor(title, author, comments) {
    this.title = title;
    this.author = author;
    this.comments = comments;
  }

  async save() {
    return (await db).collection("books").insertOne(this)
  }

  static async find() {
    return (await db).collection("books").find().toArray()
  }

  static async findById(id) {
    return (await db).collection("books").find({ _id: new ObjectId(id) }).toArray()
  }

  static async updateOne(data) {
    return (await db).collection("books").updateOne(
      { _id: new ObjectId(data.id) }, //filter
      { $set: { title: data.title, author: data.author, comments: data.comments } }) //update
  }

  static async deleteOne(id) {
    return (await db).collection("books").deleteOne({ _id: new ObjectId(id) })
  }
};


//Schema ---> Table ----> Row
//Schema/DB ---> Collection ----> Document