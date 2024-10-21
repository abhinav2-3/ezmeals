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
exports.login = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    if (!name || !email) {
        return res
            .status(404)
            .json({ success: false, message: "Please Provide Credentials !!" });
    }
    try {
        const user = yield prisma.user.upsert({
            where: {
                email: email,
            },
            create: {
                email,
                name,
            },
            update: {
                email,
                name,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        console.log(user);
        return res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.log("error while login", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});
exports.login = login;
