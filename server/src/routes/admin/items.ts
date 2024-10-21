import express, { Router } from "express";
import { add_Item, getMenu } from "../../controllers/admin/items";

const router: Router = express.Router();

router.post("/addItem", add_Item);
router.get("/getMenu/:shopId", getMenu);

export default router;
