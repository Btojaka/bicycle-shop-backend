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

// GET /api/custom-products - List all custom products
router.get("/", getCustomProducts);

// POST /api/custom-products - Create a new custom product
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

// GET /api/custom-products/:id - Get details of a specific custom product
router.get(
  "/:id",
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
  handleInputErrors,
  getCustomProductById
);

// PUT /api/custom-products/:id - Update a specific custom product completely (except parts)
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

// PATCH /api/custom-products/:id/parts - Update the parts of a custom product
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

// DELETE /api/custom-products/:id - Delete a specific custom product
router.delete(
  "/:id",
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
  handleInputErrors,
  deleteCustomProduct
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Custom Products
 *   description: API for managing custom products
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          CustomProduct:
 *           type: object
 *           required:
 *                - name
 *                - price
 *                - typeProduct
 *           properties:
 *              id:
 *                type: integer
 *                description: The auto-generated id of the custom product
 *                example: 1
 *              name:
 *                type: string
 *                description: The name of the custom product
 *                example: Custom Bike
 *              price:
 *                type: number
 *                format: float
 *                description: The final price of the custom product (sum )
 *                example: 500.00
 *              typeProduct:
 *                type: string
 *                description: The type of the custom product
 *                example: bicycle
 *              parts:
 *                type: array
 *                items:
 *                  type: integer
 *                  description: The parts of the custom product
 *                  example: [1, 2, 3]
 *
 */

/**
 * @swagger
 * /api/custom-products:
 *   get:
 *     summary: List all custom products
 *     tags: [Custom Products]
 *     responses:
 *       200:
 *         description: The list of custom products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomProduct'
 *   post:
 *     summary: Create a new custom product
 *     tags: [Custom Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomProduct'
 *     responses:
 *       201:
 *         description: The custom product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomProduct'
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/custom-products/{id}:
 *   get:
 *     summary: Get details of a specific custom product
 *     tags: [Custom Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The custom product id
 *     responses:
 *       200:
 *         description: The custom product description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomProduct'
 *       404:
 *         description: The custom product was not found
 *   put:
 *     summary: Update a specific custom product completely
 *     tags: [Custom Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The custom product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomProduct'
 *     responses:
 *       200:
 *         description: The custom product was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomProduct'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: The custom product was not found
 *   patch:
 *     summary: Update the parts of a custom product
 *     tags: [Custom Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The custom product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomProduct'
 *     responses:
 *       200:
 *         description: The custom product parts were updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomProduct'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: The custom product was not found
 *   delete:
 *     summary: Delete a specific custom product
 *     tags: [Custom Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The custom product id
 *     responses:
 *       200:
 *         description: The custom product was deleted
 *       404:
 *         description: The custom product was not found
 */
