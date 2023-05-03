import { Contratado } from "../contratado/contratado.model.js";
import { Ordinario } from "../ordinario/ordinario.model.js";
import { Profesor } from "../profesor/profesor.js";
import { addDataOrdinario } from "./utility/addDataOrdinario.js";
import { addDataTodos } from "./utility/addDataTodos.js";
import { addDataContratado } from "./utility/addDataContratado.js"
const d = document,
  $tableBodyUsers = d.getElementById("table-body-users"),
  $select = d.getElementById("select");

let $trHeadUser = null;

// Inicio Prueba
const profesor1 = new Ordinario(
  1,
  "Jesús",
  "Berdugo",
  "1111",
  "Matematicas",
  "5"
);
const profesor2 = new Ordinario(2, "Andres", "Teller", "2222", "Fisica", "7");
const profesor3 = new Contratado(
  3,
  "Sebastian",
  "Enamorado",
  "3333",
  "Base de Datos",
  "2023-05-02",
  "2025-01-01"
);

const profesores = [profesor1, profesor2, profesor3];
const profesores2 = [profesor1, profesor2];
const profesores3 = [profesor3];

// Fin Prueba

let dataTable,
  dataTableIsInitialized = false;

const dataTableOptions = {
  columnDefs: [
    { className: "centered", targets: [0, 1, 2, 3, 4, 5] },
    { orderable: false, targets: [5] },
  ],
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

  addDataTodos(profesores, $tableBodyUsers);

  dataTable = $("#data-table-users").DataTable(dataTableOptions);
  dataTableIsInitialized = true;
};

window.addEventListener("load", () => {
  initDataTable();
  $trHeadUser = d.getElementById("tr-head-users");
});

window.prueba = function (id) {
  const obj = profesores.find((profesor) => profesor.id === id);
  console.log(obj);
};

/************************Evento para dinamizar la tabla*****************************/
let anterior = null;
$select.addEventListener("change", (e) => {
  // Todos
  if ($select.value === "todos") {
    if (dataTableIsInitialized) {
      dataTable.destroy();
    }
    if (anterior === "ordinario") {
      $trHeadUser.children[4].nextElementSibling.remove();
    }
    if (anterior === "contratado") {
      $trHeadUser.children[4].nextElementSibling.remove();
      $trHeadUser.children[4].nextElementSibling.remove();
    }
    anterior = $select.value;
    addDataTodos(profesores, $tableBodyUsers);
    dataTable = $("#data-table-users").DataTable(dataTableOptions);
    dataTableIsInitialized = true;
  }
  // Ordinario
  if ($select.value === "ordinario") {
    if (dataTableIsInitialized) {
      dataTable.destroy();
    }
    if (anterior === "contratado") {
      $trHeadUser.children[4].nextElementSibling.remove();
      $trHeadUser.children[4].nextElementSibling.remove();
    }
    anterior = $select.value;
    const cont = `<th>YearService</th>`;
    $trHeadUser.children[4].insertAdjacentHTML("afterend", cont);
    while ($tableBodyUsers.firstChild) {
      $tableBodyUsers.removeChild($tableBodyUsers.firstChild);
    }
    addDataOrdinario(profesores2, $tableBodyUsers);
    dataTable = $("#data-table-users").DataTable(dataTableOptions);
    dataTableIsInitialized = true;
  }
  // Contratado
  if ($select.value === "contratado") {
    if (dataTableIsInitialized) {
      dataTable.destroy();
    }
    if (anterior === "ordinario") {
      $trHeadUser.children[4].nextElementSibling.remove();
    }
    anterior = $select.value;
    const cont = `<th>Start Date</th>
                  <th>End Date</th>`;
    $trHeadUser.children[4].insertAdjacentHTML("afterend", cont);
    while ($tableBodyUsers.firstChild) {
      $tableBodyUsers.removeChild($tableBodyUsers.firstChild);
    }
    addDataContratado(profesores3, $tableBodyUsers);
    dataTable = $("#data-table-users").DataTable(dataTableOptions);
    dataTableIsInitialized = true;
  }
  console.log(anterior);
});
