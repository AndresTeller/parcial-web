export const addDataTodos = (profesores, $tableBody) => {
  let content = ``;
  profesores.forEach((profesor, index) => {
    let { name, lastname, dedication, nit } = profesor;
    content += `
    <tr>
      <td>${index + 1}</td>
      <td>${name}</td>
      <td>${lastname}</td>
      <td>${nit}</td>
      <td>${dedication}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="edit('${nit}');">
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="borrar('${nit}');">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>`;
  });
  $tableBody.innerHTML = content;
};
