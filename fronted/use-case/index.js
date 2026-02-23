// Este archivo es un "barrel file" (archivo barril) para la carpeta "use-case".
// Su propósito es centralizar las exportaciones de todos los casos de uso,
// para que otros archivos puedan importar todo desde un solo punto de entrada.

// Re-exporta la función "ciudades" desde el archivo "getCiudades.js" ubicado en la subcarpeta "ciudades".
// Esto permite importar "ciudades" desde "./use-case/index.js" en vez de "./use-case/ciudades/getCiudades.js".
export { ciudades } from "./ciudades/getCiudades.js";

// Re-exporta la función "generos" desde el archivo "getGeneros.js" ubicado en la subcarpeta "generos".
// Esto permite importar "generos" desde "./use-case/index.js" en vez de "./use-case/generos/getGeneros.js".
export { generos } from "./generos/getGeneros.js";

// Re-exporta la función "getUsuarios" desde el archivo "getUsuarios.js" ubicado en la subcarpeta "usuarios".
export { getUsuarios } from "./usuarios/getUsuarios.js";

// Re-exporta la función "postUsuarios" desde el archivo "postUsuarios.js" ubicado en la subcarpeta "usuarios".
export { postUsuarios } from "./usuarios/postUsuarios.js";

// Re-exporta la función "deleteUsuario" desde el archivo "deleteUsuario.js" ubicado en la subcarpeta "usuarios".
export { deleteUsuario } from "./usuarios/deleteUsuario.js";

// Re-exporta la función "putUsuario" desde el archivo "putUsuario.js" ubicado en la subcarpeta "usuarios".
export { updateUsuario } from "./usuarios/updateUsuario.js";