import express from "express";
import userAuth from './../middlewares/userAuth.js';
import { addAndRemoveFavorite, getFavoriteItems } from "../controllers/favoriteControllers.js";


const favoriteRouter = express.Router();

favoriteRouter.post("/add", userAuth, addAndRemoveFavorite);

favoriteRouter.get("/favoriteitems", userAuth, getFavoriteItems);


export default favoriteRouter;