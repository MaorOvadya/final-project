const { mongoConnect, ObjectId } = require("../service/mongodb");
const db = mongoConnect();

module.exports = class Recipe {
  constructor(recipe, ingredients, preparation, image) {
    this.recipe = recipe;
    this.ingredients = ingredients;
    this.preparation = preparation;
    this.image = image;
  }

  async save() {
    return (await db).collection("recipes").insertOne(this);
  }

  static async find() {
    return (await db).collection("recipes").find().toArray();
  }

  static async findById(id) {
    return (await db)
      .collection("recipes")
      .find({ _id: new ObjectId(id) })
      .toArray();
  }
  // update
  static async updateOne(data) {
    return (await db).collection("recipes").updateOne(
      { _id: new ObjectId(data.id) }, //filter
      {
        $set: {
          recipe: data.recipe,
          ingredients: data.ingredients,
          preparation: data.preparation,
          image: data.image,
        },
      }
    );
  }
  // delete
  static async deleteOne(id) {
    return (await db)
      .collection("recipes")
      .deleteOne({ _id: new ObjectId(id) });
  }
};
