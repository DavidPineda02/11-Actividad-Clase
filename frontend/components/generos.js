// Exporta la función "armarGenero" para que pueda ser utilizada en otros archivos.
// Recibe dos parámetros:
//   - "elemento": el elemento HTML (un div) donde se insertarán los radio buttons de género.
//   - "datos": un arreglo de objetos con la información de cada género (obtenido del servidor).
export const armarGenero = (elemento, datos) => {
  // Crea un DocumentFragment, que es un contenedor temporal en memoria.
  // Se usa para construir todos los elementos radio antes de insertarlos al DOM de una sola vez.
  const fragmento = document.createDocumentFragment();

  // Recorre cada objeto "genero" dentro del arreglo "datos" usando forEach.
  datos.forEach(genero => {
    // Creamos los selectores

    // Crea un elemento <div> que servirá como contenedor para agrupar cada label con su radio button.
    const div = document.createElement('div');

    // Crea un elemento <label> que mostrará el texto descriptivo del género (ej: "Masculino", "Femenino").
    const label = document.createElement('label');

    // Crea un elemento <input> que será el radio button para seleccionar el género.
    const input = document.createElement('input');

    // Asignamos los atributos

    // Establece el atributo "for" del label con el nombre del género.
    // Esto vincula el label con su radio button correspondiente (al hacer clic en el texto, se selecciona el radio).
    label.setAttribute("for", genero.genero);

    // Establece el texto visible del label con el nombre del género (lo que el usuario lee).
    label.textContent = genero.genero;

    // Establece el tipo del input como "radio" (botón de opción que permite elegir solo una opción del grupo).
    input.setAttribute("type", "radio");

    // Establece el id del radio button con el nombre del género (debe coincidir con el "for" del label).
    input.setAttribute("id", genero.genero);

    // Establece el name del radio button como "genero".
    // Todos los radio buttons con el mismo name forman un grupo, y solo se puede seleccionar uno a la vez.
    input.setAttribute("name", "genero");

    // Establece el valor del radio button con el id numérico del género (este valor se envía al servidor).
    input.value = genero.id;

    // Agregamos los atributos

    // Agrega el label y el input dentro del div contenedor (quedan agrupados visualmente).
    div.append(label, input);

    // Agrega el div (con su label e input) al fragmento temporal.
    fragmento.append(div);
  });

  // Inserta todo el fragmento (con todos los radio buttons creados) dentro del elemento div "generos" en el DOM.
  // Esta es la única operación que modifica el DOM real, haciéndolo más eficiente.
  elemento.append(fragmento)
}