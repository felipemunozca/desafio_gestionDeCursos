
const express = require('express');
const app = express();

const { listar, agregar, actualizar, eliminar } = require('./consultasBD');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(3000, console.log("Servidor corriendo en http://localhost:3000/"));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

/* 2. Crear una ruta GET /cursos que consulte y devuelva los registros almacenados en la
tabla cursos */
app.get("/cursos", (req, res) => {
    listar()
        .then(resultado => res.send(resultado))
        .catch(error => res.status(500).send({code: 500, message: 'Ha ocurrido un error al listar los datos de la BD'}))
})

/* 1. Crear una ruta POST /curso que reciba un payload desde el cliente con los datos de
un nuevo curso y los ingrese a la tabla cursos. */
app.post("/cursos", (req, res) => {
    let { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    let datos = [nombre, nivelTecnico, fechaInicio, duracion];
    agregar(datos)
        .then(resultado => res.send(resultado))
        .catch(error => res.status(500).send({code: 500, message: 'Ha ocurrido un error al agregar un nuevo curso en la BD'}))
})

/* 3. Crear una ruta PUT /curso que reciba un payload desde el cliente con los datos de un
curso ya existente y actualice su registro en la tabla cursos. */
app.put("/cursos", (req, res) => {
    let { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    let datos = [id, nombre, nivelTecnico, fechaInicio, duracion];
    actualizar(datos)
        .then(resultado => res.send(resultado))
        .catch(error => res.status(500).send({code: 500, message: 'Ha ocurrido un error al actualizar el curso en la BD'}))
})

/* 4. Crear una ruta DELETE /cursos que reciba el id de un curso como parámetro de la
ruta y elimine el registro relacionado en la tabla cursos. */
app.delete("/cursos/:id", (req, res) => {
    let id = req.params.id;
    eliminar(id)
        .then(resultado => res.send(resultado))
        .catch(error => res.status(500).send({code: 500, message: 'Ha ocurrido un error al eliminar los datos de la BD'}))
})

app.get("*", (req, res) => {
    res.status(404);
    res.send("<h1>ERROR 404</h1><h3>Página no encontrada.</h3>");
})