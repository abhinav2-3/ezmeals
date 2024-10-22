import express, { Router } from "express";
import {
  add_Item,
  getMenu,
  getShopOrders,
  placeOrder,
} from "../../controllers/admin/items";

const router: Router = express.Router();

router.post("/addItem", add_Item);
router.get("/getMenu/:shopId", getMenu);
router.post("/placeOrder", placeOrder);
router.get("/getShopOrders/:shopId", getShopOrders);

export default router;
