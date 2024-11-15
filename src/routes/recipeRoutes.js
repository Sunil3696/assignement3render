// recipeRoutes.js

const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authMiddleware");
const { validateRecipe } = require("../middleware/middleware");
const {
  getAllRecipes,
  createRecipe,
  getRecipeByID,
  deleteRecipeById,
  updateRecipe,
} = require("../controller/recipeController");

router.get("/",getAllRecipes);
router.post("/", authenticateJWT, validateRecipe, createRecipe);
router.get("/:id", authenticateJWT, getRecipeByID);
router.delete("/:id", authenticateJWT, deleteRecipeById);
router.put("/:id", authenticateJWT, validateRecipe, updateRecipe);

module.exports = router;
