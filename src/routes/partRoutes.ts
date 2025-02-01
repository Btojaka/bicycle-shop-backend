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

// GET /api/parts - List all parts
router.get("/", getParts);

// POST /api/parts - Create a new part
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

// GET /api/parts/:id - Get details of a specific part
router.get(
  "/:id",
  param("id")
    .isInt({ min: 1 })
    .withMessage("Invalid part ID, has to be a positive integer"),
  handleInputErrors,
  getPartById
);

// PUT /api/parts/:id - Update a specific part completely
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

// PATCH /api/parts/:id - Update a specific part partially
router.patch("/:id", param("id").isInt(), handleInputErrors, partialUpdatePart);

// DELETE /api/parts/:id - Delete a specific part
router.delete("/:id", param("id").isInt(), handleInputErrors, deletePart);

export default router;

/**
 * @swagger
 * tags:
 *   name: Parts
 *   description: API for managing product parts
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          Part:
 *           type: object
 *           required:
 *                - category
 *                - value
 *                - price
 *                - quantity
 *           properties:
 *              id:
 *                type: integer
 *                description: The auto-generated id of the part
 *              type:
 *                type: string
 *                description: The type of the part
 *              category:
 *                type: string
 *                description: The category of the part
 *              value:
 *                type: string
 *                description: The value of the part
 *              price:
 *                type: number
 *                format: float
 *                description: The price of the part
 *              quantity:
 *                type: integer
 *                description: The quantity of the part in stock
 *              example:
 *                id: 1
 *                category: "brakes"
 *                value: "hydraulic"
 *                price: 150.00
 *                quantity: 10
 *                type: "bicycle"
 */

/**
 * @swagger
 * /api/parts:
 *   get:
 *     summary: List all parts
 *     tags: [Parts]
 *     responses:
 *       200:
 *         description: The list of parts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Part'
 *   post:
 *     summary: Create a new part
 *     tags: [Parts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Part'
 *     responses:
 *       201:
 *         description: The part was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Part'
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/parts/{id}:
 *   get:
 *     summary: Get details of a specific part
 *     tags: [Parts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The part id
 *     responses:
 *       200:
 *         description: The part description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Part'
 *       404:
 *         description: The part was not found
 *   put:
 *     summary: Update a specific part completely
 *     tags: [Parts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The part id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Part'
 *     responses:
 *       200:
 *         description: The part was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Part'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: The part was not found
 *   patch:
 *     summary: Update a specific part partially
 *     tags: [Parts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The part id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Part'
 *     responses:
 *       200:
 *         description: The part was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Part'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: The part was not found
 *   delete:
 *     summary: Delete a specific part
 *     tags: [Parts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The part id
 *     responses:
 *       200:
 *         description: The part was deleted
 *       404:
 *         description: The part was not found
 */
