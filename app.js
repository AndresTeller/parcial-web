import express from "express";
import { PORT } from "./src/config.js";

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
