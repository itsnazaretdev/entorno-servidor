# public/

Archivos estáticos que el navegador descarga tal cual. Express los sirve con `express.static('public')`, así que `public/css/styles.css` se pide como `/css/styles.css`.

## Estructura

```
public/
├── css/
│   └── styles.css    ← estilos de toda la web
├── img/
│   ├── teclado.svg
│   ├── raton.svg
│   ├── monitor.svg
│   ├── auriculares.svg
│   └── placeholder.svg   ← si un producto no tiene imagen
└── js/
    └── main.js       ← JS del navegador (p. ej. el confirm() al eliminar)
```

## Notas

- Los nombres de las imágenes coinciden con el `image_url` de `db/02-seed.sql`.
- Aquí **no** va nada secreto: todo lo de esta carpeta es público.
- Las imágenes son SVG dibujados a mano en tonos pastel: pesan muy poco y no dependen de fotos externas. Puedes sustituirlas por fotos y cambiar la ruta desde el panel.
- Las vistas usan `placeholder.svg` cuando `image_url` está vacío, así ningún producto se queda sin imagen.
- La paleta y la tipografía (Nunito Sans) están definidas como variables al principio de `css/styles.css`.
