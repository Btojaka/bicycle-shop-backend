# 🚴 Bicycle Shop Backend

## 📌 Description

This is the backend for a bicycle e-commerce platform that allows users to customize their bicycles and administrators to manage the product and part catalog.

---

## 🚀 Live Demo

The application is deployed at:  
🔗 [Bicycle Shop - Frontend](https://btojaka.github.io/bicycle-shop-frontend/)

---

🛠 ## 🛠 Technologies Used

- **Backend**: Node.js, TypeScript, Express → The core backend stack, ensuring scalability, maintainability, and type safety.
- **Database**: PostgreSQL (Hosted on **Render**) using Sequelize (ORM) → A robust relational database with an ORM to simplify queries and data relationships.
- **Testing**: Jest, Supertest → Ensures the reliability of API endpoints with unit and integration testing.
- **Documentation**: Swagger → Provides clear and interactive API documentation for developers.
- **Additional Tools**: Render, TablePlus, Code Coverage → For hosting, database management, and monitoring test coverage.

### 🔍 Why These Technologies?

- **Node.js & Express** → Chosen for its asynchronous capabilities, efficiency, and vast ecosystem.
- **TypeScript** → Enhances maintainability by adding static typing and catching potential errors at compile time.
- **PostgreSQL & Sequelize** → Provides a powerful relational database with ORM capabilities, making database interactions easier and structured.
- **Jest & Supertest** → Ensures the API functions correctly with automated tests, reducing manual testing effort.
- **Swagger** → Helps document API endpoints, making integration easier for frontend and third-party services.
- **Render & Railway** → Cloud services used for hosting the backend and database, ensuring smooth deployment and scalability.

---

## 🔗 Repositories

- **Frontend Repository:** [Bicycle Shop - Frontend](https://github.com/Btojaka/bicycle-shop-frontend)
- **Backend Repository:** [Bicycle Shop - Backend](https://github.com/Btojaka/bicycle-shop-backend)

---

## 🌐 API Information

🛡️ **API Base URL:**  
[API Base URL](https://bicycle-shop-backend-jqz7.onrender.com/api/products)

📝 **API Documentation:**  
[API Documentation](https://bicycle-shop-backend-jqz7.onrender.com/docs)

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

---

## 🌐 API Endpoints

| Method     | Endpoint                         | Description                               |
| ---------- | -------------------------------- | ----------------------------------------- |
| **GET**    | `/api/products`                  | Retrieve all products                     |
| **POST**   | `/api/products`                  | Create a new product                      |
| **GET**    | `/api/products/:id`              | Retrieve a product by ID                  |
| **PUT**    | `/api/products/:id`              | Fully update a product                    |
| **PATCH**  | `/api/products/:id`              | Partially update a product                |
| **DELETE** | `/api/products/:id`              | Delete a product                          |
| **GET**    | `/api/parts`                     | Retrieve all available parts              |
| **POST**   | `/api/parts`                     | Create a new part                         |
| **PUT**    | `/api/parts/:id`                 | Fully update a part                       |
| **PATCH**  | `/api/parts/:id`                 | Partially update a part                   |
| **DELETE** | `/api/parts/:id`                 | Delete a part                             |
| **GET**    | `/api/custom-products`           | Retrieve all custom products              |
| **POST**   | `/api/custom-products`           | Create a custom product                   |
| **GET**    | `/api/custom-products/:id`       | Retrieve a custom product by ID           |
| **PUT**    | `/api/custom-products/:id`       | Update a custom product                   |
| **PATCH**  | `/api/custom-products/:id/parts` | Modify parts of a custom product          |
| **DELETE** | `/api/custom-products/:id`       | Delete a custom product                   |
| **GET**    | `/api/parts/options`             | Get available part options by typeProduct |

---

## 🎯 Challenges and Solutions

### **1️⃣ Scalability and Data Modeling**

- **Problem:** Initially, the models were designed only for bicycles and parts.
- **Solution:** Created a flexible **Product model** that allows the store to sell different types of products (e.g., bicycles, skis, scooters) without major changes.

### **2️⃣ Database Flexibility with Sequelize**

- **Problem:** Choosing an ORM that balances ease of use and performance.
- **Solution:** Used **Sequelize** for database management, enabling clear relationships and built-in validation while maintaining PostgreSQL compatibility.

### **3️⃣ Dynamic Part Restrictions**

- **Problem:** Some part combinations were invalid (e.g., road tires on a mountain bike).
- **Solution:** Implemented **custom validation logic** to prevent incorrect configurations.

---

## 🚀 Future Improvements

- **Enhance real-time features** (optimistic updates, real-time notifications)
- **Improve performance** (pagination, optimized WebSocket handling)
- **Better UX** (dark mode, better accessibility, product images in admin and store)
- **Advanced admin panel** (sales tracking, best-seller stats, promotions, newsletters)
- **Authentication for users** (saved products, purchase history, recommendations)
- **Increase test coverage** (65-80% minimum, E2E with Cypress/Playwright)

---

## 🎉 Thanks for reading!
