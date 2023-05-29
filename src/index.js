require("dotenv").config();
const express = require("express");
const path = require("path");
const recipesRouter = require("./routers/recipes.router");
const PORT = process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => res.render("index"));
app.use("/recipes", recipesRouter);

// 404 Page not Found
app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Connected server running on port: ${PORT}`);
});
