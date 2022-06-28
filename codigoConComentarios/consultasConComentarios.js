/* Se crea una Clase que requiera al paquete pg. */
const { Pool } = require('pg');

/* Se crea una constante "pool" la que sera igual a la clase Pool a la que se le pasaran los parametros de conexion a la BD. */
/* max: cantidad maxima de clientes conectados. */
/* idleTimeoutMillis: cantidad en milisegundos que un usuario puede permanecer inactivo, si pasa el tiempo, es desconectado. */
/* connectionTimeoutMillis: cantidad en milisegundos que deben transcurrir ante que se agote el tiempo de espera para conectar 
un nuevo cliente. */
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

/* se retorna una promesa de forma asincronica, la cual se puede resolver o rechazar. */
/* luego la respuesta puede ser capturada por el then() o el catch() definidos en cada ruta en el archivo index.js */
/* utilizando resolve, se devuelve la informacion de las filas. Es similar a utilizar un return. */
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
        /* utilizar TO_CHAR para definir el formato de la fecha como se muestra en el ejemplo del desafio. */
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