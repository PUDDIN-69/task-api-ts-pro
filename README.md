# Task API REST - TypeScript + Express + Docker

## 📌 Descripción

Task API REST es una API REST desarrollada con TypeScript, Node.js y Express para la gestión de tareas.

Permite crear, consultar, listar y actualizar tareas mediante endpoints REST, utilizando respuestas JSON consistentes, validaciones y códigos HTTP apropiados.

La información se almacena utilizando SQLite como base de datos.

---

# 🛠 Tecnologías Utilizadas

- TypeScript
- Node.js
- Express
- SQLite
- UUID
- Jest
- Supertest
- Docker
- Swagger
- Thunder Client

---

# 📋 Requisitos Previos

Antes de ejecutar el proyecto es necesario tener instalado:

- Node.js (versión 18 o superior recomendada)
- npm
- Visual Studio Code
- Docker Desktop (opcional)
- Thunder Client o Postman para pruebas de endpoints (captura de pantalla de guia)

Verificar instalación:

```bash
node -v
npm -v
````

---

# ⚙️ Instalación del Proyecto

## 1. Clonar repositorio

```bash
git clone <URL_DEL_REPOSITORIO>

cd task-api-ts-pro
```

---

## 2. Instalar dependencias

Ejecutar:

```bash
npm install
```

Este comando instala todas las dependencias definidas en `package.json`.

---

# ▶️ Ejecución del Proyecto

## Modo Desarrollo

```bash
npm run dev
```

## Compilar TypeScript

```bash
npm run build
```

## Modo Producción

```bash
npm start
```

La API estará disponible en:

```
http://localhost:3000
```

Documentación Swagger:

```
http://localhost:3000/api-docs
```

---

# 📂 Modelo de Datos

Ejemplo de una tarea:

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "priority": "low | medium | high",
  "status": "pending | in progress | done",
  "progreso": 0,
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

El campo `progreso` se actualiza automáticamente según el estado:

| Estado      | Progreso |
| ----------- | -------- |
| pending     | 0        |
| in progress | 50       |
| done        | 100      |

---

# 📡 Endpoints Disponibles

Base URL:

```
http://localhost:3000
```

---

# 1. Obtener todas las tareas

## GET /items

Lista todas las tareas registradas.

Solicitud:

```http
GET http://localhost:3000/items
```

También permite paginación:

```http
GET http://localhost:3000/items?page=1&limit=10
```

Respuesta:

```json
{
  "success": true,
  "data": []
}
```

---

# 2. Obtener tarea por ID

## GET /items/:id

Consulta una tarea específica.

Solicitud:

```http
GET http://localhost:3000/items/{id}
```

Ejemplo:

```http
GET http://localhost:3000/items/7e50f36d-694a-46a7-b8eb-b5fcf18692ab
```

Respuesta:

```json
{
  "success": true,
  "data": {
    "id": "7e50f36d-694a-46a7-b8eb-b5fcf18692ab",
    "title": "Configurar servidor",
    "description": "Instalación de servicios",
    "priority": "high",
    "status": "pending",
    "progreso": 0
  }
}
```

---

# 3. Crear una tarea

## POST /items

Crea una nueva tarea.

Solicitud:

```http
POST http://localhost:3000/items
```

Body:

```json
{
  "title": "Configurar Docker",
  "description": "Crear imagen del proyecto",
  "priority": "high"
}
```

Respuesta:

```http
201 Created
```

Ejemplo:

```json
{
  "success": true,
  "data": {
    "title": "Configurar Docker",
    "priority": "high",
    "status": "pending",
    "progreso": 0
  }
}
```

---

# 4. Actualizar estado de una tarea

## PATCH /items/:id


Te dejo únicamente las partes que debes **reemplazar** en tu README. El resto queda igual.

Cambia esta sección:

````md

# 4. Actualizar una tarea parcialmente

## PATCH /items/:id

Permite actualizar parcialmente una tarea existente.

Los campos que pueden modificarse son:

- `status`
- `priority`
- `description`

Solicitud:

```http
PATCH http://localhost:3000/items/{id}
````

---

## Actualizar estado de una tarea

Body:

```json
{
  "status": "in progress"
}
```

El campo `progreso` se actualiza automáticamente según el estado:

| Estado      | Progreso |
| ----------- | -------- |
| pending     | 0        |
| in progress | 50       |
| done        | 100      |

Respuesta:

```json
{
  "success": true,
  "message": "Updated"
}
```

---

## Actualizar prioridad

Body:

```json
{
  "priority": "medium"
}
```

Valores permitidos:

* low
* medium
* high

---

## Actualizar descripción

Body:

```json
{
  "description": "Nueva descripción de la tarea"
}
```

---

## Actualizar varios campos al mismo tiempo

Body:

```json
{
  "priority": "high",
  "status": "in progress",
  "description": "Configuración del servidor en proceso"
}
```

Respuesta:

```json
{
  "success": true,
  "message": "Updated"
}
```

Si el ID de la tarea no existe:

```json
{
  "success": false,
  "message": "Item not found"
}
```

## Actualización de tareas (PATCH)

Campos modificables:

- `status`
- `priority`
- `description`

Validación de status:

- pending
- in progress
- done

Validación de priority:

- low
- medium
- high

El progreso se calcula automáticamente:

| Estado | Progreso |
|---|---|
| pending | 0 |
| in progress | 50 |
| done | 100 |


---

# ❌ DELETE /items/:id

El endpoint también permite eliminar tareas.

Solicitud:

```http
DELETE http://localhost:3000/items/{id}
```

Respuesta:

```json
{
  "success": true,
  "message": "Deleted successfully"
}
```

---

# ✅ Validaciones Implementadas

## Creación de tareas

Campos obligatorios:

* `title`
* `priority`

Valores permitidos:

Priority:

* low
* medium
* high

---

## Actualización

Status permitido:

* pending
* in progress
* done

---

# 📊 Códigos HTTP

| Código | Descripción           |
| ------ | --------------------- |
| 200    | Solicitud exitosa     |
| 201    | Recurso creado        |
| 400    | Error de validación   |
| 404    | Recurso no encontrado |

---

# 🧪 Tests

Ejecutar:

```bash
npm test
```

Resultado esperado:

```text
PASS

Test Suites: 1 passed
Tests: 1 passed
```

---

# 🐳 Docker

## Crear imagen

```bash
docker build -t task-api-ts-pro .
```

## Ejecutar contenedor

```bash
docker run -p 3000:3000 task-api-ts-pro
```

La API estará disponible en:

```
http://localhost:3000/items
```

Swagger:

```
http://localhost:3000/api-docs
```

---

# 🧪 Pruebas con Thunder Client

Thunder Client permite probar los endpoints directamente desde Visual Studio Code.

Instalación:

1. Abrir Visual Studio Code.
2. Ir a extensiones.
3. Buscar:

```
Thunder Client
```

4. Instalar.

Luego ejecutar las solicitudes HTTP usando los endpoints descritos anteriormente.

---

# 📁 Estructura del Proyecto

```
task-api-ts-pro
│
├── src
│   ├── app.ts
│   ├── db.ts
│   └── routes
│       └── items.ts
│
├── tests
│   └── items.test.ts
│
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

