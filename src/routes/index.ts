import { Router } from "express";
import productRoutes from "./productRoutes";
import partRoutes from "./partRoutes";
import customProductRoutes from "./customProductRoutes";

const router = Router();

// Products routes
router.use("/products", productRoutes);

// Parts routes
router.use("/parts", partRoutes);

// Custom Products routes
router.use("/custom-products", customProductRoutes);

export default router;
