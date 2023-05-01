import { Profesor } from "../profesor/profesor.js";

export class Ordinario extends Profesor {
  constructor(id, name, lastname, nit, dedication, yearService) {
    super(id, name, lastname, nit, dedication);
    this.yearService = yearService;
  }
}
