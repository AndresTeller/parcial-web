import { Contratado } from "../contratado/contratado.model.js";
import { Ordinario } from "../ordinario/ordinario.model.js";
import { addDataOrdinario } from "./utility/addDinamicData/addDataOrdinario.js";
import { addDataTodos } from "./utility/addDinamicData/addDataTodos.js";
import { addDataContratado } from "./utility/addDinamicData/addDataContratado.js";
import { destroyDataTable } from "./utility/controlDataTable/destroyDataTable.js";
import {
  deleteProfesor,
  getProfesores,
} from "../profesor/utility/fetch-profesores.js";

const d = document,
  $tableBodyUsers = d.getElementById("table-body-users"),
  $select = d.getElementById("select");

let $trHeadUser = null;

// Funciones de los botones de tabla

window.borrar = function (nit) {
  console.log(nit);
  deleteProfesor(`http://localhost:3000/api/v1/profesores/${nit}`);
  location.reload();
};

let dataTable,
  dataTableIsInitialized = false;

let dataTableOptions = {
  pageLength: 5,
  columnDefs: [
    { className: "centered", targets: [0, 1, 2, 3, 4, 5] },
    { orderable: false, targets: [5, 0, 3, 4] },
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

const initializeDataTable = (options) => {
  dataTable = $("#data-table-users").DataTable(options);
  dataTableIsInitialized = true;
};

let fetchProfesores = null;
let arrayOrdinarios = [];
let arrayContratados = [];
let profesores = [];
window.addEventListener("load", async () => {
  fetchProfesores = await getProfesores(
    "http://localhost:3000/api/v1/profesores"
  );
  destroyDataTable(dataTable, dataTableIsInitialized);
  profesores = fetchProfesores.data[0].concat(fetchProfesores.data[1]);
  arrayOrdinarios = fetchProfesores.data[0];
  arrayContratados = fetchProfesores.data[1];
  console.log(arrayContratados, arrayOrdinarios);
  addDataTodos(profesores, $tableBodyUsers);
  initializeDataTable(dataTableOptions);
  $trHeadUser = d.getElementById("tr-head-users");
});

window.edit = function (nit) {
  let encontrado = null;
  for (const profesor of profesores) {
    if (profesor.nit === nit) {
      encontrado = profesor;
    }
  }
  if (encontrado.tipo === "ordinario") {
    localStorage.setItem("editable", JSON.stringify(encontrado));
    window.location.href = "../pages/edit-ordinario.html";
  } else {
    localStorage.setItem("editable", JSON.stringify(encontrado));
    window.location.href = "../pages/edit-contratado.html";
  }
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
    dataTableOptions.columnDefs = [
      { className: "centered", targets: [0, 1, 2, 3, 4, 5] },
      { orderable: false, targets: [0, 3, 4, 5] },
    ];
    initializeDataTable(dataTableOptions);
  }
  // TYPE ORDINARIO
  if ($select.value === "ordinario") {
    destroyDataTable(dataTable, dataTableIsInitialized);
    removeThContratado();
    anterior = $select.value;
    addThOrdinary();
    removeElementsTableBody();
    addDataOrdinario(fetchProfesores.data[0], $tableBodyUsers);
    dataTableOptions.columnDefs = [
      { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
      { orderable: false, targets: [0, 3, 4, 5, 6] },
    ];
    initializeDataTable(dataTableOptions);
  }
  // TYPE CONTRATADO
  if ($select.value === "contratado") {
    destroyDataTable(dataTable, dataTableIsInitialized);
    removeThOrdinario();
    anterior = $select.value;
    addThContratado();
    removeElementsTableBody();
    addDataContratado(fetchProfesores.data[1], $tableBodyUsers);
    dataTableOptions.columnDefs = [
      { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6, 7] },
      { orderable: false, targets: [0, 3, 4, 5, 6, 7] },
      { width: "10%", targets: [5, 6]}];
    initializeDataTable(dataTableOptions);
  }
});
