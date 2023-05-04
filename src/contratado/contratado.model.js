import { Profesor } from "../profesor/model/profesor.model.js";

export class Contratado extends Profesor {
  constructor(name, lastname, nit, dedication, startDate, endDate) {
    super(name, lastname, nit, dedication);
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
