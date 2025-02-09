import request from "supertest";
import { server, httpServer, connectDB } from "../server";
import db from "../config/database";

jest.mock("../config/database");

describe("Database Connection", () => {
  it("should log an error when the database fails to connect", async () => {
    jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("DB Error"));
    const consoleSpy = jest.spyOn(console, "log");

    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Unable to connect to the database")
    );
  });
});

describe("Server and CORS", () => {
  it("should respond with 404 for an unknown API route", async () => {
    const res = await request(server).get("/api/unknown");
    expect(res.status).toBe(404);
  });

  it("should allow requests from the frontend URL", async () => {
    const res = await request(server)
      .get("/api")
      .set("Origin", process.env.FRONTEND_URL);
    expect(res.status).not.toBe(500);
  });

  it("should reject unauthorized origins", async () => {
    const res = await request(server)
      .get("/api")
      .set("Origin", "https://unauthorized.com");
    expect(res.status).toBe(500);
  });
});

afterAll(() => {
  httpServer.close();
  db.close();
});
