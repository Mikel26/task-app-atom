/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { db } from "../index";
import { validate } from "../middleware/validate";
import { taskSchema } from "../validations/schemas";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Endpoints para gestionar tareas
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Consulta todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida exitosamente.
 */
router.get("/", async (req: any, res: any) => {
    try {
        const snapshot = await db.collection("tasks").orderBy("createdAt").get();
        const tasks = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente.
 */
router.post("/", validate(taskSchema), async (req: any, res: any) => {
    try {
        const { title, description, completed } = req.body;

        const newTask = {
            title,
            description,
            completed,
            createdAt: new Date(),
        };

        const docRef = await db.collection("tasks").add(newTask);
        res.status(201).json({ id: docRef.id, ...newTask });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Actualiza una tarea existente
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 */
router.put("/:taskId", validate(taskSchema), async (req: any, res: any) => {
    try {
        const taskId = req.params.taskId;
        const updates = req.body;

        await db.collection("tasks").doc(taskId).update(updates);
        res.json({ message: "Task updated successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Elimina una tarea existente
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 */
router.delete("/:taskId", async (req: any, res: any) => {
    try {
        const taskId = req.params.taskId;

        await db.collection("tasks").doc(taskId).delete();
        res.json({ message: "Task deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
