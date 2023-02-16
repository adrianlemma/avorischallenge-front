const CREAR_ESTUDIANTE = "https://avorischallenge.onrender.com/avoris/estudiante/save"
const GET_ESTUDIANTE = "https://avorischallenge.onrender.com/avoris/estudiante/"
const LIST_ESTUDIANTES = "https://avorischallenge.onrender.com/avoris/estudiante/list"

const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const fechaFinalizacion = document.getElementById("fecha_de_finalizacion");
const materia = document.getElementById("materia");
const calificacion = document.getElementById("calificacion");
const listaMaterias = document.getElementById("lista-materias");
const bloqueo = document.getElementById("bloqueo");
const tablaEstudiantes = document.getElementById("tabla-estudiantes")
const tablaMaterias = document.getElementById("tabla-materias")

var regexNombre = /^([A-Za-z]+[ ]?){1,8}$/

var materias = [];
var listaEstudiantes = [];

var apiError = false;

function clearForm() {
    nombre.value = "";
    edad.value = "";
    fechaFinalizacion.value = "";
    materia.value = "";
    calificacion.value = "";
    listaMaterias.innerHTML = "";
    materias = [];
}

function añadirMateria() {
    if (!materia.value) {
        alert("Debe ingresar el nombre de una materia");
        return;
    }
    if (!calificacion.value || calificacion.value < 0 || calificacion.value > 10) {
        alert("Debe ingresar una calificacion valida");
        return;
    }
    let calif = document.createElement("a");
    let mater = document.createElement("b");
    let tag = document.createElement("div");
    calif.textContent = "Calif: " + calificacion.value;
    mater.textContent = materia.value + " ";
    calif.classList.add("calificacion");
    mater.classList.add("materia");
    mater.appendChild(calif);
    tag.appendChild(mater);
    listaMaterias.appendChild(tag);

    materias.push({ nombre: materia.value, calificacion: calificacion.value });
    materia.value = "";
    calificacion.value = "";
}

function registerEstudiante() {
    if (!regexNombre.test(nombre.value)) {
        alert("El Nombre ingresado no es valido");
        return;
    } else if (edad.value <= 0 || edad.value == "") {
        alert("Ingrese un valor mayor a cero para la Edad");
        return;
    } else if (!fechaFinalizacion.value) {
        alert("Ingrese una fecha de finalizacion");
        return;
    } else if (!listaMaterias.innerHTML) {
        alert("Ingrese por lo menos una materia a la lista con el boton \"Añadir materia\"");
        return;
    }

    var fechaString = fechaFinalizacion.value + "";

    var estudianteRequest = {
        nombre: nombre.value,
        edad: edad.value,
        fechaFinalizacion: {
            dia: fechaString.substring(8, 10),
            mes: fechaString.substring(5, 7),
            anio: fechaString.substring(0, 4)
        },
        materiasCursadas: materias
    };

    bloqueo.classList.remove("invisible");

    fetch(CREAR_ESTUDIANTE, {
        method: 'POST',
        body: JSON.stringify(estudianteRequest),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => !res.ok? res.text().then(text => { throw new Error(text) }) : res.json())
    .then(data => {
        mostrarEstudianteEnTabla(data);
        listaEstudiantes.push(data);
        alert("Estudiante [" + data.nombre + "] registrado correctamente");
    })
    .catch(err => {
        console.error(err);
        alert(err);
    })

    clearForm();
    bloqueo.classList.add("invisible");
}

function getListaEstudiantes() {
    bloqueo.classList.remove("invisible");
    fetch(LIST_ESTUDIANTES, {
        method: 'GET',
        'Access-Control-Allow-Origin': '*'
    })
    .then(res => !res.ok? res.text().then(text => { throw new Error(text) }) : res.json())
    .then(data => { 
        listaEstudiantes = data;
        for(var i = 0; i < listaEstudiantes.length; i++) {
            mostrarEstudianteEnTabla(listaEstudiantes[i]);
        }
    })
    .catch(err => {
        console.error(err);
        alert(err);
    });
    bloqueo.classList.add("invisible");
}

function mostrarEstudianteEnTabla(data) {
    let rowRef = tablaEstudiantes.insertRow(-1);
    let cellRef = rowRef.insertCell(0);
    cellRef.textContent = data.nombre;
    cellRef.classList.add("nombre");
    cellRef = rowRef.insertCell(1);
    cellRef.textContent = data.edad;
    cellRef.classList.add("fecha");
    cellRef = rowRef.insertCell(2);
    cellRef.textContent = data.fechaFinalizacion.fecha;
    cellRef.classList.add("edad");

    tablaEstudiantes.lastChild.addEventListener("click", funcionalidadFila)
}

function funcionalidadFila(e) {
    let estudianteIdx = e.path[1].rowIndex - 1;
    tablaMaterias.innerHTML = "";
    for(var i = 0; i < listaEstudiantes[estudianteIdx].materiasCursadas.length; i++) {
        let rowRef = tablaMaterias.insertRow(-1);
        let cellRef = rowRef.insertCell(0);
        cellRef.textContent = listaEstudiantes[estudianteIdx].materiasCursadas[i].nombre;
        cellRef = rowRef.insertCell(1);
        cellRef.textContent = listaEstudiantes[estudianteIdx].materiasCursadas[i].calificacion;
    }
    let anterior = document.getElementsByClassName("seleccionado");
    console.log(anterior);
    anterior.length > 0 ? anterior[0].classList.remove("seleccionado") : null;
    tablaEstudiantes.children[estudianteIdx].classList.add("seleccionado");
}

function init() {
    getListaEstudiantes();
}