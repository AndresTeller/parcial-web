import { Contratado } from "../profesor/contratado.model.js";
import { Ordinario } from "../profesor/ordinario.model.js";
import { Profesor } from "../profesor/profesor.js";
import { addData } from "./utility/addData.js";

const d = document,
  $tableBodyUsers = d.getElementById("table-body-users");

// Inicio Prueba

const profesor1 = new Profesor(1, "Jesús", "Berdugo", "1111", "Matematicas");
const profesor2 = new Profesor(2, "Andres", "Teller", "2222", "Fisica");
const profesor3 = new Profesor(
  3,
  "Sebastian",
  "Enamorado",
  "3333",
  "Base de Datos"
);

const profesores = [profesor1, profesor2, profesor3];

// Fin Prueba

let dataTable,
  dataTableIsInitialized = false;

const dataTableOptions = {
  destroy: true,
  language: {
    lengthMenu: "Mostrar _MENU_ registros por página",
    zeroRecords: "Ningún usuario encontrado",
    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Ningún usuario encontrado",
    infoFiltered: "(filtrados desde _MAX_ registros totales)",
    search: "Buscar:",
    loadingRecords: "Cargando...",
    paginate: {
      first: "Primero",
      last: "Último",
      next: "Siguiente",
      previous: "Anterior",
    },
  },
};

const initDataTable = () => {
  if (dataTableIsInitialized) {
    dataTable.destroy();
  }

  addData(profesores, $tableBodyUsers);

  dataTable = $("#data-table-users").DataTable(dataTableOptions);
  dataTableIsInitialized = true;
};

window.addEventListener("load", () => {
  initDataTable();
});
