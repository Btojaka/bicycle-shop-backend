import { Router } from "express";
import { param, body } from "express-validator";
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  partialUpdateProduct,
  deleteProduct,
} from "../controllers/product";
import { handleInputErrors } from "../middlewares";

const router = Router();

// 📌 GET /api/products - List all products
router.get("/", getProducts);

// 📌 POST /api/products - Create a new product
router.post(
  "/",
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive float"),
  handleInputErrors,
  createProduct
);

// 📌 GET /api/products/:id - Get details of a specific product
router.get(
  "/:id",
  param("id").isInt({ min: 1 }).withMessage("ID must be possitive integer"),
  handleInputErrors,
  getProductById
);

// 📌 PUT /api/products/:id - Update a specific product completely
router.put(
  "/:id",
  param("id").isInt(),
  body("type").optional().isString().default("bicycle"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name is String"),
  body("price").notEmpty().withMessage("Price is required"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive float"),
  handleInputErrors,
  updateProduct
);

// 📌 PATCH /api/products/:id - Update a specific product partially
router.patch(
  "/:id",
  param("id").isInt(),
  body("type").optional().isString().default("bicycle"),
  body("name").optional().isString().withMessage("Name is String"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive float"),
  handleInputErrors,
  partialUpdateProduct
);

// 📌 DELETE /api/products/:id - Delete a specific product
router.delete("/:id", param("id").isInt(), handleInputErrors, deleteProduct);

export default router;
