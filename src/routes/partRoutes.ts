import { Router } from "express";
import { param, body } from "express-validator";
import {
  getParts,
  createPart,
  getPartById,
  updatePart,
  partialUpdatePart,
  deletePart,
} from "../controllers/part";
import { handleInputErrors } from "../middlewares";

const router = Router();

// 📌 GET /api/parts - List all parts
router.get("/", getParts);

// 📌 POST /api/parts - Create a new part
router.post(
  "/",
  body("category").notEmpty().withMessage("Category is required"),
  body("value").notEmpty().withMessage("Value is required"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive float"),
  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
  handleInputErrors,
  createPart
);

// 📌 GET /api/parts/:id - Get details of a specific part
router.get(
  "/:id",
  param("id")
    .isInt({ min: 1 })
    .withMessage("Invalid part ID, has to be a positive integer"),
  handleInputErrors,
  getPartById
);

// 📌 PUT /api/parts/:id - Update a specific part completely
router.put(
  "/:id",
  param("id").isInt(),
  body("type").optional().default("bicycle"),
  body("category").notEmpty().withMessage("Category is required"),
  body("value").notEmpty().withMessage("Value is required"),
  body("price").notEmpty().withMessage("Price is required"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive float"),
  handleInputErrors,
  updatePart
);

// 📌 PATCH /api/parts/:id - Update a specific part partially
router.patch("/:id", param("id").isInt(), handleInputErrors, partialUpdatePart);

// 📌 DELETE /api/parts/:id - Delete a specific part
router.delete("/:id", param("id").isInt(), handleInputErrors, deletePart);

export default router;
