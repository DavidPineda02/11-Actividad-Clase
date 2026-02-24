// Exporta la función asíncrona "postUsuarios" para que pueda ser utilizada en otros archivos.
// Recibe cinco parámetros que corresponden a los datos del formulario del usuario:
//   - "documento": el número de documento de identidad del usuario.
//   - "nombre": el nombre completo del usuario.
//   - "genero": el id del género seleccionado por el usuario.
//   - "ciudad": el id de la ciudad seleccionada por el usuario.
//   - "correo": la dirección de correo electrónico del usuario.
export const postUsuarios = async (documento, nombre, genero, ciudad, correo) => {
  // Realiza una petición HTTP POST a la URL 'http://localhost:3001/usuarios' usando la API Fetch.
  // Se envían los datos del formulario como un objeto JSON en el cuerpo de la petición.
  const solicitud = await fetch('http://localhost:3001/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      documento: documento,
      nombre: nombre,
      genero_id: genero,
      ciudad_id: ciudad,
      correo: correo
    })
  });

  // Convierte el cuerpo de la respuesta del servidor de formato JSON a un objeto de JavaScript.
  const datos = await solicitud.json();

  // Retorna el objeto con los datos del usuario creado para que el código que llamó a esta función lo pueda usar.
  return datos;
}
