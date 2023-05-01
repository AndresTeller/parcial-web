export const addData = (profesores, $tableBody) => {
  let content = ``;
  profesores.forEach((profesor, index) => {
    const { name, lastname, dedication, id, nit } = profesor;
    content += `
    <tr>
      <td>${id}</td>
      <td>${name}</td>
      <td>${lastname}</td>
      <td>${nit}</td>
      <td>${dedication}</td>
      <td>
        <buttom class="btn btn-sm btn-primary" onclick="prueba(${id});">
          <i class="fa-solid fa-pencil"></i>
        </buttom>
        <buttom class="btn btn-sm btn-danger">
          <i class="fa-solid fa-trash-can"></i>
        </buttom>
      </td>
    </tr>`;
  });
  $tableBody.innerHTML = content;
};
