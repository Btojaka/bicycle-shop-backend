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

// GET /api/products - List all products
router.get("/", getProducts);

// POST /api/products - Create a new product
router.post(
  "/",
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive float"),
  handleInputErrors,
  createProduct
);

// GET /api/products/:id - Get details of a specific product
router.get(
  "/:id",
  param("id").isInt({ min: 1 }).withMessage("ID must be possitive integer"),
  handleInputErrors,
  getProductById
);

// PUT /api/products/:id - Update a specific product completely
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

// PATCH /api/products/:id - Update a specific product partially
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

// DELETE /api/products/:id - Delete a specific product
router.delete("/:id", param("id").isInt(), handleInputErrors, deleteProduct);

export default router;

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product Name
 *                      example: Mountain Bike
 *                  price:
 *                      type: number
 *                      description: The Product Price
 *                      example: 250.59
 *                  availability:
 *                      type: boolean
 *                      description: The Product Availability
 *                      example: true
 *                  typeProduct:
 *                      type: string
 *                      description: The Product Type
 *                      example: bicycle
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: List all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get details of a specific product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a specific product completely
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update a specific product partially
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a specific product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       204:
 *         description: Product deleted successfully
 */
