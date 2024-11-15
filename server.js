require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./src/routes/userRoutes")
const recipeRoutes = require("./src/routes/recipeRoutes")
const app = express();

const PORT = process.env.PORT || 3000;
const MongodbURI = "mongodb+srv://sunil:sunil123@cluster0.df1iq.mongodb.net/";

mongoose
  .connect(MongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Success fully Connected to MongoDB"))
  .catch((err) => console.error(err));

//parshing JSON requests
app.use(express.json());


app.use("/api/user", authRoutes); //Base URL for User Auth
app.use("/api/recipe", recipeRoutes); //Base URL for recipe

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  