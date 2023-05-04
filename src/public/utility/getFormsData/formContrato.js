import { Contratado } from "../../../contratado/contratado.model.js";
import { validationsContratado } from "../validation/validationsContratado.js";
import { createProfesores } from "../../../profesor/utility/fetch-profesores.js";
const d = document;

// ELEMENTOS DEL HTML
const $btnGuardar = d.getElementById("btn-guardar"),
  $inputName = d.getElementById("input-name"),
  $inputLastName = d.getElementById("input-lastName"),
  $inputNit = d.getElementById("input-nit"),
  $inputDedication = d.getElementById("input-dedication"),
  $starDate = d.getElementById("input-start-date"),
  $endDate = d.getElementById("input-end-date"),
  $btnInvisible = d.getElementById("button-invisible"),
  $messageSucces = d.getElementById("message-succes"),
  $messageFailed = d.getElementById("message-failed"),
  $containerType = d.getElementById("container-btn-type"),
  $containerDecicion = d.getElementById("container-btn-decicion"),
  $btnSi = d.getElementById("btn-si"),
  $btnNo = d.getElementById("btn-no"),
  $titulo = d.querySelector(".titulo-modal");

const profesores = [];

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

$btnGuardar.addEventListener("click", (e) => {
  e.preventDefault();

  const profesor = new Contratado(
    $inputName.value,
    $inputLastName.value,
    $inputNit.value,
    $inputDedication.value,
    $starDate.value,
    $endDate.value
  );

  let messageValidation = validationsContratado(
    $inputName.value,
    $inputLastName.value,
    $inputNit.value,
    $inputDedication.value,
    $starDate.value,
    $endDate.value
  );

  if (messageValidation === true) {
    if (localStorage.getItem("profesores") !== null) {
      const recibido = JSON.parse(localStorage.getItem("profesores"));
      recibido.push(profesor);
      localStorage.setItem("profesores", JSON.stringify(recibido));
      activeSucessMessage();
      modalWindow();
    } else {
      profesores.push(profesor);
      localStorage.setItem("profesores", JSON.stringify(profesores));
      activeSucessMessage();
      modalWindow();
    }
  } else {
    $messageFailed.textContent = messageValidation;
    $messageFailed.classList.toggle("visible");
    setTimeout(() => {
      $messageFailed.classList.toggle("visible");
    }, 4000);
  }
  console.log("Hola");
});

$btnSi.addEventListener("click", () => {
  $titulo.textContent = "¿Tipo?";
  $containerDecicion.classList.toggle("visible");
  $containerType.classList.toggle("visible");
});

const addType = (profesores) => {
  for (const profesor of profesores) {
    "yearService" in profesor
      ? (profesor.tipo = "ordinario")
      : (profesor.tipo = "contratado");
  }
  return profesores;
};

$btnNo.addEventListener("click", () => {
  const profesores = JSON.parse(localStorage.getItem("profesores"));
  const data = addType(profesores);
  createProfesores(data, "http://localhost:3000/api/v1/profesores");
  localStorage.removeItem("profesores");
});