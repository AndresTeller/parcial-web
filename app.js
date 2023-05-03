import express from "express";
import { PORT } from "./src/config.js";
import { router as routerProfesor } from "./src/profesor/profesor.routes.js";

const app = express();

app.use(express.json());

app.use(routerProfesor);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
