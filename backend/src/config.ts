import * as admin from "firebase-admin";
import * as dotenv from 'dotenv';
import * as path from 'path';

// Cargar el archivo .env correspondiente según el entorno
const environment = process.env.NODE_ENV || 'development';
const envPath = path.resolve(__dirname, `../.env.${environment}`);

dotenv.config({
  path: envPath
});

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

// Inicializa Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const db = admin.firestore();