export class Profesor {
  constructor(id, name, lastname, nit, dedication) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.nit = nit;
    this.dedication = dedication;
  }

  reportOne() {
    return "Primer reporte";
  }

  reportTwo() {
    return "Segundo reporte";
  }
}
