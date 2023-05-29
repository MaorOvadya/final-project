const router = require("express").Router();

const {
  getAllRecipes,
  getCreateRecipe,
  postCreateRecipe,
  getEditRecipeById,
  postEditRecipeById,
  deleteRecipe,
} = require("../controller/recipes.controller");

router.get("/all", getAllRecipes);
router.route("/create").get(getCreateRecipe).post(postCreateRecipe);
router.route("/edit/:id").get(getEditRecipeById).post(postEditRecipeById);
router.delete("/delete/:id", deleteRecipe);

module.exports = router;
