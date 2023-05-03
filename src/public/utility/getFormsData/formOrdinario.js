import { Ordinario } from "../../../ordinario/ordinario.model.js";
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

d.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target === $btnEnviar) {
    const profesor = new Ordinario(
      undefined,
      $inputName.value,
      $inputLastName.value,
      $inputNit.value,
      $inputDedication.value,
      $inputYearService.value
    );
    let messageValidation = validationsOrdanary(
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
  $containerType.classList.toggle("visible")
})

