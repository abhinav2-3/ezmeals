import express, { Request, Response, json } from "express";
import { router } from "./routes/user";
import adminRoute from "./routes/admin/items";
import cors from "cors";
export * from "@prisma/client";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(json());

app.use("/api", router);
app.use("/api/admin", adminRoute);
// app.use("/api/user", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
