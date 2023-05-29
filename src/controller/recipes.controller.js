const Recipe = require("../model/recipe");

exports.getAllRecipes = (req, res) => {
  Recipe.find()
    .then((rows) => {
      res.render("recipes", { model: rows });
    })
    .catch((err) => console.error(err.message));
};

exports.getCreateRecipe = (req, res) => {
  res.render("create", { model: {} });
};

exports.postCreateRecipe = (req, res) => {
  const { recipe, ingredients, preparation, image } = req.body;

  const newRecipe = new Recipe(recipe, ingredients, preparation, image);
  newRecipe
    .save()
    .then(() => {
      res.redirect("/recipes/all");
    })
    .catch((err) => console.error(err.message));
};

exports.getEditRecipeById = (req, res) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then((rows) => {
      res.render("edit", { model: rows[0] });
    })
    .catch((err) => console.error(err.message));
};

exports.postEditRecipeById = (req, res) => {
  const id = req.params.id;
  const { recipe, ingredients, preparation, image } = req.body;

  const dataToUpdate = { id, recipe, ingredients, preparation, image };

  Recipe.updateOne(dataToUpdate)
    .then(() => {
      res.redirect("/recipes/all");
    })
    .catch((err) => console.error(err.message));
};

exports.deleteRecipe = (req, res) => {
  const id = req.params.id;

  Recipe.deleteOne(id)
    .then(() => {
      res.redirect("/recipes/all");
    })
    .catch((err) => console.error(err));
};
