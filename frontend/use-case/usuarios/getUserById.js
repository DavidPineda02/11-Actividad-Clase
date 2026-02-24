// Función asíncrona que recibe un id de usuario y devuelve los datos del usuario correspondiente.
export const getUserById = async (userId) => {
    // Realiza una solicitud HTTP GET al endpoint de la API para obtener los datos del usuario con el id especificado.
    const solicitud = await fetch(`http://localhost:3001/usuarios/${userId}`);
    // Convierte la respuesta de la solicitud a formato JSON y devuelve los datos del usuario.
    const data = await solicitud.json();
    // Devuelve los datos del usuario obtenidos de la API.
    return data;
}