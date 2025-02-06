import { Request, Response } from "express";
import CustomProduct from "../models/CustomProduct.model";
import Part from "../models/Part.model";
import { validateDynamicRestrictions } from "../helpers";
import { io } from "../server"; // Importamos el socket desde el servidor

// List all custom products
export const getCustomProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const customProducts = await CustomProduct.findAll({ include: Part });
    // Check if there are no custom products
    if (customProducts.length === 0) {
      res.status(200).json({ message: "No custom products available." });
      return;
    }

    res.status(200).json(customProducts);
  } catch (error) {
    res.status(500).json({ error: "Error getting custom products" });
  }
};

// Create a new custom product
export const createCustomProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, price, typeProduct, parts } = req.body;

  try {
    // Validate that required fields are present
    if (!name || !price || !typeProduct) {
      res
        .status(400)
        .json({ error: "name, price, and typeProduct are required." });
      return;
    }

    // If parts are specified, validate them before creating the custom product
    let validParts = [];
    if (parts && parts.length > 0) {
      validParts = await Part.findAll({ where: { id: parts } });

      // Verify if all parts exist
      if (validParts.length !== parts.length) {
        res.status(400).json({ error: "One or more parts do not exist." });
        return;
      }

      // Validate that all parts match the typeProduct before creating the custom product
      for (const part of validParts) {
        if (part.typeProduct !== typeProduct) {
          res.status(400).json({
            error: `Part ${part.category} cannot be added to a ${typeProduct}.`,
          });
          return;
        }
      }
    }

    // Create the custom product only after validating everything
    const customProduct = await CustomProduct.create({
      name,
      price,
      typeProduct,
    });

    // If there are valid parts, associate them after creating the custom product
    if (validParts.length > 0) {
      await customProduct.$set("parts", validParts);
    }
    const fullProduct = await CustomProduct.findByPk(customProduct.id, {
      include: Part,
    });

    io.emit("customProductCreated", fullProduct);
    res.status(201).json(fullProduct);
  } catch (error) {
    res.status(500).json({ error: "Error creating custom product" });
  }
};

// Get a custom product by ID
export const getCustomProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const customProduct = await CustomProduct.findByPk(id, { include: Part });
    // Check if the custom product does not exist
    if (!customProduct) {
      res.status(404).json({ error: "Custom Product Not Found" });
      return;
    }
    res.status(200).json(customProduct);
  } catch (error) {
    res.status(500).json({ error: "Error getting custom product by id" });
  }
};

export const updateCustomProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, price, typeProduct } = req.body;

  try {
    const customProduct = await CustomProduct.findByPk(id, { include: Part });

    // Check if the custom product exists
    if (!customProduct) {
      res.status(404).json({ error: "Custom Product Not Found" });
      return;
    }

    // Validation: If no data is provided to update, return an error
    if (!name && !price && !typeProduct) {
      res.status(400).json({
        error: "At least one field (name, price, typeProduct) is required.",
      });
      return;
    }

    // If typeProduct is changed, validate that the parts are compatible
    if (typeProduct && typeProduct !== customProduct.typeProduct) {
      const associatedParts = await customProduct.$get("parts");

      // Filter incompatible parts
      const incompatibleParts = associatedParts.filter(
        (part) => part.typeProduct !== typeProduct
      );
      // If there are incompatible parts, return an error
      if (incompatibleParts.length > 0) {
        res.status(400).json({
          error:
            "Cannot change typeProduct because some existing parts are incompatible.",
          incompatibleParts: incompatibleParts.map((part) => ({
            id: part.id,
            category: part.category,
            typeProduct: part.typeProduct,
          })),
        });
        return;
      }
    }

    // Update only the provided fields
    await customProduct.update({
      ...(name && { name }),
      ...(price && { price }),
      ...(typeProduct && { typeProduct }),
    });

    const updatedProduct = await CustomProduct.findByPk(id, { include: Part });

    io.emit("customProductUpdated", updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error updating custom product" });
  }
};

// Update the parts of a custom product
export const updateCustomProductParts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { parts } = req.body; // Nueva lista de partes a asociar

  try {
    const customProduct = await CustomProduct.findByPk(id, { include: Part });

    // Check if the custom product exists
    if (!customProduct) {
      res.status(404).json({ error: "Custom product not found" });
      return;
    }

    // Validation: Ensure that parts are provided in the body
    if (!parts || !Array.isArray(parts) || parts.length === 0) {
      res
        .status(400)
        .json({ error: "Parts array is required and cannot be empty." });
      return;
    }

    const validParts = await Part.findAll({ where: { id: parts } });

    // Validate if all the provided parts exist
    const foundPartIds = validParts.map((p) => p.id);
    const missingParts = parts.filter((id) => !foundPartIds.includes(id));

    if (missingParts.length > 0) {
      res.status(400).json({
        error: `Some parts do not exist: ${missingParts.join(", ")}`,
      });
      return;
    }

    for (const part of validParts) {
      // Validate that the parts are of the same product type
      if (part.typeProduct !== customProduct.typeProduct) {
        res.status(400).json({
          error: `Part ${part.category} (ID: ${part.id}) cannot be added to a ${customProduct.typeProduct}.`,
        });
        return;
      }

      // Validate restrictions before updating parts
      const restrictionMessage = await validateDynamicRestrictions(
        customProduct.id,
        part
      );
      if (restrictionMessage) {
        res.status(400).json({ error: restrictionMessage });
        return;
      }
    }

    // Associate the parts with the custom product
    await customProduct.$set("parts", validParts);
    res.status(200).json({
      message: "Custom product parts updated successfully.",
      updatedCustomProduct: await CustomProduct.findByPk(id, { include: Part }),
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating custom product parts" });
  }
};

// Delete a custom product by ID
export const deleteCustomProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted = await CustomProduct.destroy({ where: { id } });

    // Check if the custom product was deleted
    if (deleted) {
      io.emit("customProductDeleted", { id });
      res.status(204).send({ message: "Custom product successfully deleted" });
    } else {
      res.status(404).json({ error: "Custom Product Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting custom product" });
  }
};
