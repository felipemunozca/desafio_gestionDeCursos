CREATE DATABASE cursos;

CREATE TABLE cursos (
	id SERIAL PRIMARY KEY, 
	nombre VARCHAR(50), 
	nivel INT, 
	fecha DATE, 
	duracion INT
);

SELECT * FROM cursos;