import { Request, Response } from "express";
import Part from "../models/Part.model";
import { io } from "../server";

// List all parts (optionally filter by typeProduct)
export const getParts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { typeProduct } = req.query;

    // If typeProduct is provided, filter by it or return all parts
    const parts = await Part.findAll({
      where: typeProduct ? { typeProduct } : {},
    });

    res.status(200).json(parts);
  } catch (error) {
    res.status(500).json({ error: "Error getting parts" });
  }
};

// get all categories and values from typeproduct
export const getPartOptions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parts = await Part.findAll({
      attributes: ["category", "value", "typeProduct"],
    });
    //  Object from object, each product type is a key, maps to another object array with category key.
    const options: { [typeProduct: string]: { [category: string]: string[] } } =
      {};

    parts.forEach((part) => {
      if (!options[part.typeProduct]) {
        options[part.typeProduct] = {};
      }
      if (!options[part.typeProduct][part.category]) {
        options[part.typeProduct][part.category] = [];
      }
      if (!options[part.typeProduct][part.category].includes(part.value)) {
        options[part.typeProduct][part.category].push(part.value);
      }
    });

    res.status(200).json(options);
  } catch (error) {
    res.status(500).json({ error: "Error fetching part options" });
  }
};

// Create a new part
export const createPart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      category,
      value,
      price,
      isAvailable,
      typeProduct = "bicycle",
      quantity,
    } = req.body;

    // Verify if a part with the same category and value already exists
    const existingPart = await Part.findOne({
      where: { category, value, typeProduct },
    });
    if (existingPart) {
      res.status(400).json({
        error: "Part with this category, value, and type already exists",
      });
      return;
    }

    // Create a new part
    const part = await Part.create({
      category,
      value,
      price,
      isAvailable: quantity > 0 ? isAvailable : false, // Set isAvailable to false if quantity is 0
      typeProduct,
      quantity,
    });
    io.emit("partCreated", part);
    res.status(201).json(part);
  } catch (error) {
    res.status(500).json({ error: "Error creating part" });
  }
};

// Get a part by ID
export const getPartById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const part = await Part.findByPk(id);
    if (!part) {
      res.status(404).json({ error: "Part Not Found" });
      return;
    }
    res.status(200).json(part);
  } catch (error) {
    res.status(500).json({ error: "Error getting part" });
  }
};

// Update a part totally
export const updatePart = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { category, value, price, isAvailable, typeProduct, quantity } =
    req.body;

  try {
    const part = await Part.findByPk(id);

    // Check if the part exists
    if (!part) {
      res.status(404).json({ error: "Part Not Found" });
      return;
    }

    // Update the part
    await part.update({
      category,
      value,
      price,
      isAvailable,
      typeProduct,
      quantity,
    });

    // If quantity reaches 0, set isAvailable to false
    if (quantity !== undefined && quantity <= 0) {
      await part.update({ isAvailable: false });
    }
    io.emit("partUpdated", part);
    res.status(200).json(await Part.findByPk(id));
  } catch (error) {
    res.status(500).json({ error: "Error updating part" });
  }
};

// Partial update of a part
export const partialUpdatePart = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { category, value, price, isAvailable, typeProduct, quantity } =
    req.body;

  try {
    const existingPart = await Part.findByPk(id);
    // Check if the part exists
    if (!existingPart) {
      res.status(404).json({ error: "Part Not Found" });
      return;
    }

    // Update the part partially
    await existingPart.update({
      category,
      value,
      price,
      isAvailable,
      typeProduct,
      quantity,
    });

    // If quantity reaches 0, set isAvailable to false
    if (quantity !== undefined && quantity <= 0) {
      await existingPart.update({ isAvailable: false });
    }
    io.emit("partUpdated", existingPart);
    res.status(200).json(await Part.findByPk(id));
  } catch (error) {
    res.status(500).json({ error: "Error updating part partially" });
  }
};

// Delete a part by ID
export const deletePart = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const part = await Part.findByPk(id);
    // Check if the part exists
    if (!part) {
      res.status(404).json({ error: "Part Not Found" });
      return;
    }

    // Delete the part
    await part.destroy();

    io.emit("partDeleted", { id });
    res.status(200).json({ message: "Part deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting part" });
  }
};
