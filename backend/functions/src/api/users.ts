/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { validate } from "../middleware/validate";
import { userSchema } from "../validations/schemas";
import { db } from "../index";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gestionar usuarios
 */

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Obtiene un usuario por su correo electrónico
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/:email", async (req: any, res: any) => {
    try {
        const email = req.params.email;
        const userDoc = await db.collection("users").doc(email).get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: "Usuario con email " + email + " no encontrado" });
        }

        res.json({ id: userDoc.id, ...userDoc.data() });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 */
router.post("/", validate(userSchema), async (req, res) => {
    try {
        const { email } = req.body;

        await db.collection("users").doc(email).set({ createdAt: new Date() });
        res.status(201).json({ message: "User created successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
