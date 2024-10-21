import express, { Router } from "express";
import { login } from "../controllers/user";

export const router: Router = express.Router();

router.post("/login", login);
