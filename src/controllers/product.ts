import { Request, Response } from "express";
import Product from "../models/Product.model";

// List all products (optional filter by type)
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { type } = req.query; // Optional filter by product type

    const whereCondition = type ? { type } : {}; // Apply filter if provided

    const products = await Product.findAll({
      where: whereCondition,
    });

    if (products.length === 0) {
      res.status(200).json({ message: "No products available at the moment." });
      return;
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
};

// Create a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, price, type = "bicycle" } = req.body; // Default type to "bicycle" if not provided
  try {
    const product = await Product.create({ name, price, type });
    console.log("Created Product:", product.toJSON());

    res.status(201).json({ data: product });
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
};

// Get a product by ID
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Product Not Found" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error getting product by id" });
  }
};

// Update a product completely
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  let { name, price, type } = req.body;

  try {
    const product = await Product.findByPk(id);
    // Check if the product exists
    if (!product) {
      res.status(404).json({ error: "Product Not Found" });
      return;
    }

    // `PUT` requires sending ALL mandatory fields
    if (!name || !price) {
      res.status(400).json({
        error:
          "PUT requires all fields (name, price)  field 'type' is by default is bicycle, to be sent",
      });
      return;
    }

    // Parse price to float if provided and validate it
    if (price) {
      price = parseFloat(price);
    }

    await product.update({ name, price, type });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};

// Partial update of a product
export const partialUpdateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  let { name, price, type, isAvailable } = req.body; // Extract fields to update

  try {
    const existingProduct = await Product.findByPk(id);

    // check if the product exists
    if (!existingProduct) {
      res.status(404).json({ error: "Product Not Found" });
      return;
    }

    // Parse price to float if provided
    if (price) {
      price = parseFloat(price);
    }

    // Partial update of the product
    await existingProduct.update({ name, price, type, isAvailable });

    res.status(200).json(existingProduct);
  } catch (error) {
    res.status(500).json({ error: "Error updating product partially" });
  }
};

// Delete a product by ID
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "Product successfully deleted" });
    } else {
      res.status(404).json({ error: "Product Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};
