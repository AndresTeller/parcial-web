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
    </tr>`;
  });
  $tableBody.innerHTML = content;
};
