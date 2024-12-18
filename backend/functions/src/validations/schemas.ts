/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

export const userSchema = yup.object().shape({
    email: yup.string().email("Debe ser un correo válido").required("El correo es obligatorio"),
});

export const taskSchema = yup.object().shape({
    title: yup.string().required("El título es obligatorio"),
    description: yup.string().required("La descripción es obligatoria"),
    completed: yup.boolean().default(false),
});
