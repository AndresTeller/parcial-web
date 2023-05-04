import express from "express";
import { PORT } from "./src/config.js";
import { router as routerProfesor } from "./src/profesor/routes/profesor.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use(routerProfesor);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
