//UTILITY
const isEmpty = (input = "") => {
  return input.trim().length === 0;
};

const isNumber = (number = 0) => {
  return !isNaN(number);
};

const containNumber = (input = "") => {
  return /\d/.test(input);
}

const isPositiveNumber = (number = 0) => {
  return number > 0;
};

const exceedMaxLength = (input = "", maxLength = 0) => {
  return input.length > maxLength;
}

//VALIDATIONS
export const validateName = (name = "") => {
  const result = {
    ok: true,
    message: "Nombre agregado correctamente.",
  };

  if (isEmpty(name)) {
    result.ok = false;
    result.message = "El nombre no puede quedar vacío.";
    return result;
  }

  if (containNumber(name)) {
    result.ok = false;
    result.message = "El nombre no puede contener números";
    return result;
  }

  if (exceedMaxLength(name, 20)) {
    result.ok = false;
    result.message = `El nombre excede el máximo de 20 caracteres.`
    return result;
  }

  return result;
};

export const validateLastname = (lastname = "") => {
   const result = {
     ok: true,
     message: "Apellido agregado correctamente.",
   };

   if (isEmpty(lastname)) {
     result.ok = false;
     result.message = "El apellido no puede quedar vacío.";
     return result;
   }

   if (containNumber(lastname)) {
     result.ok = false;
     result.message = "El apellido no puede contener números";
     return result;
   }

   if (exceedMaxLength(lastname, 20)) {
     result.ok = false;
     result.message = `El apellido excede el máximo de 20 caracteres.`;
     return result;
   }

   return result;
}

export const validateDedication = (dedication = "") => {
  const result = {
    ok: true,
    message: "Dedicación agregado correctamente.",
  };

  if (isEmpty(dedication)) {
    result.ok = false;
    result.message = "La dedicación no puede quedar vacío.";
    return result;
  }

  if (containNumber(dedication)) {
    result.ok = false;
    result.message = "La dedicación no puede contener números";
    return result;
  }

  if (exceedMaxLength(dedication, 30)) {
    result.ok = false;
    result.message = `La dedicación excede el máximo de 30 caracteres.`;
    return result;
  }

  return result;
};

export const validateDates = (startDate, endDate) => {
  const result = {
    ok: true,
    message: "Fechas agregadas correctamente"
  }

  if (startDate === "" || endDate === "") {
    result.ok = false;
    result.message = "Las fechas deben ser seleccionadas.";
    return result;
  }

  let start = new Date(startDate);
  let end = new Date(endDate);

  if (start >= end) {
    result.ok = false;
    result.message = "La fecha de fin debe ser posterior a la fecha de inicio."
    return result;
  }

  return result;
}
