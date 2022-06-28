/**
 * inicializar el proyecto por defecto
 * > npm init -y
 * 
 * instalar el paquete express
 * > npm i express
 * 
 * instalar el paquete pg para conectarse a postgressql
 * > npm i pg
 * 
 * instalar nodemon como dependencia de desarrollo
 * > npm i nodemon -D
 */

/* constante para llamar a express. */
const express = require('express');
const app = express();

/* funciones creadas en el archivo consultasBD.js */
const { listar, agregar, actualizar, eliminar } = require('./consultasBD');

/* Se definen los middleware. */
/* Los middleware son funciones que se deben ser declaradas antes que las rutas y sirven como filtro para manejar rutas de carpetas
o un punto previo, en donde se pueden definir diferentes validaciones. */
/* se agrega de forma publica la carpeta public, donde dentro estara la carpeta imgs. */
/* Al realizar peticiones POST o PUT, el cuerpo de una peticion (payload), contiene información para crear una nuevo registro o 
actualizar uno ya existente. El paquete body-parser permite realizar esta tarea. Solo se requiere instalar body-parser y 
habilitar json() así como url-encode como middlewares para convertir datos a JSON. */
/* extended: false utiliza la librería "querystring". */
/* extended: false precisa que el objeto req.body vendra con valores en formato de cadenas de consulta. */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(3000, console.log("Servidor corriendo en http://localhost:3000/"));

/* primera ruta al path vacio (ruta raiz) */
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

/* ruta /cursos utilizando verbo GET para obtener la lista de cursos. */
/* utilizando un .then() se envia el resultado obtenido desde consultaBD.js */
/* en caso que se produsca un error .catch() la atrapara y utilizando un codigo 500, se indica que se produjo un error al
tratar de obtener la información. */
app.get("/cursos", (req, res) => {
    listar()
        .then(resultado => res.send(resultado))
        .catch(error => res.status(500).send({code: 500, message: 'Ha ocurrido un error al listar los datos de la BD'}))
})

/* ruta /cursos utilizando verbo POST para agregar un nuevo curso en la BD. */
/* desde el fomulario, en el body se envia el payload con las variables las cuales se recibiran dentro de un destructuring. */
/* con la informacion recibida, se crea un arreglo llamado datos, que luego se pasaran a la función agregar. */
/* al utilizar express.urlencoded ya no es necesario recibir la data con req.body y luego utilizar el metodo req.on() y juntar
los pedazos chunk en una función. Esta es una de las ventajas de Express. */
app.post("/cursos", (req, res) => {
    let { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    let datos = [nombre, nivelTecnico, fechaInicio, duracion];
    agregar(datos)
        .then(resultado => res.send(resultado))
        .catch(error => res.status(500).send({code: 500, message: 'Ha ocurrido un error al agregar un nuevo curso en la BD'}))
})

/* ruta /cursos utilizando verbo PUT para modificar un curso de la BD. */
/* en el caso de actualizar, es necesario recibir el id, para saber cual es el registro que se nececita cambiar. */
app.put("/cursos", (req, res) => {
    let { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    let datos = [id, nombre, nivelTecnico, fechaInicio, duracion];
    actualizar(datos)
        .then(resultado => res.send(resultado))
        .catch(error => res.status(500).send({code: 500, message: 'Ha ocurrido un error al actualizar el curso en la BD'}))
})

/* ruta /cursos utilizando verbo DELETE para eliminar un curso de la BD. */
/* se requiere el parametro de id para eliminar solo el registro en el cual se presiono el boton eliminar. */
app.delete("/cursos/:id", (req, res) => {
    let id = req.params.id;
    eliminar(id)
        .then(resultado => res.send(resultado))
        .catch(error => res.status(500).send({code: 500, message: 'Ha ocurrido un error al eliminar los datos de la BD'}))
})

/* Ruta genérica para cualquier endpoint no declarado. */
app.get("*", (req, res) => {
    res.status(404);
    res.send("<h1>ERROR 404</h1><h3>Página no encontrada.</h3>");
})