import { Request, Response } from "express";
import Product from "../models/Product.model";
import { io } from "../server";

// List all products (optional filter by type)
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { type } = req.query;
    const whereCondition = type ? { type } : {};

    const products = await Product.findAll({ where: whereCondition });

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
  const { name, price, type = "bicycle" } = req.body;

  try {
    const product = await Product.create({ name, price, type });
    console.log("Created Product:", product.toJSON());

    // Emitir evento al frontend
    io.emit("productCreated", product);

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
  let { name, price, type, isAvailable } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Product Not Found" });
      return;
    }

    if (!name || !price) {
      res.status(400).json({ error: "PUT requires all fields (name, price)" });
      return;
    }

    if (price) {
      price = parseFloat(price);
    }

    await product.update({ name, price, type, isAvailable });

    // Emitir evento al frontend
    io.emit("productUpdated", product);

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
  let { name, price, type, isAvailable } = req.body;

  try {
    const existingProduct = await Product.findByPk(id);

    if (!existingProduct) {
      res.status(404).json({ error: "Product Not Found" });
      return;
    }

    if (price) {
      price = parseFloat(price);
    }

    await existingProduct.update({ name, price, type, isAvailable });

    // Emitir evento al frontend
    io.emit("productUpdated", existingProduct);

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
    const deletedProduct = await Product.findByPk(id);

    if (!deletedProduct) {
      res.status(404).json({ error: "Product Not Found" });
      return;
    }

    await deletedProduct.destroy();

    // Emitir evento al frontend
    io.emit("productDeleted", { id });

    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};
