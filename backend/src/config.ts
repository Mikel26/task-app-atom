import * as admin from "firebase-admin";
import * as path from "path";

// Cargar las credenciales de la cuenta de servicio
const serviceAccount = require(path.resolve("serviceAccountKey.json"));

// Inicializa Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
