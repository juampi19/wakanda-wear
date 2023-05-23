# Wakanda - Wear App
para correr localmente, se necesita la base de datos.
```
docker-compose up -d
```

* El -d, significa __detached__

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__
* MongoDB URL local
```
MONGO_URL=mongodb://localhost:27017/wakandadb
```

* Reconstruir los modulos de node y levantar next
```
npm install
npm run dev
```

* Descargar imagen de Mongo 5.0.0
```
docker pull mongo:5.0.0
```

* Llenar base de datos
```
http://localhost:3000/api/entrada
```