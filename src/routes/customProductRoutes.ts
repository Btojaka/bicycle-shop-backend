import { Router } from "express";
import { param, body } from "express-validator";
import {
  getCustomProducts,
  createCustomProduct,
  getCustomProductById,
  updateCustomProduct,
  updateCustomProductParts,
  deleteCustomProduct,
} from "../controllers/customProduct";
import { handleInputErrors } from "../middlewares";

const router = Router();

// 📌 GET /api/custom-products - List all custom products
router.get("/", getCustomProducts);

// 📌 POST /api/custom-products - Create a new custom product
router.post(
  "/",
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive float"),
  body("typeProduct").notEmpty().withMessage("typeProduct is required"),
  body("parts")
    .optional()
    .isArray()
    .withMessage("Parts must be an array of part IDs")
    .custom(
      (parts) =>
        Array.isArray(parts) &&
        parts.every((id) => Number.isInteger(id) && id > 0)
    )
    .withMessage("Each part ID must be a positive integer"),
  handleInputErrors,
  createCustomProduct
);

// 📌 GET /api/custom-products/:id - Get details of a specific custom product
router.get(
  "/:id",
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
  handleInputErrors,
  getCustomProductById
);

// 📌 PUT /api/custom-products/:id - Update a specific custom product completely (except parts)
router.put(
  "/:id",
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
  body("name").optional().isString().withMessage("Name must be a string"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("typeProduct")
    .optional()
    .isString()
    .withMessage("typeProduct must be a string"),
  handleInputErrors,
  updateCustomProduct
);

// 📌 PATCH /api/custom-products/:id/parts - Update the parts of a custom product
router.patch(
  "/:id/parts",
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
  body("parts")
    .isArray()
    .withMessage("Parts must be an array of part IDs")
    .custom(
      (parts) =>
        Array.isArray(parts) &&
        parts.every((id) => Number.isInteger(id) && id > 0)
    )
    .withMessage("Each part ID must be a positive integer"),
  handleInputErrors,
  updateCustomProductParts
);

// 📌 DELETE /api/custom-products/:id - Delete a specific custom product
router.delete(
  "/:id",
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
  handleInputErrors,
  deleteCustomProduct
);

export default router;
