// Importaciones

// Importa las funciones "armarCiudades", "armarGenero" y "armarUsuarios" desde el archivo barrel (index.js) de la carpeta components.
import { armarCiudades, armarGenero, armarUsuarios } from "./components/index.js";

// Importa la función "validar" desde el archivo de helpers.
import { validar } from "./helpers/validarFormulario.js";

// Importa las funciones "ciudades", "generos", "getUsuarios" y "postUsuarios" desde el archivo barrel (index.js) de la carpeta use-case.
import { ciudades, generos, getUsuarios, postUsuarios, deleteUsuario, updateUsuario } from "./use-case/index.js";

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
  let respuesta = validar(e, reglas);

  // Remueve la clase CSS 'error' de cada campo del formulario para limpiar estilos de error previos.
  documento.classList.remove('error')
  nombre.classList.remove('error')
  ciudad.classList.remove('error');
  divGeneros.classList.remove('error')
  correo.classList.remove('error')
  
  // Si la validación no es válida, agrega la clase CSS 'error' a los campos que tienen errores para mostrar los estilos de error.
  if (!respuesta.valido) {
    if (respuesta.errores.documento) {
      documento.classList.add('error')
    }
    if (respuesta.errores.nombre) {
      nombre.classList.add('error')
    }
    if (respuesta.errores.ciudad) {
      ciudad.classList.add('error')
    }
    if (respuesta.errores.genero) {
      divGeneros.classList.add('error')
    }
    if (respuesta.errores.correo) {
      correo.classList.add('error')
    }
  }

  // Si la validación no es válida, retorna un objeto con la propiedad "esValido" en false para indicar que el formulario no pasó la validación.
  if (!respuesta.valido) {
    return {
      esValido: respuesta.valido
    }
  } else {
    return {
      esValido: respuesta.valido,
      documento: documento.value,
      nombre: nombre.value,
      genero: e.querySelector('input[name="genero"]:checked').value,
      ciudad: ciudad.value,
      correo: correo.value
    }
  }
}

// EVENTOS

// Agrega un escuchador de eventos al documento completo que se ejecuta cuando el DOM ha sido completamente cargado.
document.addEventListener("DOMContentLoaded", async () => {
  // Obtiene los datos de ciudades, géneros y usuarios desde el servidor usando las funciones importadas.
  let datosCiudades = await ciudades();
  let datosGeneros = await generos();
  let datosUsuarios = await getUsuarios();

  // Llama a las funciones para renderizar los géneros, ciudades y usuarios en sus respectivos contenedores.
  armarGenero(divGeneros, datosGeneros);
  armarCiudades(ciudad, datosCiudades);
  armarUsuarios(divUsuarios, datosUsuarios);
})

// Agrega un escuchador de eventos al formulario que se ejecuta cuando el usuario hace clic en el botón de enviar (submit).
formulario.addEventListener("submit", async (e) => {
  // Previene el comportamiento por defecto del formulario que recarga la página al enviar.
  e.preventDefault();
  // Valida los campos del formulario usando la función "validarFormulario" y guarda el resultado en constantes.
  const { esValido, documento, nombre, genero, ciudad, correo } = validarFormulario(e.target);
  // Si el formulario no es válido, se detiene la ejecución de esta función y no se envían los datos al servidor.
  if (!esValido) return;

  // Si estamos editando (editandoId no es null), se llama a "updateUsuario" para actualizar el usuario existente.
  // Si no, se llama a "postUsuarios" para crear un nuevo usuario.
  if (editandoId) {
    await updateUsuario(editandoId, documento, nombre, genero, ciudad, correo);
    // Resetea el modo de edición a null para volver al modo de creación.
    editandoId = null;
  } else {
    await postUsuarios(documento, nombre, genero, ciudad, correo);
  }

  // Limpia los campos del formulario para que el usuario pueda ingresar nuevos datos.
  formulario.reset();

  // Vuelve a obtener los usuarios y re-renderiza las cards
  let datosUsuarios = await getUsuarios();
  // Llama a la función "armarUsuarios" para renderizar las cards de usuarios actualizadas en el contenedor "divUsuarios".
  armarUsuarios(divUsuarios, datosUsuarios);
});

// Delegación de eventos sobre el contenedor de usuarios para detectar clics en botones de editar.
divUsuarios.addEventListener("click", async (e) => {
  // Verifica si el elemento clickeado (o su padre) es un botón con la clase "btn-editar".
  const btnEditar = e.target.closest(".btn-editar");

  // Si no se clickeó un botón de editar, no hace nada.
  if (!btnEditar) return;

  // Obtiene el id del usuario a editar desde el atributo data-id del botón clickeado.
  const id = btnEditar.getAttribute("data-id");

  // Obtiene todos los usuarios actuales del servidor.
  const datosUsuarios = await getUsuarios();

  // Busca el usuario cuyo id coincida con el id del botón clickeado.
  const usuario = datosUsuarios.find(user => user.id === id);

  // Si no se encuentra el usuario, no hace nada.
  if (!usuario) return;

  // Guarda el id del usuario que se está editando en la variable "editandoId".
  editandoId = id;

  // Llena los campos del formulario con los datos del usuario encontrado.
  documento.value = usuario.documento;
  nombre.value = usuario.nombre;
  correo.value = usuario.correo;
  ciudad.value = usuario.ciudad_id;

  // Selecciona el radio button del género que coincida con el género del usuario.
  const radioGenero = divGeneros.querySelector(`input[value="${usuario.genero_id}"]`);
  if (radioGenero) radioGenero.checked = true;
});

// Delegación de eventos sobre el contenedor de usuarios para detectar clics en botones de eliminar.
divUsuarios.addEventListener("click", async (e) => {
  // Verifica si el elemento clickeado (o su padre) es un botón con la clase "btn-eliminar".
  const btnEliminar = e.target.closest(".btn-eliminar");

  // Si no se clickeó un botón de eliminar, no hace nada.
  if (!btnEliminar) return;

  // Obtiene el id del usuario a eliminar desde el atributo data-id del botón clickeado.
  const id = btnEliminar.getAttribute("data-id");

  // Llama a la función "deleteUsuario" para eliminar el usuario con el id obtenido.
  await deleteUsuario(id);

  // Vuelve a obtener los usuarios actualizados y re-renderiza las cards.
  const datosUsuarios = await getUsuarios();
  armarUsuarios(divUsuarios, datosUsuarios);
});