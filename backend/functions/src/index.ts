import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";
import userRoutes from "./api/users";
import taskRoutes from "./api/tasks";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

admin.initializeApp();
export const db = admin.firestore();

const app = express();

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo App API",
      version: "1.0.0",
    },
  },
  apis: ["./src/api/*.ts"],
});

app.use(cors());
app.use(express.json());

// Rutas
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Exporta la función
export const api = functions.https.onRequest(app);
