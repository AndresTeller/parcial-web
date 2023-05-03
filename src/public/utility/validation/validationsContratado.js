export const validationsContratado = (
  $name,
  $lastName,
  $nit,
  $dedication,
  $startDate,
  $endDate
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
  if ($startDate === "") {
    return "El campo Start Date esta vacio";
  }
  if ($endDate === "") {
    return "El campo End Date esta vacio";
  }
  return true;
};
