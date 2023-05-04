import { Contratado } from "../contratado/contratado.model.js";
import { Ordinario } from "../ordinario/ordinario.model.js";
import { addDataOrdinario } from "./utility/addDinamicData/addDataOrdinario.js";
import { addDataTodos } from "./utility/addDinamicData/addDataTodos.js";
import { addDataContratado } from "./utility/addDinamicData/addDataContratado.js";
import { destroyDataTable } from "./utility/controlDataTable/destroyDataTable.js";

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

const initializeDataTable = () => {
  dataTable = $("#data-table-users").DataTable(dataTableOptions);
  dataTableIsInitialized = true;
};

const initDataTable = () => {
  if (dataTableIsInitialized) {
    dataTable.destroy();
  }

  addDataTodos(profesores, $tableBodyUsers);
  initializeDataTable();
};

window.addEventListener("load", () => {
  initDataTable();
  $trHeadUser = d.getElementById("tr-head-users");
});

window.prueba = function (id) {
  const obj = profesores.find((profesor) => profesor.id === id);
  console.log(obj);
};

//*********************************************************
//**********-EVENTOS Y FUNCIONES DE TABLA DINAMICA-********
//*********************************************************
let anterior = null;

const addThOrdinary = () => {
  const th = `<th>YearService</th>`;
  $trHeadUser.children[4].insertAdjacentHTML("afterend", th);
};

const addThContratado = () => {
  const th = `<th>Start Date</th>
                  <th>End Date</th>`;
  $trHeadUser.children[4].insertAdjacentHTML("afterend", th);
};

const removeThContratado = () => {
  if (anterior === "contratado") {
    $trHeadUser.children[4].nextElementSibling.remove();
    $trHeadUser.children[4].nextElementSibling.remove();
  }
};

const removeThOrdinario = () => {
  if (anterior === "ordinario") {
    $trHeadUser.children[4].nextElementSibling.remove();
  }
};

const removeElementsTableBody = () => {
  while ($tableBodyUsers.firstChild) {
    $tableBodyUsers.removeChild($tableBodyUsers.firstChild);
  }
};

$select.addEventListener("change", (e) => {
  // TYPE TODOS
  if ($select.value === "todos") {
    destroyDataTable(dataTable, dataTableIsInitialized);
    removeThOrdinario();
    removeThContratado();
    anterior = $select.value;
    addDataTodos(profesores, $tableBodyUsers);
    initializeDataTable();
  }
  // TYPE ORDINARIO
  if ($select.value === "ordinario") {
    destroyDataTable(dataTable, dataTableIsInitialized);
    removeThContratado();
    anterior = $select.value;
    addThOrdinary();
    removeElementsTableBody();
    addDataOrdinario(profesores2, $tableBodyUsers);
    initializeDataTable();
  }
  // TYPE CONTRATADO
  if ($select.value === "contratado") {
    destroyDataTable(dataTable, dataTableIsInitialized);
    removeThOrdinario();
    anterior = $select.value;
    addThContratado();
    removeElementsTableBody();
    addDataContratado(profesores3, $tableBodyUsers);
    initializeDataTable();
  }
});
