// Importo todo lo de la libreria de Express
import express from "express";
import clientsRoutes from "./src/routes/clients.js";
import appointmentRoutes from "./src/routes/appointment.js"

import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());

const swaggerDocument = JSON.parse(
  fs.readFileSync(
    path.resolve("./documentation.json"),
    "utf-8"
  )
)

// Definir las rutas de las funciones que tendr á la página web
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/clients", clientsRoutes);
app.use("/api/appointment", appointmentRoutes);

// Exporto la constante para poder usar express en otros archivos
export default app;