// Exporta la función "validar" para que pueda ser utilizada en otros archivos.
// Recibe dos parámetros:
//   - "form": el elemento HTML del formulario a validar.
//   - "reglas": un objeto donde cada propiedad es el nombre de un campo y su valor son las reglas de validación.
export const validar = (form, reglas) => {
  // Crea un objeto vacío "errores" donde se almacenarán los mensajes de error de cada campo que falle la validación.
  const errores = {}

  // Inicializa la variable "valido" en true. Se cambiará a false si algún campo no cumple sus reglas.
  let valido = true;

  // Recorre cada propiedad (name) del objeto "reglas" con un bucle for...in.
  // "name" será el nombre de cada campo: "documento", "nombre", "genero", "ciudad", "correo".
  for (const name in reglas) {
    // Obtenemos el elemento del formulario por el nombre
    // Accede al elemento del formulario cuyo atributo "name" coincide con la clave actual.
    // form.elements es una colección de todos los campos del formulario.
    const campo = form.elements[name];

    // Obtenemos la regla de validacion por el campo
    // Obtiene el objeto con las reglas de validación correspondientes a este campo.
    const regla = reglas[name];

    // validamos si es una lista de elementos
    // Verifica si "campo" es una instancia de NodeList (esto ocurre cuando hay múltiples elementos con el mismo name,
    // como los radio buttons de "genero" que comparten el name="genero").
    if (campo instanceof NodeList) {
      // Si el campo es obligatorio (required: true), valida los nodos (radio buttons).
      if (regla.required) {
        // Llama a "validarNodos" y desestructura el resultado en "esValido" y "mensaje".
        let { esValido, mensaje } = validarNodos(campo, regla)
        // Actualiza la variable "valido" con el resultado de la validación de este grupo de radio buttons.
        valido = esValido;
        // Si la validación falló (valido es false), agrega el mensaje de error al objeto "errores" con la clave del campo.
        if (!valido)
          errores[name] = mensaje;
      }
    // Si el campo es de tipo "text" (campo de texto como documento, nombre o correo).
    } else if (campo.type == "text") {
      // Llama a "validarCamposTipoText" para validar el campo de texto según sus reglas.
      let { esValido, mensaje } = validarCamposTipoText(campo, regla);
      // Actualiza la variable "valido" con el resultado de la validación de este campo de texto.
      valido = esValido;
      // Si la validación falló, agrega el mensaje de error al objeto "errores".
      if (!valido)
        errores[name] = mensaje;
    // Si el campo es de tipo "select-one" (un <select> como el de ciudades).
    } else if (campo.type == "select-one") {
      // Llama a "validarCamposTipoSelect" para validar que se haya seleccionado una opción válida.
      let { esValido, mensaje } = validarCamposTipoSelect(campo, regla);
      // Actualiza la variable "valido" con el resultado de la validación del select.
      valido = esValido;
      // Si la validación falló, agrega el mensaje de error al objeto "errores".
      if (!valido)
        errores[name] = mensaje;
    }
  }

  // Validamos si objeto errores no tiene error registrado
  // Verifica si el objeto "errores" tiene al menos una propiedad (es decir, al menos un campo falló la validación).
  // Object.keys(errores) devuelve un arreglo con las claves del objeto; si su longitud es distinta de 0, hay errores.
  if (Object.keys(errores).length != 0) {
    // Si hay errores registrados, fuerza la variable "valido" a false.
    valido = false
  }

  // Retornamos el objeto con la validación del formulario y los errores si los tiene
  // Retorna un objeto con dos propiedades:
  //   - "valido": true si todos los campos pasaron la validación, false si alguno falló.
  //   - "errores": un objeto con los mensajes de error de los campos que no pasaron la validación.
  return { valido, errores };
}

/**
 * 
 * @param {NodeList} nodo - Nodos de elementos 
 * @param {Object} regla Reglas de validación por nombre de campo
 * @returns  {Object} - {esValido: boolean, mensaje: string}
 */

// Función que valida un grupo de radio buttons (NodeList).
// Verifica que al menos uno de los radio buttons esté seleccionado (checked).
const validarNodos = (nodo, regla) => {
  // Inicializa "esValido" en false. Solo se cambiará a true si encuentra un radio button marcado.
  let esValido = false;

  // Recorre cada elemento (radio button) dentro de la NodeList usando un bucle for...of.
  for (const key of nodo) {
    // Si el radio button actual está marcado (checked es true), significa que el usuario seleccionó una opción.
    if (key.checked) {
      // Retorna inmediatamente un objeto indicando que la validación fue exitosa (esValido: true).
      return {
        esValido: true,
      }
    }
  }

  // Si ningún radio button estaba marcado, retorna un objeto con esValido: false y el mensaje de error definido en la regla.
  return {
    esValido,
    mensaje: regla.mensaje,
  }
}

/**
 * Función para validar los campos de tipo texto.
 * 
 * @param {HTMLElement} radio - Elemento de tipo radio 
 * @param {Object} regla - Reglas de validación por nombre de campo
 * @returns {Object} - {esValido: boolean, mensaje: string}
 */

// Función que valida un campo de tipo texto.
// Verifica si está vacío, si cumple con el largo mínimo y si no excede el largo máximo.
const validarCamposTipoText = (elemento, regla) => {
  // Si el campo es obligatorio Y su valor está vacío (cadena vacía ""), la validación falla.
  if (regla.required && elemento.value == "") {
    return {
      // Retorna esValido: false con el mensaje de error que indica que el campo es obligatorio.
      esValido: false,
      mensaje: regla.mensaje,
    }
  }

  // Si el campo es obligatorio Y tiene definido un largo mínimo (min),
  // verifica que la cantidad de caracteres escritos sea al menos igual al mínimo.
  if (regla.required && regla.min > elemento.value.length) {
    return {
      // Retorna esValido: false con un mensaje indicando el número mínimo de caracteres requeridos.
      esValido: false,
      mensaje: `El campo debe tener como minimo ${regla.min}  de campos`,
    }
  }

  // Si el campo es obligatorio Y tiene definido un largo máximo (max),
  // verifica que la cantidad de caracteres escritos no exceda el máximo permitido.
  if (regla.required && regla.max < elemento.value.length) {
    return {
      // Retorna esValido: false con un mensaje indicando el número máximo de caracteres permitidos.
      esValido: false,
      mensaje: `El campo debe tener como maximo ${regla.max} de campos`,
    }
  }

  // Si pasó todas las validaciones anteriores, el campo es válido.
  return {
    esValido: true
  }
}

/**
 * Función para validar los campos de tipo select
 * 
 * @param {HTMLSelectElement} elemento - Elemento de tipo selección 
 * @param {*} regla - Reglas de validación por nombre de campo
 * @returns {Object} - {esValido: boolen, mensaje: string}
 */

// Función que valida un campo de tipo <select> (lista desplegable).
// Verifica que el usuario haya seleccionado una opción diferente a la primera (que es el placeholder "Seleccione...").
const validarCamposTipoSelect = (elemento, regla) => {
  // Si el campo es obligatorio Y el índice seleccionado es 0 (la primera opción, que es "Seleccione..."),
  // significa que el usuario no ha elegido ninguna opción válida.
  if (regla.required && elemento.selectedIndex == 0) {
    return {
      // Retorna esValido: false con el mensaje de error definido en la regla.
      esValido: false,
      mensaje: regla.mensaje,
    }
  }

  // Si el usuario seleccionó una opción válida (índice mayor a 0), la validación es exitosa.
  return {
    esValido: true
  }
}