// Este archivo es un "barrel file" (archivo barril).
// Su propósito es centralizar las exportaciones de todos los componentes de la carpeta "components".
// Así, cuando otro archivo necesite importar varios componentes, solo necesita importar desde este índice.

// Re-exporta la función "armarCiudades" desde el archivo "ciudades.js".
// Esto permite que otros archivos importen "armarCiudades" desde "./components/index.js" en vez de "./components/ciudades.js".
export { armarCiudades } from './ciudades.js'

// Re-exporta la función "armarGenero" desde el archivo "generos.js".
// Esto permite que otros archivos importen "armarGenero" desde "./components/index.js" en vez de "./components/generos.js".
export { armarGenero } from './generos.js'

// Re-exporta la función "armarUsuarios" desde el archivo "usuarios.js".
export { armarUsuarios } from './usuarios.js'