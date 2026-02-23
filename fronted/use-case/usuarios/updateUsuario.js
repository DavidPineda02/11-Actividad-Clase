// Función asíncrona para actualizar un usuario existente en la base de datos.
// Recibe seis parámetros:
//   - "id": el identificador único del usuario que se desea actualizar.
//   - "documento": el número de documento de identidad del usuario.
//   - "nombre": el nombre completo del usuario.
//   - "genero": el id del género seleccionado por el usuario.
//   - "ciudad": el id de la ciudad seleccionada por el usuario.
//   - "correo": la dirección de correo electrónico del usuario.
export const updateUsuario = async (id, documento, nombre, genero, ciudad, correo) => {
    // Realiza una petición HTTP PUT a la URL 'http://localhost:3001/usuarios/{id}' usando la API Fetch.
    // Se envían los datos actualizados del usuario como un objeto JSON en el cuerpo de la petición.
    const solicitud = await fetch(`http://localhost:3001/usuarios/${id}`, {
        method: 'PUT',
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

    // Retorna el objeto con los datos del usuario actualizado para que el código que llamó a esta función lo pueda usar.
    return datos;
}