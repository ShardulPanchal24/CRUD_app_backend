import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.model.js";
import productRoutes from "./routes/product.route.js";

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
  .connect(
    "mongodb+srv://shardulpanchal244_db_user:SGw8nVhTA6l5NrT4@backenddb.cvl13cu.mongodb.net/Node-API?appName=BackendDB",
  )
  .then(() => {
    //connect to database
    console.log("Connected to Database!");

    //run server
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
