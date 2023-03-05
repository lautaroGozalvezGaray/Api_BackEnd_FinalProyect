# Api BackEnd Proyecto Final CoderHouse

## Ejecutar localmente

- Para levantar el proyecto por console podemos simplemente con nodemon server.js

- Para seleccionar un puerto a eleccion nodemon server.js -p 8080 (por defecto toma el puerto 8080)

- Para ejecutar en modo CLUSTER server.js -m CLUSTER


# RUTAS

## CartRutes

- `http://localhost:8080/api/carrito`: mediante POST permite la creacion de un carrito.

- `http://localhost:8080/api/carrito/:id`: para eliminar el carrito. (delete)

- `http://localhost:8080/api/carrito/:id/products`: permite listar los productos. (get)

- `http://localhost:8080/api/carrito/:id/products`: permite agreagar un producto mediante al carrito dado su ID

   ```json
    {
    "id": ,
    "title": "",
    "price": ,
    "thumbnail": "",
    "category":""
   } 
   ```
