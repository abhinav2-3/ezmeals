"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_Item = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const add_Item = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { imageUrl, name, price, quantity, size, type } = req.body;
    if (!imageUrl || !name || !price || !quantity || !size || !type) {
        return res
            .status(400)
            .json({ status: true, message: "Please provide valid details" });
    }
    try {
        const item = yield prisma.item.create({
            data: {
                name,
                imageUrl,
                price,
                quantity,
                size,
                type,
            },
            select: {
                name: true,
                size: true,
                type: true,
            },
        });
        console.log(item);
        return res.status(201).json({ status: true, item, message: "Item Added" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ status: false, message: "Internal server error" });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.add_Item = add_Item;
