# Task API TypeScript

## Instalación
npm install

## Desarrollo
npm run dev

## Tests
npm test


## Endpoints
GET /items
GET /items/:id
POST /items
PATCH /items/:id


# 📝 Modelo de Datos

```json
{
  "id": "uuid",
  "title": "string",
  "priority": "low | medium | high",
  "status": "pending | in progress | done",
  "createdAt": "ISO-8601",
  "description": "string"
}
```
> **IMPORTANTE:** Para una mejor visualización de las respuestas JSON en el navegador web, se recomienda utilizar la opción de impresión con sangría (Pretty Print / JSON Formatter), ya que facilita la lectura de la estructura de datos devuelta por la API.


# Task API REST - TypeScript + Express + Docker

## Descripción
# 🚀 Task API REST

## 📌 Descripción

Task API REST es una API desarrollada con TypeScript, Node.js y Express para la gestión de tareas. La aplicación permite crear, consultar y actualizar tareas mediante endpoints REST, utilizando respuestas JSON consistentes y códigos HTTP apropiados.

El proyecto fue desarrollado como solución a una prueba técnica orientada al desarrollo backend.

---

# 🛠 Tecnologías Utilizadas

* TypeScript
* Node.js
* Express
* UUID
* Jest
* Docker
* Thunder Client

---

# 📋 Requisitos Previos

Antes de ejecutar el proyecto es necesario tener instalado:

* Node.js (versión 18 o superior recomendada)
* npm
* Visual Studio Code
* Docker Desktop (opcional)
* Thunder Client (para pruebas)

Verificar instalación:

```bash
node -v
npm -v
```

---

# ⚙️ Instalación del Proyecto

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd task-api-ts-pro
```

## 2. Instalar dependencias

Ejecutar:

```bash
npm install
```

Este comando descargará e instalará todas las dependencias definidas en el archivo package.json.

### Dependencias principales utilizadas

#### Express

Framework utilizado para construir la API REST.

```bash
npm install express
```

#### TypeScript

Permite desarrollar utilizando tipado estático sobre JavaScript.

```bash
npm install typescript --save-dev
```

#### UUID

Utilizado para generar identificadores únicos para cada tarea.

```bash
npm install uuid
```

#### Jest

Utilizado para pruebas unitarias.

```bash
npm install jest ts-jest @types/jest --save-dev
```

---

# ▶️ Ejecución del Proyecto

## Modo Desarrollo

```bash
npm run dev
```

## Modo Producción

```bash
npm run build
npm start
```

Una vez iniciado correctamente el servidor, la API estará disponible en:

```text
http://localhost:3000/items
```

---

# 🧪 Pruebas con Thunder Client

## ¿Qué es Thunder Client?

Thunder Client es una extensión para Visual Studio Code que permite realizar solicitudes HTTP directamente desde el editor.

Es una alternativa ligera a Postman y resulta ideal para probar APIs REST.

## Instalación

1. Abrir Visual Studio Code.
2. Presionar:

```text
Ctrl + Shift + X
```

3. Buscar:

```text
Thunder Client
```

4. Instalar la extensión.

## Verificación Inicial

Una vez iniciado el servidor:

```text
http://localhost:3000/items
```

Crear una nueva solicitud en Thunder Client y probar los endpoints.

---

# 📡 Endpoints Disponibles

## 1. Obtener todas las tareas

Retorna la lista completa de tareas almacenadas.

### Solicitud

```http
GET http://localhost:3000/items
```

### Paginación opcional

```http
GET http://localhost:3000/items?page=1&limit=10
```

### Respuesta esperada

```json
{
  "success": true,
  "data": []
}
```

---

## 2. Obtener una tarea por ID

Retorna una tarea específica utilizando su identificador único.

### Solicitud

```http
GET http://localhost:3000/items/{id}
```

### Ejemplo

```http
GET http://localhost:3000/items/7e50f36d-694a-46a7-b8eb-b5fcf18692ab
```

### Respuesta esperada

```json
{
  "success": true,
  "data": {
    "id": "7e50f36d-694a-46a7-b8eb-b5fcf18692ab",
    "title": "Prueba técnica completa",
    "priority": "high",
    "status": "pending"
  }
}
```

---

## 3. Crear una nueva tarea

Permite registrar una nueva tarea.

### Solicitud

```http
POST http://localhost:3000/items
```

### Body

```json 
         JSON Content
{
  "title": "Prueba técnica completa",
  "priority": "high",
  "description": "Validación de API REST con TypeScript"
}
```

### Respuesta esperada

```http
201 Created
```

---

## 4. Actualizar estado de una tarea

Permite modificar el estado actual de una tarea.

### Solicitud

```http
PATCH http://localhost:3000/items/{id}
```

### Ejemplo

```http
PATCH http://localhost:3000/items/7e50f36d-694a-46a7-b8eb-b5fcf18692ab
```

### Body

```json
{
  "status": "done"
}
```

### Respuesta esperada

```json
{
  "success": true,
  "data": {
    "status": "done"
  }
}
```

# ✅ Validaciones Implementadas

Al crear una tarea:

* title es obligatorio.
* priority es obligatorio.
* priority acepta únicamente:

  * low
  * medium
  * high

Al actualizar una tarea:

* status acepta únicamente:

  * pending
  * in progress
  * done

---

# 📊 Códigos HTTP Utilizados

| Código | Descripción                  |
| ------ | ---------------------------- |
| 200    | Solicitud exitosa            |
| 201    | Recurso creado correctamente |
| 400    | Error de validación          |
| 404    | Recurso no encontrado        |

---

# 🧪 Ejecución de Tests

Para ejecutar las pruebas unitarias:

```bash
npm test
```

Si las pruebas son exitosas se mostrará un resultado similar a:

```text
PASS
Test Suites: 1 passed
Tests: 1 passed
```

---

# 🐳 Docker

## Construcción de la imagen

```bash
docker build -t task-api-ts-pro .
```

## Ejecución del contenedor

```bash
docker run -p 3000:3000 task-api-ts-pro
```

La API quedará disponible en:

```text
http://localhost:3000/items
```
