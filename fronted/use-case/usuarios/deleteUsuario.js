// Define una función asíncrona llamada deleteUsuario que toma un parámetro documento, que representa el documento del usuario que se desea eliminar.
export const deleteUsuario = async (documento) => {
    // Realiza una petición HTTP DELETE a la URL 'http://localhost:3001/usuarios/{documento}' usando la API Fetch.
    // Se envía el documento del usuario a eliminar como parte de la URL.
    const solicitud = await fetch(`http://localhost:3001/usuarios/${documento}`, {
        method: 'DELETE'
    });

    // Convierte el cuerpo de la respuesta del servidor de formato JSON a un objeto de JavaScript.
    const datos = await solicitud.json();

    // Retorna el objeto con los datos de la respuesta del servidor para que el código que llamó a esta función lo pueda usar.
    return datos;
}