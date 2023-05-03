export const filtrarProfesores = (profesores = []) => {
  return profesores.reduce(
    (acc, profesor) => {
      profesor.tipo === "ordinario"
        ? acc.ordinarios.push(profesor)
        : acc.contratados.push(profesor);
      return acc;
    },
    { ordinarios: [], contratados: [] }
  );
};
