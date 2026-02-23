// Exporta la función "armarUsuarios" para que pueda ser utilizada en otros archivos.
// Recibe dos parámetros:
//   - "elemento": el elemento HTML donde se insertarán las cards de usuarios.
//   - "datos": un arreglo de objetos con la información de cada usuario (obtenido del servidor).
export const armarUsuarios = (elemento, datos) => {
  // Limpia todo el contenido previo del contenedor para evitar duplicados al re-renderizar.
  elemento.textContent = "";

  // Crea un DocumentFragment, que es un contenedor temporal en memoria.
  // Se usa para agregar múltiples elementos al DOM de forma eficiente (una sola inserción en vez de muchas).
  const fragmento = document.createDocumentFragment();

  // Recorre cada objeto "usuario" dentro del arreglo "datos" usando forEach.
  datos.forEach(usuario => {
    // Crea un elemento <div> que servirá como la card del usuario.
    const card = document.createElement('div');

    // Agrega la clase CSS "usuario-card" para aplicarle los estilos de card.
    card.classList.add('usuario-card');

    // Crea un elemento <div> para la cabecera de la card (nombre + botón eliminar).
    const header = document.createElement('div');

    // Agrega la clase CSS "usuario-card__header" para el estilo de la cabecera.
    header.classList.add('usuario-card__header');

    // Crea un elemento <h3> para el nombre del usuario (título de la card).
    const nombre = document.createElement('h3');

    // Agrega la clase CSS "usuario-card__nombre" para el estilo del título.
    nombre.classList.add('usuario-card__nombre');

    // Establece el texto visible del h3 con el nombre del usuario.
    nombre.textContent = usuario.nombre;

    // Crea un botón de eliminar para la parte superior derecha de la card.
    const btnEliminar = document.createElement('button');

    // Agrega la clase CSS "btn-eliminar" para el estilo del botón.
    btnEliminar.classList.add('btn-eliminar');

    // Establece el icono de eliminar como texto visible del botón.
    const icono = document.createElement('i');
    icono.classList.add('fa-solid', 'fa-trash');
    btnEliminar.append(icono);

    // Guarda el id del usuario en un atributo data-id para identificarlo al eliminar.
    btnEliminar.setAttribute('data-id', usuario.id);

    // Agrega el nombre y el botón eliminar dentro de la cabecera.
    header.append(nombre, btnEliminar);

    // Crea un elemento <div> contenedor para la información del usuario.
    const info = document.createElement('div');

    // Agrega la clase CSS "usuario-card__info" para el estilo de la información.
    info.classList.add('usuario-card__info');

    // Crea un elemento <p> para mostrar el documento del usuario.
    const pDocumento = document.createElement('p');

    // Establece el texto visible del párrafo con el documento del usuario.
    pDocumento.textContent = `Documento: ${usuario.documento}`;

    // Crea un elemento <p> para mostrar el género del usuario.
    const pGenero = document.createElement('p');

    // Establece el texto visible del párrafo con el género del usuario.
    pGenero.textContent = `Género: ${usuario.genero_id}`;

    // Crea un elemento <p> para mostrar la ciudad del usuario.
    const pCiudad = document.createElement('p');

    // Establece el texto visible del párrafo con la ciudad del usuario.
    pCiudad.textContent = `Ciudad: ${usuario.ciudad_id}`;

    // Crea un elemento <p> para mostrar el correo del usuario.
    const pCorreo = document.createElement('p');

    // Establece el texto visible del párrafo con el correo del usuario.
    pCorreo.textContent = `Correo: ${usuario.correo}`;

    // Agrega los párrafos dentro del contenedor de información.
    info.append(pDocumento, pGenero, pCiudad, pCorreo);

    // Crea un elemento <div> para el pie de la card (botón editar).
    const footer = document.createElement('div');

    // Agrega la clase CSS "usuario-card__footer" para el estilo del pie.
    footer.classList.add('usuario-card__footer');

    // Crea un botón de editar para la parte inferior derecha de la card.
    const btnEditar = document.createElement('button');

    // Agrega la clase CSS "btn-editar" para el estilo del botón.
    btnEditar.classList.add('btn-editar');

    // Establece el texto visible del botón.
    btnEditar.textContent = "Editar";

    // Guarda el id del usuario en un atributo data-id para identificarlo al editar.
    btnEditar.setAttribute('data-id', usuario.id);

    // Agrega el botón editar dentro del pie.
    footer.append(btnEditar);

    // Agrega la cabecera, la información y el pie dentro de la card.
    card.append(header, info, footer);

    // Agrega la card al fragmento (todavía no está en el DOM real).
    fragmento.append(card);
  });

  // Inserta todo el fragmento (con todas las cards creadas) dentro del elemento en el DOM.
  // Esta es la única operación que modifica el DOM real, lo cual es más eficiente.
  elemento.append(fragmento);
}
