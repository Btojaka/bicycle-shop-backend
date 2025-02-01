# 🚴 Bicycle Shop Backend (ENGLISH)

## 📌 Description

This is the backend for a bicycle e-commerce platform that allows users to customize their bicycles and administrators to manage the product and part catalog.

## 🛠 Technologies Used

- **Backend**: Node.js, TypeScript, Express
- **Database**: PostgreSQL (Railway), Sequelize (ORM)
- **Testing**: Jest, Supertest
- **Documentation**: Swagger
- **Additional Tools**: Railway, TablePlus, Code Coverage

---

## 📁 Backend Structure

```
/bicycle-shop-backend
│── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Endpoint logic
│   ├── models/          # Sequelize models
│   ├── routes/          # Express route definitions
│   ├── middlewares/     # Validation and security middlewares
│   ├── helpers/         # Helper functions (validations, restrictions)
│   ├── tests/           # Unit and integration tests
│   ├── app.ts           # Main Express configuration
│   ├── server.ts        # API entry point
│── package.json
│── tsconfig.json
│── README.md
```

---

## 🚀 Installation and Setup

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/Btojaka/bicycle-shop-backend.git
```

### **2️⃣ Install Dependencies**

```bash
npm install
```

### **3️⃣ Configure Environment Variables**

Create a `.env` file in the project root with the following structure:

```
DATABASE_URL=postgres://user:password@host:port/database
PORT=4000
NODE_ENV=development
```

### **4️⃣ Run the Server**

```bash
npm run dev
```

The backend will run at `http://localhost:4000/api`.

---

## 📌 Decisions Made and Trade-offs

### **1️⃣ Initial Modeling and Evolution**

Initially, the models were designed only for **bicycles** and their parts. However, to allow future expansion of the e-commerce platform to other products like **skis or scooters**, the structure was adjusted to be more generic and scalable.

- **Key Change**: Transition from a `Bicycle` model to a more flexible `Product` model with customizations through `Parts`.
- **Trade-off**: Greater flexibility, but increased complexity in validations.

### **2️⃣ Using Sequelize as ORM**

Sequelize was chosen for its ease of use and compatibility with PostgreSQL, allowing TypeScript model definitions and clear relationship management.

- **Advantages**:
  - Compatibility with multiple databases.
  - Built-in model validations.
  - Easy management of `1:N` and `N:M` relationships.
  - Simplifies maintenance and scalability.
- **Disadvantages**:
  - Lower performance compared to native SQL queries.

### **3️⃣ Implementation of Dynamic Validations**

Since some part combinations do not make sense (e.g., mountain wheels with a road frame), a restriction validation was implemented to **prevent invalid product configurations**.

- **Example of Applied Restrictions**:
  - `mountain wheels` can only be used with a `full-suspension frame`.
  - `fat bike wheels` cannot have a `red rim color`.

### **4️⃣ Availability Management Based on Stock**

To prevent customers from purchasing out-of-stock products, the backend **automatically marks products as 'unavailable' (`isAvailable: false`) if they contain out-of-stock parts**.

- **Advantage**: Allows pre-configuring models without stock without deleting them.
- **Disadvantage**: Requires additional logic to dynamically update `isAvailable`.

---

## 🌐 API Endpoints

| Method     | Endpoint                         | Description                      |
| ---------- | -------------------------------- | -------------------------------- |
| **GET**    | `/api/products`                  | Retrieve all products            |
| **POST**   | `/api/products`                  | Create a new product             |
| **GET**    | `/api/products/:id`              | Retrieve a product by ID         |
| **PUT**    | `/api/products/:id`              | Fully update a product           |
| **PATCH**  | `/api/products/:id`              | Partially update a product       |
| **DELETE** | `/api/products/:id`              | Delete a product                 |
| **GET**    | `/api/parts`                     | Retrieve all available parts     |
| **POST**   | `/api/parts`                     | Create a new part                |
| **PUT**    | `/api/parts/:id`                 | Fully update a part              |
| **PATCH**  | `/api/parts/:id`                 | Partially update a part          |
| **DELETE** | `/api/parts/:id`                 | Delete a part                    |
| **GET**    | `/api/custom-products`           | Retrieve all custom products     |
| **POST**   | `/api/custom-products`           | Create a custom product          |
| **GET**    | `/api/custom-products/:id`       | Retrieve a custom product by ID  |
| **PUT**    | `/api/custom-products/:id`       | Update a custom product          |
| **PATCH**  | `/api/custom-products/:id/parts` | Modify parts of a custom product |
| **DELETE** | `/api/custom-products/:id`       | Delete a custom product          |

---

## 📜 Request and Response Example

### **Example: Creating a Custom Product**

#### **📝 Request**

```json
POST /api/custom-products
{
  "name": "Custom Mountain Bike",
  "price": 1200.50,
  "typeProduct": "bicycle",
  "parts": [1, 2, 3]
}
```

#### **📨 Response**

```json
{
  "id": 5,
  "name": "Custom Mountain Bike",
  "price": 1200.5,
  "typeProduct": "bicycle",
  "parts": [
    { "id": 1, "category": "frame", "value": "aluminum" },
    { "id": 2, "category": "wheels", "value": "mountain wheels" },
    { "id": 3, "category": "brakes", "value": "hydraulic disc" }
  ]
}
```

---

## 📌 Author

🚀 \*Developed by **[Btojaka](https://github.com/Btojaka)\***

# 🚴 Tienda de bicicletas Backend (ESPAÑOL)

## 📌 Descripción

Este es el backend para un ecommerce de bicicletas que permite a los usuarios personalizar sus bicicletas y a los administradores gestionar el catálogo de productos y partes.

## 🛠 Tecnologías utilizadas

- **Backend**: Node.js, TypeScript, Express
- **Base de datos**: PostgreSQL (Railway), Sequelize (ORM)
- **Testing**: Jest, Supertest
- **Documentación**: Swagger
- **Herramientas adicionales**: Railway, TablePlus, Code Coverage

---

## 📁 Estructura del Backend

```
/bicycle-shop-backend
│── src/
│   ├── config/          # Configuración de base de datos
│   ├── controllers/     # Lógica de los endpoints
│   ├── models/          # Modelos de Sequelize
│   ├── routes/          # Definición de rutas Express
│   ├── middlewares/     # Middlewares de validación y seguridad
│   ├── helpers/         # Funciones auxiliares (validaciones, restricciones)
│   ├── tests/           # Pruebas unitarias y de integración
│   ├── app.ts           # Configuración principal de Express
│   ├── server.ts        # Punto de entrada de la API
│── package.json
│── tsconfig.json
│── README.md
```

---

## 🚀 Instalación y configuración

### **1️⃣ Clonar el repositorio**

```bash
git clone https://github.com/Btojaka/bicycle-shop-backend.git
```

### **2️⃣ Instalar dependencias**

```bash
npm install
```

### **3️⃣ Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```
DATABASE_URL=postgres://usuario:password@host:puerto/database
PORT=4000
NODE_ENV=development
```

### **4️⃣ Ejecutar el servidor**

```bash
npm run dev
```

El backend se ejecutará en `http://localhost:4000/api`.

---

## 📌 Decisiones tomadas y trade-offs

### **1️⃣ Modelado inicial y evolución**

Inicialmente, se diseñaron modelos centrados solo en **bicicletas** y sus partes. Sin embargo, con el objetivo de permitir la futura expansión del ecommerce a otros productos como **esquís o patinetes**, se ajustó la estructura para ser más genérica y escalable.

- **Cambio clave**: De un modelo `Bicycle` a un modelo `Product`, con personalizaciones a través de `Parts`.
- **Trade-off**: Mayor flexibilidad, pero mayor complejidad en validaciones.

### **2️⃣ Uso de Sequelize como ORM**

Se eligió Sequelize por su facilidad de uso y compatibilidad con PostgreSQL, permitiendo definir modelos en TypeScript y manejar relaciones de forma clara.

- **Ventajas**:
  - Compatibilidad con múltiples bases de datos.
  - Validaciones incorporadas en modelos.
  - Gestión sencilla de relaciones `1:N` y `N:M`.
  - Facilidad de mantenimiento y escalabilidad.
- **Desventajas**:
  - Menor rendimiento en comparación con consultas SQL nativas.

### **3️⃣ Implementación de validaciones dinámicas**

Dado que algunas combinaciones de partes no tienen sentido (ejemplo: ruedas de montaña con un cuadro de carretera), se implementó una validación de restricciones que **impide crear productos inválidos**.

- **Ejemplo de restricciones aplicadas**:
  - `mountain wheels` solo pueden ser usadas con `full-suspension frame`.
  - `fat bike wheels` no pueden tener `red rim color`.

### **4️⃣ Manejo de disponibilidad en función del stock**

Para evitar que los clientes compren productos sin stock, el backend **marca automáticamente como 'no disponible' (`isAvailable: false`) aquellos productos que incluyan partes agotadas**.

- **Ventaja**: Permite preconfigurar modelos sin stock sin eliminarlos.
- **Desventaja**: Necesita una lógica adicional para actualizar dinámicamente `isAvailable`.

---

## 🌐 API Endpoints

| Método     | Endpoint                         | Descripción                                   |
| ---------- | -------------------------------- | --------------------------------------------- |
| **GET**    | `/api/products`                  | Obtener todos los productos                   |
| **POST**   | `/api/products`                  | Crear un producto nuevo                       |
| **GET**    | `/api/products/:id`              | Obtener un producto por su ID                 |
| **PUT**    | `/api/products/:id`              | Actualizar un producto completamente          |
| **PATCH**  | `/api/products/:id`              | Actualizar parcialmente un producto           |
| **DELETE** | `/api/products/:id`              | Eliminar un producto                          |
| **GET**    | `/api/parts`                     | Obtener todas las partes disponibles          |
| **POST**   | `/api/parts`                     | Crear una nueva parte                         |
| **PUT**    | `/api/parts/:id`                 | Actualizar una parte completamente            |
| **PATCH**  | `/api/parts/:id`                 | Actualizar parcialmente una parte             |
| **DELETE** | `/api/parts/:id`                 | Eliminar una parte                            |
| **GET**    | `/api/custom-products`           | Obtener todos los productos personalizados    |
| **POST**   | `/api/custom-products`           | Crear un producto personalizado               |
| **GET**    | `/api/custom-products/:id`       | Obtener un producto personalizado por su ID   |
| **PUT**    | `/api/custom-products/:id`       | Actualizar un producto personalizado          |
| **PATCH**  | `/api/custom-products/:id/parts` | Modificar partes de un producto personalizado |
| **DELETE** | `/api/custom-products/:id`       | Eliminar un producto personalizado            |

---

## 📜 Ejemplo de request y response

### **Ejemplo: Crear un producto personalizado**

#### **📝 Request**

```json
POST /api/custom-products
{
  "name": "Custom Mountain Bike",
  "price": 1200.50,
  "typeProduct": "bicycle",
  "parts": [1, 2, 3]
}
```

#### **📨 Response**

```json
{
  "id": 5,
  "name": "Custom Mountain Bike",
  "price": 1200.5,
  "typeProduct": "bicycle",
  "parts": [
    { "id": 1, "category": "frame", "value": "aluminum" },
    { "id": 2, "category": "wheels", "value": "mountain wheels" },
    { "id": 3, "category": "brakes", "value": "hydraulic disc" }
  ]
}
```

---

## 📌 Autor

🚀 _Desarrollado por \*\*[Btojaka](https://github.com/Btojaka)_
