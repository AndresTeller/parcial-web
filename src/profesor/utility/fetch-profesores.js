export const createProfesores = async (profesores, url) => {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(profesores),
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok)
      throw { status: response.status, statusText: response.statusText };

    const json = await response.json();
    return json;
  } catch (error) {
    const message = error.statusText || "Something goes wrong.";
    console.log(`Error ${error.status}: ${message}.
    ${error.description}`);
  }
};

export const getProfesores = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw { status: response.status, statusText: response.statusText };

    const json = await response.json();
    return json;
  } catch (error) {
    const message = error.statusText || "Something goes wrong.";
    console.log(`Error ${error.status}: ${message}.
    ${error.description}`);
  }
};

export const getProfesor = async (url) => {
try {
  const response = await fetch(url);
  if (!response.ok)
    throw { status: response.status, statusText: response.statusText };

  const json = await response.json();
  return json;
} catch (error) {
  const message = error.statusText || "Something goes wrong.";
  console.log(`Error ${error.status}: ${message}.
    ${error.description}`);
}
};

export const updateProfesor = async (profesor, url) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profesor),
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok)
      throw { status: response.status, statusText: response.statusText };

    const json = await response.json();
    return json;
  } catch (error) {
    const message = error.statusText || "Something goes wrong.";
    console.log(`Error ${error.status}: ${message}.
    ${error.description}`);
  }
};

export const deleteProfesor = async (url) => {
  const options = {
    method: "DELETE",
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok)
      throw { status: response.status, statusText: response.statusText };

    const json = await response.json();
    return json;
  } catch (error) {
    const message = error.statusText || "Something goes wrong.";
    console.log(`Error ${error.status}: ${message}.
    ${error.description}`);
  }
};
