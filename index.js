import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.model.js";
import productRoutes from "./routes/product.route.js";
import dotenv from "dotenv";

dotenv.config({ path: "atlas-credentials.env" });

const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;
const MONGO_URI = `mongodb+srv://${encodeURIComponent(MONGODB_USERNAME)}:${encodeURIComponent(MONGODB_PASSWORD)}@backenddb.cvl13cu.mongodb.net/Node-API?appName=BackendDB`;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/products', productRoutes);


app.get("/", (req, res) => {
  res.send("Hello from node api 3rd time");
});


mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to Database!");

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.log("Connection failed:", error);
  });
