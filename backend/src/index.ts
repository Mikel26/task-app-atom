import express from "express";
import cors from "cors";

import userRoutes from "./api/users";
import taskRoutes from "./api/tasks";
import { db } from "./config";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todo App API",
            version: "1.0.0",
        },
    },
    apis: ["./src/api/*.ts"], // Rutas donde están los endpoints
});


const app = express();

app.get("/test-firebase", async (req, res) => {
    try {
        // Prueba guardando un documento
        const docRef = db.collection("test").doc("testDoc");
        await docRef.set({ message: "Hello from Firebase!" });

        // Obtén el documento
        const snapshot = await docRef.get();
        res.json({ data: snapshot.data() });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.use(cors());
app.use(express.json());

// Rutas
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

// Swagger - documentación de la API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
