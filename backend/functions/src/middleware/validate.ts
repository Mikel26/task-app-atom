/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { AnyObjectSchema } from "yup";

export const validate = (schema: AnyObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validar el cuerpo de la solicitud
        req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
        next(); // Continuar si no hay errores
    } catch (error: any) {
        res.status(400).json({ errors: error.errors });
    }
};
