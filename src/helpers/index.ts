import CustomProduct from "../models/CustomProduct.model";
import Part from "../models/Part.model";

/**
 * Validate restrictions when adding parts to a custom product.
 * This function ensures that the new part being added adheres to the dynamic restrictions
 * based on the existing parts of the custom product.
 *
 * @param customProductId - The ID of the custom product to validate against.
 * @param newPart - The new part to be added (optional).
 * @returns A promise that resolves to a string containing the validation error message, or null if validation passes.
 */
export const validateDynamicRestrictions = async (
  customProductId: number,
  newPart?: Part
): Promise<string | null> => {
  const customProduct = await CustomProduct.findByPk(customProductId, {
    include: Part,
  });

  if (!customProduct) {
    return "Custom product not found.";
  }

  const associatedParts = await customProduct.$get("parts");

  // Validation 1: Do not mix parts from different product types
  if (newPart && newPart.typeProduct !== customProduct.typeProduct) {
    return `Part ${newPart.category} cannot be added to a ${customProduct.typeProduct}.`;
  }

  // If the new part is out of stock, it cannot be added.
  if (newPart && newPart.quantity <= 0) {
    return `Part ${newPart.category} is out of stock.`;
  }

  // Include the new part if provided
  if (newPart) {
    associatedParts.push(newPart);
  }

  // Create a map of parts grouped by category
  const partsByCategory = associatedParts.reduce((acc, part) => {
    acc[part.category] = part.value;
    return acc;
  }, {} as Record<string, string>);

  // Validation 2: Specific product rules
  if (
    newPart?.category === "wheels" &&
    newPart.value === "mountain wheels" &&
    partsByCategory["frameType"] !== "full-suspension"
  ) {
    return "Mountain wheels require a full-suspension frame.";
  }

  if (
    newPart?.category === "rimColor" &&
    newPart.value === "red" &&
    partsByCategory["wheels"] === "fat bike wheels"
  ) {
    return "Fat bike wheels cannot have a red rim color.";
  }

  return null;
};
