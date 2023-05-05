import { Ordinario } from "../../../ordinario/ordinario.model.js";
import {
  validateName,
  validateDedication,
  validateLastname,
  validateYearService,
  validateNit
} from "../../../ordinario/ordinario.validations.js";
import { createProfesores } from "../../../profesor/utility/fetch-profesores.js";
import { validationsOrdanary } from "../validation/validationsOrdinary.js";

const d = document;

// ELEMENTOS DEL HTML
const $btnEnviar = d.getElementById("btn-guardar"),
  $inputName = d.getElementById("input-name"),
  $inputLastName = d.getElementById("input-lastName"),
  $inputNit = d.getElementById("input-nit"),
  $inputDedication = d.getElementById("input-dedication"),
  $inputYearService = d.getElementById("input-years-services"),
  $btnInvisible = d.getElementById("button-invisible"),
  $messageFailed = d.getElementById("message-failed"),
  $messageSucces = d.getElementById("message-succes"),
  $containerType = d.getElementById("container-btn-type"),
  $containerDecicion = d.getElementById("container-btn-decicion"),
  $btnSi = d.getElementById("btn-si"),
  $btnNo = d.getElementById("btn-no"),
  $titulo = d.querySelector(".titulo-modal"),
  $containerCorrecto = d.querySelector(".container-correcto"),
  $spanSave = d.querySelector(".texto-save"),
  $containerSpinner = d.querySelector(".container-spinner"),
  $modalContent = d.querySelector("#title-modal"),
  $btnCancelar = d.getElementById("btn-cancelar");

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

const validate = (nombre, apellido, nit, dedicacion, yearService) => {
  let validNombre = validateName(nombre);
  if (!validNombre.ok) return validNombre.message;

  let validApellido = validateLastname(apellido);
  if (!validApellido.ok) return validApellido.message;

  let validNit = validateNit(nit);
  if (!validNit.ok) return validNit.message;

  let validDedicacion = validateDedication(dedicacion);
  if (!validDedicacion.ok) return validDedicacion.message;
  
  let validYear = validateYearService(yearService);
  if (!validYear.ok) return validYear.message;

  return true;
}

d.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target === $btnEnviar) {
    const profesor = new Ordinario(
      $inputName.value,
      $inputLastName.value,
      $inputNit.value,
      $inputDedication.value,
      $inputYearService.value
    );
    let messageValidation = validate(
      $inputName.value,
      $inputLastName.value,
      $inputNit.value,
      $inputDedication.value,
      $inputYearService.value
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
  }
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

$btnNo.addEventListener("click", async () => {
  const profesores = JSON.parse(localStorage.getItem("profesores"));
  const data = addType(profesores);
  await createProfesores(data, "http://localhost:3000/api/v1/profesores");
  localStorage.removeItem("profesores");
  $btnSi.classList.toggle("visible");
  $btnNo.classList.toggle("visible");
  $containerCorrecto.classList.toggle("visible");
  $modalContent.classList.toggle("visible");
  setTimeout(() => {
    $containerSpinner.classList.toggle("visible");
    $spanSave.classList.toggle("visible");
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1000);
  }, 2000);
});

$btnCancelar.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../index.html";
});
