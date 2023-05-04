import { Ordinario } from "../../../ordinario/ordinario.model.js";
import { updateProfesor } from "../../../profesor/utility/fetch-profesores.js";
import { validationsOrdanary } from "../validation/validationsOrdinary.js";

const d = document;

const $btnEnviar = d.getElementById("btn-guardar"),
  $inputName = d.getElementById("input-name"),
  $inputLastName = d.getElementById("input-lastName"),
  $inputNit = d.getElementById("input-nit"),
  $inputDedication = d.getElementById("input-dedication"),
  $inputYearService = d.getElementById("input-years-services");

window.addEventListener("load", () => {
  let editable = localStorage.getItem("editable");
  let profesor = JSON.parse(editable);
  $inputName.value = profesor.name;
  $inputLastName.value = profesor.lastname;
  $inputNit.value = profesor.nit;
  $inputDedication.value = profesor.dedication;
  $inputYearService.value = profesor.year_service;
  console.log(profesor);
});

$btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  let message = validationsOrdanary(
    $inputName.value,
    $inputLastName.value,
    $inputNit.value,
    $inputDedication.value,
    $inputYearService.value
  );
  if (message === true) {
    const profesor = new Ordinario(
      $inputName.value,
      $inputLastName.value,
      $inputNit.value,
      $inputDedication.value,
      parseInt($inputYearService.value)
    );
    profesor.tipo = "ordinario";
    updateProfesor(
      profesor,
      `http://localhost:3000/api/v1/profesores/${profesor.nit}`
    );
    localStorage.removeItem("editable");
  } else {
    console.log(message);
  }
  
});
