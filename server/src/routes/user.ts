import express, { Router } from "express";
import { getUser, login } from "../controllers/user";

export const router: Router = express.Router();

router.post("/login", login);
router.get("/get_user/:email", getUser);
