/**
 * File: recipeController.js
 * Author: Sunil Balami
 * StudentID: 200578456
 * Date: 2024-11-15
 * Desc: This is a controller page and it will have the function that is directly related to the handle te recipe operation like
 * fetching, deleting, creating, manipulating documents on the mongodb.
 */

const Recipe = require("../models/recipeModel");

/**
 * Desc: getAllrecepis from the mongodb database
 *Parameter:
 *   req : what user sends (current nothing)
 *   res : What user gets after execution of this function
 */
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    // res.json("I am here sending respinsess");
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get recipes", error: error.message });
  }
};

/**
 * Desc: Function createRecipe is to handle the create operation ro Mongodb
 *Parameter:
 *   req : JSON body of Recipe data like recipeName, cookingTime etc
 *   res : The whole object that is created or the error body.
 */
const createRecipe = async (req, res) => {
  const {
    recipeName,
    ingredients,
    cookingTime,
    difficulty,
    cuisine,
    description,
    photoLink,
    averageRating,
  } = req.body;
  //creating new instance of the Recipe model with data on it
  const newRecipe = new Recipe({
    recipeName,
    ingredients,
    cookingTime,
    difficulty,
    cuisine,
    description,
    photoLink,
    averageRating,
  });
  // res.json("sunil")
  try {
    const savedData = await newRecipe.save(); //saving data to the Database.
    res.status(201).json(savedData);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create recipe", error: error.message });
  }
};

/**
 * Desc: Function getRecipeById is to fetch recipe from db based on the URL parameter
 *Parameter:
 *   req : Recipe id
 *   res : The whole object that matches the recipe id
 */
const getRecipeByID = async (req, res) => {
  // console.log("I am here");
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send("Recipe not found with given Recipe ID");
    } else {
      res.status(200).json(recipe);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving the recipe");
  }
};

/**
 * Desc: Function deleteRecipeById is to delete recipe from database
 *Parameter:
 *   req : Recipe id
 *   res : The whole object that has been deleted.
 */
const deleteRecipeById = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).send("Recipe not found");
    } else {
      res.status(201).json(deletedRecipe);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting the Recipe");
  }
};

/**
 * Desc: This controller function is to update the data on the database
 *Parameter:
 *   req : Recipe id
 *   res : The whole object that has been updated.
 */
const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).send("Recipe is not updated");
    }
    res.status(201).json(updatedRecipe);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error uodating the Recipe");
  }
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipeByID,
  deleteRecipeById,
  updateRecipe,
};
