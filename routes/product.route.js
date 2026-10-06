import express from "express";
import {getProducts, getProductbyID, createProduct, updateProduct, deleteProduct} from "../controllers/product.controller.js";

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductbyID);

router.post('/', createProduct);

//update
router.put('/:id', updateProduct);

// delete 
router.delete('/:id', deleteProduct);




export default router;