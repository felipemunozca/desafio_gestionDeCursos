const { Pool } = require('pg');

const pool = new Pool({
    user: 'felipe',
    host: 'localhost',
    password: '123456',
    port: 5432,
    database: 'cursos',
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
});

const listar = () => {
    return new Promise(async (resolve, reject) => {

        const consulta = {
            text: "SELECT id, nombre, nivel, TO_CHAR(fecha, 'yyyy-mm-dd') AS fecha, duracion FROM cursos ORDER BY id;"
        }
        try {
            const respuesta = await pool.query(consulta);
            resolve(respuesta.rows)
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
            reject(error)            
        }
    })
}

const agregar = (datos) => {
    return new Promise(async (resolve, reject) => {
        const consulta = {
            text: "INSERT INTO cursos(nombre, nivel, fecha, duracion) VALUES($1, $2, $3, $4) RETURNING *;",
            values: datos
        }
        try {
            const respuesta = await pool.query(consulta);
            resolve(respuesta.rows[0])
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
            reject(error)            
        }
    })
}

const actualizar = (datos) => {
    return new Promise(async (resolve, reject) => {
        const consulta = {
            text: "UPDATE cursos SET nombre = $2, nivel = $3, fecha = $4, duracion = $5 WHERE id = $1 RETURNING *;",
            values: datos
        }
        try {
            const respuesta = await pool.query(consulta);
            resolve(respuesta.rows[0])
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
            reject(error)            
        }
    })
}

const eliminar = (id) => {
    return new Promise(async (resolve, reject) => {
        const consulta = {
            text: "DELETE FROM cursos WHERE id = $1 RETURNING *;",
            values: [id]
        }
        try {
            const respuesta = await pool.query(consulta);
            resolve(respuesta.rows[0])
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
            reject(error)            
        }
    })
}

module.exports = { listar, agregar, actualizar, eliminar }