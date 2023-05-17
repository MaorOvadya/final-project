// const db = require("../util/sqlite");
const db = require("../util/mysql")

module.exports = class Book {
  constructor(Title, Author, Comments) {
    this.Title = Title;
    this.Author = Author;
    this.Comments = Comments;
  }

  save() {
    const sql = "INSERT INTO Books (Title, Author, Comments) VALUES (?, ?, ?)";
    const params = [this.Title, this.Author, this.Comments];
    return db.execute(sql, params)
  }

  static find() {
    const sql = "SELECT * FROM Books ORDER BY Book_ID DESC";
    return db.query(sql)
  }

  static findById(id) {
    const sql = "SELECT * FROM Books WHERE Book_ID = ?";
    return db.execute(sql, [id])
  }

  static updateOne(data) {
    const sql =
      "UPDATE Books SET Title = ?, Author = ?, Comments = ? WHERE (Book_ID = ?)";
    const params = [data.Title, data.Author, data.Comments, data.id];
    return db.execute(sql, params)
  }

  static deleteOne(id) {
    const sql = "DELETE FROM Books WHERE Book_ID = ?";
    return db.execute(sql, [id])
  }
};
