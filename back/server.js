import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { dbConnection } from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à la bdd
mongoose
  .connect(dbConnection.url, dbConnection.options)
  .then(() => {
    console.log("connection established");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Initialisation des routes
app.get("/", (req, res) => {
  res.send("Server is ready");
});
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);

// Lancement du server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}/api`);
});
