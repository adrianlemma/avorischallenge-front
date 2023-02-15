# avorischallenge-front
Formulario simple para facilitar pruebas y visualizacion de la API generada para el challenge MinData/AvorisTech

> **Desarrollado por [Marcelo Adrian Lemma](https://ar.linkedin.com/in/marcelo-lemma-123b04122).**

> Frontend desarrollado para mostrar y realizar pruebas de una forma mas amigable, al backend generado para el challenge técnico de **[MinData](https://www.mindata.es/)** para proyecto de **[AvorisTech](https://www.avoristravel.com/about)**

## Descripción

Esta aplicación consiste en un formulario para el ingreso de datos de nuevos Estudiantes y sus materias aprobadas. Además de una tabla donde se podrá ver todos los Estudiantes almacenados previamente y al clickear sobre cada uno se verá, en otra tabla, las materias aprobadas del Estudiante seleccionado y sus respectivas calificaciones

Se basa en el patron de diseño **BFF** (Backend for Frontend).

## LLamados al backend

- **Agregar Estudiante**: 
> - Metodo: **POST**
> - URL: [https://{servidor}:{puerto}/avoris/estudiante/save]()

request 
-     {
        "Nombre": "Lechuga",
        "Cantidad":80,
        "fechaFinalizacion": {
            "dia": 25,
            "mes": 11,
            "anio": 2032
        },
        "materiasCursadas": [
            {
                "nombre": "Matematicas",
                "calificacion": 8.9
            },
            ...
        ]
      }

- **Listar Estudiantes**:
> - Metodo: **GET**
> - URL: [https://{servidor}:{puerto}/avoris/estudiante/list]()

response
-     [
        {
            "Nombre": "Lechuga",
            "Cantidad":80,
            "fechaFinalizacion": {
                "fecha": "25 de Noviembre de 2032"
            },
            "materiasCursadas": [
                {
                    "nombre": "Matematicas",
                    "calificacion": 8.9
                },
                ...
            ]
        },
        ...
      ]

## Tecnologías

#### El proyecto fue desarrollado con:

- HTML
- CSS
- Javascript

## Operabilidad

El fron proporcionará las siguientes funcionalidades:


- **Registrar nuevo Estudiante**: Debe ingresarse un nombre válido, una edad válida, una fecha de finalizacion válida según las validaciones (vea el final del documento). Y luego una lista de materias, para esto se utilizan los campos de la derecha del formulario para ingresar Nombre de materia y Calificacion, luego con el botón "Añadir materia" se agregará la materia a la lista que se visualiza a la derecha... Una vez que haya cargado todas las materias, puede presionar el botón "Limpiar" para reiniciar el formulario en caso de que lo haya cargado erroneamente o bien el boton "Registrar" para enviar los datos ingresados para almacenarlos.


- **Visualizar datos de estudiantes**: Puede visualizar los datos de Estudiantes ya registrados en la tabla de abajo, esta lista mostrará el Nombre, la Fecha de Finalizacion y la Edad. Para ver las materias aprobadas de un Estudiante, puede hacer click sobre el mismo y a la derecha en la tabla "Mateerias aprobadas" podrá visualizar el nombre y la calificación para cada materia cursada del Estudiante.

## Validaciones

Los datos utilizados para el request al crear nuevos Estudiantes, deben cumplir los siguientes requisitos:

- **Nombre**: Se validará que no sea nulo, no sea una cadena vacía, que no solo contenga espacios en blanco y/o tabulaciones y que no contenga números.


- **Edad**: Se validará que no sea nulo y no sea un numero negativo.


- **FechaFinalizacion**: Se validará que se trate de una fecha válida (no permite ingreso de valores no válidos).


- **Materia**:
  - **Nombre**: Se validará que no sea nulo, no sea una cadena vacía o que no solo contenga espacios en blanco y/o tabulaciones.
  - **Calificacion**: Se validará que no sea nulo y que se encuentre en el rango válido (de 0 a 10). Acepta decimales.