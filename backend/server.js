import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { loginUser, signUpUser } from "./controllers/authController.js";
import {
  addFavoriteCharacter,
  deleteFavoriteCharacter,
  getCharacters,
  getFavorites,
} from "./controllers/characterController.js";
import { authenticate } from "./middleware/auth.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", signUpUser);
app.post("/login", loginUser);

app.get("/characters", authenticate, getCharacters);
app.get("/favorites", authenticate, getFavorites);
app.post("/favorites/:characterId", authenticate, addFavoriteCharacter);
app.delete("/favorites/:characterId", authenticate, deleteFavoriteCharacter);

app.listen(PORT);
