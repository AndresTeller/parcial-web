export const validationsOrdanary = (
  $name,
  $lastName,
  $nit,
  $dedication,
  $yearService
) => {
  if ($name === "") {
    return "El campo name esta vacio";
  }
  if ($lastName === "") {
    return "El campo LastName esta vacio";
  }
  if ($nit === "") {
    return "El campo NIT esta vacio";
  }
  if ($dedication === "") {
    return "El campo dedication esta vacio";
  }
  if ($yearService === "") {
    return "El campo Years Services esta vacio";
  }
  return true;
};
