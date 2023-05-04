export class Profesor {
  constructor(name, lastname, nit, dedication) {
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
