import { Ordinario } from "../../../ordinario/ordinario.model.js";
import { updateProfesor } from "../../../profesor/utility/fetch-profesores.js";
import { validationsOrdanary } from "../validation/validationsOrdinary.js";

const d = document;

const $btnEnviar = d.getElementById("btn-guardar"),
  $inputName = d.getElementById("input-name"),
  $inputLastName = d.getElementById("input-lastName"),
  $inputNit = d.getElementById("input-nit"),
  $inputDedication = d.getElementById("input-dedication"),
  $inputYearService = d.getElementById("input-years-services"),
  $btnInvisible = d.getElementById("button-invisible"),
  $messageSucces = d.getElementById("message-succes"),
  $messageFailed = d.getElementById("message-failed"),
  $spanSave = d.querySelector(".texto-save"),
  $containerSpinner = d.querySelector(".container-spinner"),
  $btnCancelar = d.getElementById("btn-cancelar");

const modalWindow = () => {
  $btnInvisible.setAttribute("data-bs-toggle", "modal");
  $btnInvisible.setAttribute("data-bs-target", "#staticBackdrop");
  setTimeout(function () {
    $btnInvisible.click();
  }, 2000);
};

const activeSucessMessage = () => {
  $messageSucces.classList.toggle("visible");
  setTimeout(() => {
    $messageSucces.classList.toggle("visible");
  }, 2000);
};

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
    activeSucessMessage();
    modalWindow();
    setTimeout(() => {
      $containerSpinner.classList.toggle("visible");
      $spanSave.classList.toggle("visible");
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1000);
    }, 4000);
  } else {
    $messageFailed.textContent = message;
    $messageFailed.classList.toggle("visible");
    setTimeout(() => {
      $messageFailed.classList.toggle("visible");
    }, 4000);
  }
});

$btnCancelar.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../index.html";
});
