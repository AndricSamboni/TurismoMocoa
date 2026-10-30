# Mocoa Vive — aplicación web de experiencias turísticas locales

Versión revisada del prototipo académico para el curso Aplicaciones Multimedia (UNAD).

## Objetivo del prototipo
Crear una aplicación web bilingüe (español/inglés) para explorar experiencias turísticas de Mocoa, Putumayo, mediante categorías, fichas individuales y un mapa interactivo. El nombre de marca **Mocoa Vive** se conserva igual en ambos idiomas.

## Arquitectura
- `index.html`: página de inicio.
- `naturaleza.html`, `biodiversidad.html`, `cultura.html`, `gastronomia.html`: páginas de categorías.
- `experiencias/`: fichas individuales con descripción y galería.
- `mapa.html`: mapa interactivo con Leaflet y OpenStreetMap.
- `creditos.html`: créditos de imágenes y fuentes consultadas, visibles dentro de la aplicación.
- `js/data.js`: contenido bilingüe, descripciones adicionales, etiquetas, textos alternativos y nombres de archivo de imágenes.
- `js/main.js`: renderizado de páginas, navegación, selector de idioma y página de créditos.
- `js/map.js`: mapa, marcadores, búsqueda y mensajes bilingües.
- `css/styles.css`: estilos responsive.
- `assets/images/`: contiene las imágenes locales usadas por el prototipo; **las imágenes sí están incluidas en este ZIP**.

## Imágenes y accesibilidad
Las imágenes del proyecto se incluyen en `assets/images/` y se cargan localmente. Las fichas incluyen texto alternativo descriptivo en español e inglés. Se retiró `loma-mocoa.webp`, que tenía una marca de agua identificable, y se sustituyó su uso por `la-loma-1.webp`, una imagen incluida en el propio paquete y sin esa marca visible.

**Importante sobre los derechos de uso:** se incorporaron las atribuciones y enlaces suministrados por el responsable del proyecto en `js/data.js`, `creditos.html` y `FUENTES.md`. Los archivos sin referencia específica se identifican como `NA`. La atribución no demuestra por sí sola que exista permiso de reutilización: antes de publicar el sitio en abierto o usarlo comercialmente, verifica la licencia o autorización de cada archivo.

## Bilingüismo
El idioma se guarda en `localStorage` con la clave `mocoa-lang`. El selector actualiza los títulos, botones, descripciones, etiquetas, mensajes del mapa y avisos. El nombre de marca es invariable: “Mocoa Vive”. Al añadir experiencias, agrega los textos `es` y `en` en `js/data.js` y actualiza sus textos alternativos.

## Mapa
El mapa usa Leaflet desde CDN y teselas de OpenStreetMap. Requiere conexión a Internet. Algunas coordenadas son de referencia y deben comprobarse antes de una publicación académica o pública; no deben presentarse como coordenadas oficiales sin verificación.

## Fuentes consultadas
La página `creditos.html` muestra las fuentes de información directamente en la aplicación. La lista con referencias y URL también se conserva en `FUENTES.md`.

## Expansión futura
1. Filtros por tipo de experiencia.
2. Rutas completas con varios puntos.
3. Favoritos y planificación de viaje.
4. Datos de operadores y contactos.
5. PWA instalable.
6. Auditoría completa de accesibilidad y atribución de imágenes.
7. Backend/API para administrar experiencias sin editar `data.js`.

## Pruebas realizadas en esta revisión
- Revisión sintáctica de `js/main.js`, `js/map.js` y `js/data.js`.
- Comprobación de que cada ficha HTML identifica el ID correspondiente a los datos.
- Comprobación de rutas locales de imágenes y enlaces internos.
- Revisión estática de las rutas locales de imágenes, enlaces internos, IDs de fichas y pares de textos en español/inglés.
- Prueba DOM aislada en español e inglés para inicio, categoría Naturaleza, fichas Fin del Mundo y La Loma, textos comunes del mapa y página de créditos; esta prueba no verifica la carga de teselas externas en el hosting.

Nota: verifica horarios, precios, accesos, permisos, seguridad y operación turística antes de una visita. La publicación abierta exige completar la atribución de cada fotografía, cuyo registro no estaba presente en el archivo recibido.


## Créditos y fuentes de imágenes

Los créditos visuales se consultan dentro de la aplicación en `creditos.html`. El registro detallado por archivo se encuentra en `FUENTES.md` y en el arreglo bilingüe `imageCredits` de `js/data.js`. Los archivos con `NA` no tienen una referencia específica suministrada. La atribución no sustituye la verificación de permisos o licencias de reutilización.
