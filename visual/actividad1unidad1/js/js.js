// datos del ejercicio: orden correcto de las palabras
const orden_correcto = ['integracion', 'innovacion', 'creatividad', 'equipo', 'tecnologia', 'dinamico']; // elementos del array. Un array es como un armario con varios cajones, en cada cajo se guarda algo, en este caso una variable
// palabras desordanedas 'integracion', 'innovacion', 'creatividad', 'equipo', 'tecnologia', 'dinamico'
const palabras_juego = ['equipo', 'tecnologia', 'integracion', 'dinamico', 'creatividad', 'innovacion'];

// referencias a los elementos del DOM
const contenedorOpciones = document.getElementById('opciones'); //selecciona un elemento del HTML por el ID
const comprobar = document.getElementById('comprobar'); // Const es una variable constante, es decir es una variable cuyo valor no cambia mientras el programa se ejecuta
const txtResultado = document.getElementById('resultado');

// array para guardar palabras en cada espacio (si está vacío usa '')
let posDisponible = new Array(orden_correcto.length).fill('');

//=== se crean las opciones de arrastre
function agregarOpciones() { // se define una función que contiene un bloque de código que se puede reutilizar
    palabras_juego.forEach((palabra, idx) => { //un array que sirve para recorrer los elementos de un array y ejecutar una función para cada uno de ellos
        const div = document.createElement('div');
        div.className = 'palabra';
        div.textContent = palabra;
        div.draggable = true;               // habilitamos el arrastre
        div.id = 'palabra_' + idx;         // ID único para cada opción
        div.addEventListener('dragstart', dragStart);
        contenedorOpciones.appendChild(div);
    });
}

//=== prepara los espacios para soltar palabras y para eliminar al dar clic
function prepararEspacios() {
    const spans = document.querySelectorAll('.texto span'); //se seleccionan todos los elementos HTML que tengan la clase CSS definida en el selector
    spans.forEach(span => {
        span.addEventListener('dragover', dragOver);  // permite soltar
        span.addEventListener('drop', drop);          // maneja soltar
        span.addEventListener('click', remove);       // elimina la palabra arrastrada con clic
    });
}

//=== inicia el arrastre: guarda el ID de la palabra arrastrada
function dragStart(e) { // función para iniciar el arrastre
    e.dataTransfer.setData('text/plain', e.target.id);
}

//=== permitimos que el elemento reciba un drop al soltar
function dragOver(e) { // función para recibir el arrastre
    e.preventDefault();
}

//=== Al soltar, coloca la palabra en el espacio si está vacío
function drop(e) { // función para permitir que al soltar la palabra se ubique en el espacio
    e.preventDefault(); // se llama el objeto evento (e) qye le indica al navegador que no ejecute la acción por defecto asociada a ese evento
    const span = e.target; // permite obtener una referencia al elemento HTML que desencadenó un evento por ejemplo un clic, cambio de entrada, etc.
    if (span.textContent === '') { // verifica si el elemento HTML <span> tiene contenido de texto
        const idPal = e.dataTransfer.getData('text/plain'); // se lee el ID, obtenemos los datos de texto de una operación de arrastrar y soltar (drag and drop)
        const pal = document.getElementById(idPal); // se obtiene una referencia a un elemento del HTML que tenga un ID específico
        span.textContent = pal.textContent;       // muestra palabra
        span.dataset.draggedId = idPal;           // guarda referencia
        posDisponible[span.id] = pal.textContent; // marca posición ocupada
        contenedorOpciones.removeChild(pal);      // quita opción del contenedor
        txtResultado.textContent = '';            // limpia el mensaje
    }
}

//=== cuando doy clic en un espacio, elimina la palabra y la devuelve a las opciones
function remove(e) { //función para eliminar la palabra arrastrada al dar clic
    const span = e.target;
    if (span.textContent !== '') {
        const idPal = span.dataset.draggedId;
        const div = document.createElement('div');
        div.className = 'palabra';
        div.textContent = span.textContent;
        div.id = idPal;                            // mantiene mismo ID
        div.draggable = true;
        div.addEventListener('dragstart', dragStart);
        contenedorOpciones.appendChild(div);

        span.textContent = ''; // limpia el span
        delete span.dataset.draggedId; //elimina todos los atributos de datos del elemento span mediante dataset
        posDisponible[span.id] = ''; // libera la posición
        span.style.background = ''; // restablece estilo
        txtResultado.textContent = ''; // limpia mensaje
    }
}

//=== verifica si las palabras colocadas coinciden con el orden correcto
comprobar.addEventListener('click', () => {
    if (posDisponible.includes('')) { //verifica si una cadena de caracteres contiene otra subcadena
        alert('Completa todos los espacios'); // mensaje si el usuario no completa la actividad
        return;
    }
    let aciertos = 0; // se define la variable aciertos
    orden_correcto.forEach((palabra, i) => { // permite repetir sobre cada elemento del array y ejecutar la función
        const span = document.getElementById(i);
        if (posDisponible[i] === palabra) {
            span.style.background = '#c0ff33'; // verde si es correcto
            aciertos++; // contador de aciertos
        } else {
            span.style.background = '#fb4b4b'; // rojo si es incorrecto
        }
    });
    txtResultado.textContent = (aciertos === orden_correcto.length) // mensaje si el resultado se correcto o incorrecto
        ? '¡Muy bien, felicitaciones!'
        : 'Algunas palabras no coinciden, inténtalo de nuevo';
});

// en esta sección se inicializa la actividad al cargar página
agregarOpciones();
prepararEspacios();