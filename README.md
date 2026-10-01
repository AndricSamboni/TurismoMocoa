# Mocoa Vive — Web App for Local Tourism Experiences

Versión 2 del prototipo académico para el curso Aplicaciones Multimedia (UNAD).

## Objetivo del prototipo
Crear una aplicación web bilingüe (español/inglés) que permita explorar experiencias turísticas de Mocoa, Putumayo, mediante categorías, fichas individuales y un mapa interactivo.

## Arquitectura
- `index.html`: inicio.
- `naturaleza.html`, `biodiversidad.html`, `cultura.html`, `gastronomia.html`: secciones independientes.
- `experiencias/`: fichas individuales de experiencias.
- `mapa.html`: mapa interactivo con Leaflet + OpenStreetMap.
- `js/data.js`: fuente central de contenido bilingüe y datos de experiencias.
- `js/main.js`: renderizado, navegación y selector de idioma.
- `js/map.js`: lógica del mapa.
- `css/styles.css`: sistema visual responsive.
- `assets/images/`: repositorio local de fotografías/ilustraciones.

## Imágenes
Las imágenes no se incluyen. Coloca tus fotografías con los nombres indicados en `assets/images/`. Puedes reemplazar los archivos por material propio con permiso de uso.

## Bilingüismo
El idioma se guarda en `localStorage` como `mocoa-lang`. Para añadir contenido, agrega las propiedades `es` y `en` en `js/data.js`.

## Mapa
El mapa utiliza Leaflet desde CDN y OpenStreetMap como capa cartográfica. Algunas coordenadas son de referencia y deben verificarse antes de una publicación académica o pública. En especial, evita presentar coordenadas aproximadas como datos oficiales.

## Expansión futura
1. Filtros por tipo de experiencia.
2. Rutas completas con varios puntos.
3. Favoritos y planificación de viaje.
4. Datos de operadores y contactos.
5. PWA instalable.
6. Optimización de imágenes y accesibilidad WCAG.
7. Backend/API para administrar experiencias sin editar `data.js`.

## Fuentes consultadas para el contenido inicial
- Alcaldía de Mocoa: sitios de interés y fiestas/celebraciones.
- Visita Putumayo: atractivos turísticos de Mocoa.
- Colombia Travel / ProColombia: guía de Mocoa.
- Plan de Desarrollo Municipal de Mocoa 2024–2027.
- FONTUR: Plan de Desarrollo Turístico de Mocoa.
- Asamblea Departamental de Putumayo: documentación sobre el tacacho.
- AgroNET: Tour Gastronómico por la Paz (2022).
- Sitio oficial de Amazónico Restaurante.

Nota: las fuentes sirven como base de investigación del prototipo. Antes de publicar, verifica horarios, precios, accesos, permisos, seguridad, operación turística y vigencia de eventos.
