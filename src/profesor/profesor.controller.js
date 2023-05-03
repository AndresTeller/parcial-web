import { filtrarProfesores } from "./filtrar-profesores.js";
import { pool } from "../../db/db.js";

export const getProfesores = async (req, res) => {
  try {
    const profesores = [];
    const [ordinarios] = await pool.query(
      "select p.*, o.year_service from profesor p inner join ordinario o on p.nit = o.nit_profesor;"
    );

    ordinarios.map((ordinario) => (ordinario.tipo = "ordinario"));

    const [contratados] = await pool.query(
      "select p.*, c.start_date, c.end_date from profesor p inner join contratado c on p.nit = c.nit_profesor; "
    );

    contratados.map((contratado) => (contratado.tipo = "contratado"));

    profesores.push(ordinarios, contratados);

    res.json({
      success: true,
      data: profesores,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something goes wrong.",
    });
  }
};

export const getProfesor = async (req, res) => {
  try {
    const [contratado] = await pool.query(
      `select p.*, c.start_date, c.end_date from profesor p inner join contratado c on p.nit = c.nit_profesor where p.nit = (?); 
`,
      [req.params.nit]
    );

    const [ordinario] = await pool.query(
      `select p.*, o.year_service from profesor p inner join ordinario o on p.nit = o.nit_profesor where p.nit = ?;`,
      [req.params.nit]
    );

    ordinario.map((data) => (data.tipo = "ordinario"));
    contratado.map((data) => (data.tipo = "contratado"));

    const profesor = contratado.length === 0 ? ordinario : contratado;

    res.json({
      success: true,
      data: profesor,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something goes wrong.",
    });
  }
};

export const createProfesor = async (req, res) => {
  try {
    const profesores = req.body;

    const { ordinarios, contratados } = filtrarProfesores(profesores);

    for (const ordinario of ordinarios) {
      const { name, lastname, nit, dedication, yearService } = ordinario;
      await pool.query(
        `INSERT INTO profesor (nit, name, lastname,  dedication) VALUES (?,?,?,?)`,
        [nit, name, lastname, dedication]
      );
      await pool.query(
        `INSERT INTO ordinario (nit_profesor, year_service) VALUES (?,?)`,
        [nit, yearService]
      );
    }

    for (const contratado of contratados) {
      const { name, lastname, nit, dedication, startDate, endDate } =
        contratado;
      await pool.query(
        `INSERT INTO profesor (nit, name, lastname,  dedication) VALUES (?,?,?,?)`,
        [nit, name, lastname, dedication]
      );
      await pool.query(
        `INSERT INTO contratado (nit_profesor, start_date, end_date) VALUES (?,?,?)`,
        [nit, startDate, endDate]
      );
    }
    res.json({
      success: true,
      message: "Ok",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something goes wrong.",
    });
  }
};

export const updateProfesor = async (req, res) => {
  //POR TERMINAR...
  try {
    const nit = req.params.nit;
    const { name, lastname, dedication, yearService, startDate, endDate } = req.body;

    const ordinario = await pool.query(
      `UPDATE profesor INNER JOIN ordinario ON profesor.nit = ordinario.nit_profesor SET profesor.name = ?, profesor.lastname = ?, profesor.dedication = ?, ordinario.year_service = ? WHERE profesor.nit = ?;
`,[name, lastname, dedication, yearService, nit]
    );

    const contratado = await pool.query(
      `UPDATE profesor INNER JOIN contratado ON profesor.nit = contratado.nit_profesor SET profesor.name = ?, profesor.lastname = ?, profesor.dedication = ?, contratado.start_date = ?, contratado.end_date = ? WHERE profesor.nit = ?;`,
      [name, lastname, dedication, startDate, endDate, nit]
    );

    res.json({
      success: true,
      data: profesor,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something goes wrong.",
    });
  }
};

export const deleteProfesor = async (req, res) => {
  try {
    await pool.query(`DELETE FROM ordinario WHERE nit_profesor = ?;`, [
      req.params.nit,
    ]);

    await pool.query(`DELETE FROM contratado WHERE nit_profesor = ?;`, [
      req.params.nit,
    ]);

    await pool.query(`DELETE FROM profesor WHERE nit = ?;`, [req.params.nit]);

    res.json({
      success: true,
      data: "Ok",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something goes wrong.",
    });
  }
};
