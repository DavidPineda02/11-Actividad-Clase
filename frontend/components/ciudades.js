// Exporta la función "armarCiudades" para que pueda ser utilizada en otros archivos.
// Recibe dos parámetros:
//   - "elemento": el elemento HTML <select> donde se insertarán las opciones de ciudad.
//   - "datos": un arreglo de objetos con la información de cada ciudad (obtenido del servidor).
export const armarCiudades = (elemento, datos) => {
  // Crea un DocumentFragment, que es un contenedor temporal en memoria.
  // Se usa para agregar múltiples elementos al DOM de forma eficiente (una sola inserción en vez de muchas).
  const fragmento = document.createDocumentFragment();

  // Crea un elemento <option> para usarlo como la primera opción por defecto del <select>.
  const option = document.createElement('option');

  // Establece el texto visible de esta primera opción como "Seleccione..." (opción de placeholder).
  option.textContent = "Seleccione...";

  // Agrega esta opción de placeholder al fragmento.
  fragmento.append(option);

  // Recorre cada objeto "ciudad" dentro del arreglo "datos" usando forEach.
  datos.forEach(ciudad => {
    // Crea un nuevo elemento <option> para cada ciudad.
    const opcion = document.createElement('option');

    // Creamos los atributos
    // Establece el atributo "value" de la opción con el id de la ciudad (este valor se envía al servidor al seleccionar).
    opcion.setAttribute("value", ciudad.id);

    // Establece el texto visible de la opción con el nombre de la ciudad (lo que el usuario ve en el dropdown).
    opcion.textContent = ciudad.ciudad;

    // Agrega esta opción al fragmento (todavía no está en el DOM real).
    fragmento.append(opcion)
  });

  // Inserta todo el fragmento (con todas las opciones creadas) dentro del elemento <select> del DOM.
  // Esta es la única operación que modifica el DOM real, lo cual es más eficiente.
  elemento.append(fragmento);
}