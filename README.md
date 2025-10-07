# Employee Data Management Platform

A simple **Employee Management System** built using **Node.js, Express, Prisma, and PostgreSQL** (or any Prisma-supported DB).  
This project provides full **CRUD (Create, Read, Update, Delete)** APIs for managing employee data efficiently.

---

## Tech Stack

**Backend:** Node.js, Express.js, Prisma ORM  
**Database:** PostgreSQL  
**Frontend:** React + Vite (TailwindCSS)  

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/employee-data-management-platform.git
cd employee-data-management-platform
```

### 2. Setup the Server
```bash
cd server
npm install

Create a .env file in the server/ directory:
DATABASE_URL="your_neon_db_connection_string"
PORT=4000

Generate Prisma Client:
npx prisma generate

Run the server:
npm start

Server will run on 👉 http://localhost:4000
```

### 3. Setup the Client
```bash
Create a .env file in the client/ directory:
VITE_API_URL="your_backend_localhost_url"

cd client
npm install
npm run dev
Client will run on 👉 http://localhost:5173
```

### API Endpoints (CRUD)
```bash
Method	    Endpoint	      Description
GET	     /api/employees	    Get all employees
GET	    /api/employees/:id	Get employee by ID
POST	  /api/employees	    Create a new employee
PUT	    /api/employees/:id	Update employee by ID
DELETE	/api/employees/:id	Delete employee by ID
```

### Notes
```bash
Make sure your database is running before starting the server.
You can run npx prisma studio to visually explore your data.
Environment variables are loaded using dotenv.
```
