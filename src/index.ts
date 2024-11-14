import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";
import { dbConnect } from "./database";
import { errorMiddleware } from "./middleware/errorMiddleware";

/**
 * Initializes and starts the Express server.
 *
 * This script sets up the Express server with the following configurations:
 * - Body parsing: Uses `body-parser` to parse JSON request bodies.
 * - Default route: Serves an `index.html` file from the current directory for the root path.
 * - Swagger documentation: Sets up Swagger UI for API documentation at `/api/docs`.
 * - API routes: Registers API routes from the generated `routes` file.
 * - Error handling: Uses a custom error middleware to handle errors.
 * - Database connection: Connects to the MongoDB database using the `dbConnect` function.
 *
 * The server listens on the port specified by the `PORT` environment variable or port 8000 if not defined.
 */

// Express Server
const app = express();
app.use(bodyParser.json());

// Default Route
app.get("/", (req, res) => {
  return res.sendFile("index.html", { root: __dirname });
});

// Swagger API Docs
app.use("/api/docs", swaggerUI.serve, async (req: Request, res: Response) => {
  return res.send(
    swaggerUI.generateHTML(await import("../build/swagger.json"))
  );
});

RegisterRoutes(app);

// Define error middleware last
app.use(errorMiddleware);

app.listen(process.env.PORT || 8000, async () => {
  console.log(
    `✅ Server is up and running at http://localhost:${
      process.env.PORT || 8000
    }`
  );
  await dbConnect();
});
