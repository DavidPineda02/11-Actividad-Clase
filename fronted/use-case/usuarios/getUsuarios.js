// Exporta la función asíncrona "getUsuarios" para que pueda ser utilizada en otros archivos.
// Es "async" porque dentro se realizan operaciones asíncronas (peticiones HTTP al servidor).
export const getUsuarios = async () => {
  // Realiza una petición HTTP GET a la URL 'http://localhost:3001/usuarios' usando la API Fetch.
  // "await" pausa la ejecución de esta función hasta que el servidor responda.
  const solicitud = await fetch('http://localhost:3001/usuarios');

  // Convierte el cuerpo de la respuesta del servidor de formato JSON a un objeto/arreglo de JavaScript.
  const datos = await solicitud.json();

  // Retorna el arreglo de usuarios obtenido del servidor para que el código que llamó a esta función lo pueda usar.
  return datos;
}
