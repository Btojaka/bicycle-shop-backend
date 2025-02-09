import request from "supertest";
import { server } from "../../server";
import Product from "../../models/Product.model";

// GET /api/products
describe("GET /api/products", () => {
  it("should return a list of products", async () => {
    const products = await Product.findAll();

    const res = await request(server).get("/api/products");

    expect(res.status).toBe(200);
    expect(res.body).not.toHaveProperty("errors");
    expect(res.body).not.toHaveProperty("data");
  });

  it("should return a message if no products are available", async () => {
    const count = await Product.count();

    if (count === 0) {
      const res = await request(server).get("/api/products");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        message: "No products available at the moment.",
      });
    }
  });
});

// GET /api/products?type=bicycle
describe("GET /api/products?type=bicycle", () => {
  it("should return only products of type 'bicycle'", async () => {
    const res = await request(server).get("/api/products?type=bicycle");

    expect(res.status).toBe(200);
    expect(res.body).not.toHaveProperty("errors");
    expect(res.body.every((p) => p.type === "bicycle")).toBe(true);
  });
});

// GET /api/products/:id
describe("GET /api/products/:id", () => {
  it("should return a single product by ID", async () => {
    const product = await Product.findByPk(1);

    const res = await request(server).get("/api/products/1");

    if (product) {
      expect(res.status).toBe(200);
      expect(res.body).not.toHaveProperty("errors");
      expect(res.body).not.toHaveProperty("data");
    } else {
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "Product Not Found" });
    }
  });

  it("should return 404 if the product is not found", async () => {
    const product = await Product.findByPk(999);

    if (!product) {
      const res = await request(server).get("/api/products/999");

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "Product Not Found" });
    }
  });
});

// POST /api/products
describe("POST /api/products", () => {
  it("should create a new product", async () => {
    const newProduct = {
      name: "Ski",
      price: 300,
      type: "ski",
      isAvailable: true,
    };

    const res = await request(server).post("/api/products").send(newProduct);

    expect(res.status).toBe(201);
    expect(typeof res.body.data).toBe("object");
    expect(res.body.data).toMatchObject(newProduct);
  });

  it("should return 400 if there is a missing atributte mandatory", async () => {
    const res = await request(server)
      .post("/api/products")
      .send({ name: "Ski" }); // Missing price

    expect(res.status).toBe(400);
    expect(res.body.errors.length).toBe(2);
    expect(res.body.errors.map((e) => e.msg)).toEqual(
      expect.arrayContaining([
        "Price is required",
        "Price must be greater than 0 (ex: 0.50)",
      ])
    );
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(server).post("/api/products").send({}); // Empty request body

    expect(res.status).toBe(400);
    expect(res.body.errors.length).toBe(3);
    expect(res.body.errors.map((e) => e.msg)).toEqual(
      expect.arrayContaining([
        "Name is required",
        "Price is required",
        "Price must be greater than 0 (ex: 0.50)",
      ])
    );
  });
});

// PUT /api/products/:id
describe("PUT /api/products/:id", () => {
  it("should update a product completely", async () => {
    const product = await Product.findByPk(1);

    if (product) {
      const updatedProduct = {
        name: "Updated Bike",
        price: 250,
        type: "bicycle",
        isAvailable: false,
      };

      const res = await request(server)
        .put("/api/products/1")
        .send(updatedProduct);

      expect(res.status).toBe(200);
      expect(res.body).not.toHaveProperty("errors");
      expect(res.body).not.toHaveProperty("data");
    } else {
      const res = await request(server).put("/api/products/999").send({
        name: "Updated Bike",
        price: 250,
      });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "Product Not Found" });
    }
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(server).put("/api/products/1").send({}); // Empty request body

    expect(res.status).toBe(400);
    expect(res.body.errors.length).toBe(4);
    expect(res.body.errors.map((e) => e.msg)).toEqual(
      expect.arrayContaining([
        "Name is required",
        "Name is String",
        "Price is required",
        "Price must be a positive float",
      ])
    );
  });
});

// PATCH /api/products/:id
describe("PATCH /api/products/:id", () => {
  it("should partially update a product", async () => {
    const product = await Product.findByPk(1);

    if (product) {
      const res = await request(server)
        .patch("/api/products/1")
        .send({ price: 260 });

      expect(res.status).toBe(200);
      expect(res.body).not.toHaveProperty("errors");
      expect(res.body).not.toHaveProperty("data");
    } else {
      const res = await request(server)
        .patch("/api/products/999")
        .send({ price: 260 });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "Product Not Found" });
    }
  });

  it("should return 400 if invalid price is provided", async () => {
    const res = await request(server)
      .patch("/api/products/1")
      .send({ price: -5 });

    expect(res.status).toBe(400);
    expect(res.body.errors.length).toBe(1);
    expect(res.body.errors.map((e) => e.msg)).toEqual(
      expect.arrayContaining(["Price must be a positive float"])
    );
  });
});

// DELETE /api/products/:id
describe("DELETE /api/products/:id - Invalid ID cases", () => {
  it("should delete a product successfully", async () => {
    const product = await Product.findByPk(1);

    if (product) {
      const res = await request(server).delete("/api/products/1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "Product successfully deleted" });

      // Verify that the product no longer exists
      const deletedProduct = await Product.findByPk(1);
      expect(deletedProduct).toBeNull();
    } else {
      const res = await request(server).delete("/api/products/999");

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "Product Not Found" });
    }
  });

  it("should return 400 if ID is not a number", async () => {
    const res = await request(server).delete("/api/products/hello");

    expect(res.status).toBe(400);
    expect(res.body.errors.length).toBe(1);
    expect(res.body.errors.map((e) => e.msg)).toEqual(
      expect.arrayContaining(["ID must be positive integer"])
    );
  });

  it("should return 400 if ID is a negative number", async () => {
    const res = await request(server).delete("/api/products/-5");

    expect(res.status).toBe(400);
    expect(res.body.errors.length).toBe(1);
    expect(res.body.errors.map((e) => e.msg)).toEqual(
      expect.arrayContaining(["ID must be positive integer"])
    );
  });

  it("should return 404 if ID is empty", async () => {
    const res = await request(server).delete("/api/products/ ");

    expect(res.status).toBe(404);
    expect(res.status).not.toBe(400);
  });
});
