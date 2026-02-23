// Exporta la función asíncrona "generos" para que pueda ser utilizada en otros archivos.
// Es "async" porque dentro se realizan operaciones asíncronas (peticiones HTTP al servidor).
export const generos = async () => {
  // Realiza una petición HTTP GET a la URL 'http://localhost:3001/generos' usando la API Fetch.
  // "await" pausa la ejecución de esta función hasta que el servidor responda.
  // La respuesta completa (headers, status, body) se guarda en la constante "solicitud".
  const solicitud = await fetch('http://localhost:3001/generos');

  // Convierte el cuerpo de la respuesta del servidor de formato JSON a un objeto/arreglo de JavaScript.
  // "await" pausa la ejecución hasta que la conversión se complete.
  // El resultado (un arreglo de objetos de géneros) se guarda en la constante "datos".
  const datos = await solicitud.json();

  // Retorna el arreglo de géneros obtenido del servidor para que el código que llamó a esta función lo pueda usar.
  return datos;
}