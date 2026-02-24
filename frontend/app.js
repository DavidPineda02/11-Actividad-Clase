// Importaciones

// Importa las funciones "armarCiudades", "armarGenero" y "armarUsuarios" desde el archivo barrel (index.js) de la carpeta components.
import { armarCiudades, armarGenero, armarUsuarios } from "./components/index.js";

// Importa la función "validar" desde el archivo de helpers.
import { validar } from "./helpers/validarFormulario.js";

// Importa las funciones necesarias desde el archivo barrel (index.js) de la carpeta use-case.
import { ciudades, generos, getUsuarios, postUsuarios, deleteUsuario, updateUsuario, getUserById } from "./use-case/index.js";

// variables

// Selecciona el primer elemento <form> que encuentre en el HTML y lo guarda en la constante "formulario".
const formulario = document.querySelector('form');

// Selecciona el elemento HTML cuyo id sea "documento" (un campo de texto del formulario).
const documento = document.querySelector("#documento");

// Selecciona el elemento HTML cuyo id sea "nombre" (un campo de texto del formulario).
const nombre = document.querySelector("#nombre");

// Selecciona el elemento HTML cuyo id sea "correo" (un campo de texto del formulario).
const correo = document.querySelector("#correo");

// Selecciona el elemento HTML cuyo id sea "generos" (un div contenedor donde se insertarán los radio buttons de género).
const divGeneros = document.getElementById("generos");

// Selecciona el elemento HTML cuyo id sea "ciudadId" (un <select> donde se insertarán las opciones de ciudad).
const ciudad = document.querySelector("#ciudadId");

// Selecciona el elemento HTML cuyo id sea "usuarios" (el contenedor donde se renderizarán las cards de usuarios).
const divUsuarios = document.getElementById("usuarios");

// Variable para almacenar el id del usuario que se está editando. Si es null, el formulario está en modo de creación.
let editandoId = null;

// Define un objeto llamado "reglas" que contiene las reglas de validación para cada campo del formulario.
const reglas = {
  documento: { required: true, min: 8, max: 10, mensaje: "El campo es obligatorio" },
  nombre: { required: true, mensaje: "El campo es obligatorio" },
  genero: { required: true, mensaje: "Por favor seleccione su genero" },
  ciudad: { required: true, mensaje: "Por favor seleccione su ciudad" },
  correo: { required: true, mensaje: "El campo es obligatorio" }
};

// Métodos

/**
 * Función para validar los campos del formulario
 * 
 * @param {HTMLFormElement} form - Formulario a validar
 * @returns  {Object} - {esValido: boolean, documento: string, nombre: string, genero: string, ciudad: string, correo: string }
 */
const validarFormulario = (e) => {
  // Ejecuta la validación del formulario con las reglas definidas y guarda el resultado.
  let respuesta = validar(e, reglas);

  // Remueve la clase CSS 'error' de cada campo del formulario para limpiar estilos de error previos.
  documento.classList.remove('error');
  nombre.classList.remove('error');
  ciudad.classList.remove('error');
  divGeneros.classList.remove('error');
  correo.classList.remove('error');

  // Si la validación no es válida, agrega la clase CSS 'error' a los campos que tienen errores para mostrar los estilos de error.
  if (!respuesta.valido) {
    // Si hay error en el campo documento, le agrega la clase 'error' para mostrarlo visualmente.
    if (respuesta.errores.documento) documento.classList.add('error');
    // Si hay error en el campo nombre, le agrega la clase 'error' para mostrarlo visualmente.
    if (respuesta.errores.nombre) nombre.classList.add('error');
    // Si hay error en el campo ciudad, le agrega la clase 'error' para mostrarlo visualmente.
    if (respuesta.errores.ciudad) ciudad.classList.add('error');
    // Si hay error en el campo genero, le agrega la clase 'error' para mostrarlo visualmente.
    if (respuesta.errores.genero) divGeneros.classList.add('error');
    // Si hay error en el campo correo, le agrega la clase 'error' para mostrarlo visualmente.
    if (respuesta.errores.correo) correo.classList.add('error');

    // Retorna solo esValido en false para detener el flujo del formulario.
    return { esValido: false };
  }

  // Si la validación es exitosa, retorna un objeto con todos los valores del formulario.
  return {
    esValido: true,
    documento: documento.value,
    nombre: nombre.value,
    // Obtiene el valor del radio button de género que esté seleccionado.
    genero: e.querySelector('input[name="genero"]:checked').value,
    ciudad: ciudad.value,
    correo: correo.value
  };
};

/**
 * Función para recargar y re-renderizar la lista de usuarios desde el servidor.
 */
const recargarUsuarios = async () => {
  // Obtiene la lista actualizada de usuarios desde el servidor.
  const datosUsuarios = await getUsuarios();
  // Llama a "armarUsuarios" para renderizar las cards actualizadas en el contenedor.
  armarUsuarios(divUsuarios, datosUsuarios);
};

/**
 * Función para limpiar el formulario y devolverlo al modo de creación.
 */
const limpiarFormulario = () => {
  // Resetea todos los campos del formulario a sus valores por defecto.
  formulario.reset();
  // Cambia el texto del botón de envío a "Enviar" para indicar que está en modo creación.
  formulario.querySelector('button').textContent = "Enviar";
  // Resetea el id de edición a null para volver al modo de creación.
  editandoId = null;
};

/**
 * Función para crear un nuevo usuario en el servidor y recargar la lista.
 * 
 * @param {string} doc - Documento del usuario
 * @param {string} nom - Nombre del usuario
 * @param {string} gen - Género del usuario
 * @param {string} ciu - Ciudad del usuario
 * @param {string} cor - Correo del usuario
 */
const crearUsuario = async (doc, nom, gen, ciu, cor) => {
  // Llama a "postUsuarios" para crear el nuevo usuario en el servidor con los datos del formulario.
  await postUsuarios(doc, nom, gen, ciu, cor);
  // Limpia el formulario y lo devuelve al modo de creación.
  limpiarFormulario();
  // Recarga y re-renderiza la lista de usuarios para mostrar el nuevo usuario.
  await recargarUsuarios();
};

/**
 * Función para cargar los datos de un usuario en el formulario para editarlo.
 * 
 * @param {string} usuarioId - Identificador del usuario a consultar
 */
const consultarUsuario = async (usuarioId) => {
  // Obtiene los datos del usuario específico desde el servidor usando su id.
  const usuario = await getUserById(usuarioId);

  // Asigna los valores del usuario a los campos del formulario para que puedan ser editados.
  documento.value = usuario.documento;
  nombre.value = usuario.nombre;
  correo.value = usuario.correo;
  ciudad.value = usuario.ciudad_id;

  // Busca el radio button cuyo valor coincida con el género del usuario y lo marca como seleccionado.
  const radioGenero = divGeneros.querySelector(`input[value="${usuario.genero_id}"]`);
  // Si se encuentra el radio button correspondiente, lo marca como seleccionado.
  if (radioGenero) radioGenero.checked = true;

  // Guarda el id del usuario en edición para que el submit sepa que debe actualizar y no crear.
  editandoId = usuarioId;
  // Cambia el texto del botón de envío a "Editar" para indicar que está en modo edición.
  formulario.querySelector('button').textContent = "Editar";
};

/**
 * Función para eliminar un usuario con animación de salida.
 * 
 * @param {string} usuarioId - Identificador del usuario a eliminar
 * @param {HTMLElement} card - Elemento de la card del usuario en el DOM
 */
const eliminarUsuario = (usuarioId, card) => {
  // Agrega la clase "eliminando" a la card para activar la animación de salida.
  card.classList.add('eliminando');
  // Escucha el evento que se dispara cuando termina la animación CSS de la card.
  card.addEventListener('transitionend', async () => {
    // Llama a "deleteUsuario" para eliminar el usuario del servidor.
    await deleteUsuario(usuarioId);
    // Recarga y re-renderiza la lista de usuarios para reflejar la eliminación.
    await recargarUsuarios();
  }, { once: true }); // 'once' asegura que el evento se dispare solo una vez.
};

// EVENTOS

// Agrega un escuchador de eventos al documento completo que se ejecuta cuando el DOM ha sido completamente cargado.
document.addEventListener("DOMContentLoaded", async () => {
  // Obtiene los datos de ciudades, géneros y usuarios desde el servidor de forma simultánea para mayor eficiencia.
  const [datosCiudades, datosGeneros, datosUsuarios] = await Promise.all([ciudades(), generos(), getUsuarios()]);

  // Llama a las funciones para renderizar los géneros, ciudades y usuarios en sus respectivos contenedores.
  armarGenero(divGeneros, datosGeneros);
  armarCiudades(ciudad, datosCiudades);
  armarUsuarios(divUsuarios, datosUsuarios);
});

// Agrega un escuchador de eventos al formulario que se ejecuta cuando el usuario hace clic en el botón de enviar (submit).
formulario.addEventListener("submit", async (e) => {
  // Previene el comportamiento por defecto del formulario que recarga la página al enviar.
  e.preventDefault();

  // Valida los campos del formulario usando la función "validarFormulario" y guarda el resultado en constantes.
  const { esValido, documento: doc, nombre: nom, genero, ciudad: ciu, correo: cor } = validarFormulario(e.target);

  // Si el formulario no es válido, se detiene la ejecución y no se envían los datos al servidor.
  if (!esValido) return;

  // Si estamos en modo edición (editandoId no es null), actualiza el usuario existente.
  if (editandoId) {
    // Llama a "updateUsuario" con el id del usuario en edición y los nuevos datos del formulario.
    await updateUsuario(editandoId, doc, nom, genero, ciu, cor);
    // Limpia el formulario y lo devuelve al modo de creación.
    limpiarFormulario();
    // Recarga y re-renderiza la lista de usuarios para reflejar los cambios.
    await recargarUsuarios();
  } else {
    // Si estamos en modo creación, llama a "crearUsuario" para crear el nuevo usuario.
    await crearUsuario(doc, nom, genero, ciu, cor);
  }
});

// Delegación de eventos unificada para editar y eliminar usuarios.
divUsuarios.addEventListener("click", async (e) => {

  // --- EDITAR ---
  // Busca el botón de editar más cercano al elemento que fue clickeado.
  const btnEditar = e.target.closest(".btn-editar");

  // Si se encontró un botón de editar, llama a "consultarUsuario" para cargar sus datos en el formulario.
  if (btnEditar) {
    // Obtiene el id del usuario a editar desde el atributo "data-id" del botón.
    const id = btnEditar.getAttribute("data-id");
    // Llama a "consultarUsuario" para obtener los datos del usuario y cargarlos en el formulario.
    await consultarUsuario(id);
    // Detiene la ejecución para que no continúe hacia la lógica de eliminar.
    return;
  }

  // --- ELIMINAR ---
  // Busca el botón de eliminar más cercano al elemento que fue clickeado.
  const btnEliminar = e.target.closest(".btn-eliminar");

  // Si se encontró un botón de eliminar, procede con la lógica de eliminación.
  if (btnEliminar) {
    // Obtiene el id del usuario a eliminar desde el atributo "data-id" del botón.
    const id = btnEliminar.getAttribute("data-id");

    // Muestra un diálogo de confirmación al usuario antes de proceder con la eliminación.
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

    // Busca la card del usuario en el DOM para aplicarle la animación de salida.
    const card = btnEliminar.closest('.card');

    // Llama a "eliminarUsuario" pasándole el id y la card para que gestione la animación y la eliminación.
    eliminarUsuario(id, card);
  }
});