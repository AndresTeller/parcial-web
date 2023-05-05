//UTILITY
const isEmpty = (input = "") => {
  return input.trim().length === 0;
};

const isNumber = (number = 0) => {
  return !isNaN(number);
};

const containNumber = (input = "") => {
  return /\d/.test(input);
};

const isPositiveNumber = (number = 0) => {
  return number > 0;
};

const exceedMaxLength = (input = "", maxLength = 0) => {
  return input.length > maxLength;
};

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

export const validateYearService = (year = 0) => {
  const result = {
    ok: true,
    message: "El año fue agregado correctamente."
  }

  if (isEmpty(year+"")) {
    result.ok = false;
    result.message = "El campo de años de servicio no puede estar vacío."
    return result;
  }

  if (!isNumber(year)) {
    result.ok = false;
    result.message = "Los años de servicio solo admiten números"
    return result;
  }

  if (!isPositiveNumber(year)) {
    result.ok = false;
    result.message = "Los años de servicio deben ser positivos.";
    return result;
  }

  if (year <= 0 || year > 60) {
    result.ok = false;
    result.message = "Los años de servicio deben ser superiores que 0 e inferiores que 60 años."
    return result;
  }  

  return result;
};

export const validateNit = (nit) => {
  const result = {
    ok: true,
    message: "El nit se agrego correctamente"
  }

  if (isEmpty(nit)) {
    result.ok = false;
    result.message = "El nit no puede estar vacio";
    return result;
  }

  if (!isNumber(nit)) {
    result.ok = false;
    result.message = "El nit tiene que ser un numero";
    return result;
  }

  if (!isPositiveNumber(nit)) {
    result.ok = false;
    result.message = "El nit tiene que ser un numero positivo";
    return result;
  } 

  if (exceedMaxLength(nit, 12)) {
    result.ok = false;
    result.message = "El nit no puede ser mas de doce digitos";
    return result;
  }

  return result;
}