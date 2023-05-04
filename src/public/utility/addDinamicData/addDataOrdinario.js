export const addDataOrdinario = (profesores, $tableBody) => {
  let content = ``;
  profesores.forEach((profesor, index) => {
    const { name, lastname, dedication, id, nit, year_service } = profesor;
    content += `
    <tr>
      <td>${index + 1}</td>
      <td>${name}</td>
      <td>${lastname}</td>
      <td>${nit}</td>
      <td>${dedication}</td>
      <td>${year_service}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="prueba(${id});">
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="btn btn-sm btn-danger">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>`;
  });
  $tableBody.innerHTML = content;
};
