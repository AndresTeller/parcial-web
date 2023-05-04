import { Profesor } from "../profesor/model/profesor.model.js";

export class Ordinario extends Profesor {
  constructor(name, lastname, nit, dedication, yearService) {
    super(name, lastname, nit, dedication);
    this.yearService = yearService;
  }
}
