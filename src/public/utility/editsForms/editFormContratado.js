import { validationsContratado } from "../validation/validationsContratado.js";
import { Contratado } from "../../../contratado/contratado.model.js";
import { updateProfesor } from "../../../profesor/utility/fetch-profesores.js";

const d = document;

const $btnEnviar = d.getElementById("btn-guardar"),
  $inputName = d.getElementById("input-name"),
  $inputLastName = d.getElementById("input-lastName"),
  $inputNit = d.getElementById("input-nit"),
  $inputDedication = d.getElementById("input-dedication"),
  $starDate = d.getElementById("input-start-date"),
  $endDate = d.getElementById("input-end-date");

window.addEventListener("load", () => {
  let editable = localStorage.getItem("editable");
  let profesor = JSON.parse(editable);
  $inputName.value = profesor.name;
  $inputLastName.value = profesor.lastname;
  $inputNit.value = profesor.nit;
  $inputDedication.value = profesor.dedication;
  $starDate.value = new Date(profesor.start_date).toISOString().slice(0, 10);
  $endDate.value = new Date(profesor.end_date).toISOString().slice(0, 10);
  console.log(profesor);
});

$btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  let message = validationsContratado(
    $inputName.value,
    $inputLastName.value,
    $inputNit.value,
    $inputDedication.value,
    $starDate.value,
    $endDate.value
  );
  if (message === true) {
    const profesor = new Contratado(
      $inputName.value,
      $inputLastName.value,
      $inputNit.value,
      $inputDedication.value,
      $starDate.value.slice(0, 10),
      $endDate.value.slice(0, 10)
    );
    profesor.tipo = "contratado";
    console.log(profesor);
    updateProfesor(
      profesor,
      `http://localhost:3000/api/v1/profesores/${profesor.nit}`
    );
    localStorage.removeItem("editable");
  } else {
    console.log(message);
  }
});
