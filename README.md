<h1 align="center">🛒 CRUD_app_backend</h1>

<p align="center">
  A REST API for managing products, built with <b>Node.js</b>, <b>Express 5</b> and <b>MongoDB Atlas</b> (via Mongoose).
</p>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-20.19%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img alt="Mongoose" src="https://img.shields.io/badge/Mongoose-9-880000?style=flat-square&logo=mongoose&logoColor=white" />
</p>

---

## Overview

**CRUD_app_backend** is a backend service that supports full **C**reate, **R**ead, **U**pdate and **D**elete operations on a `Product` collection stored in MongoDB Atlas.

The code follows a simple **MVC-style layout**: routes, controllers and models each live in their own folder. That keeps the code easy to read and leaves room to add more resources later.

## Features

- ✅ **Full CRUD** for products: create, list, get by ID, update and delete
- 🧱 **MVC structure** with separate `routes/`, `controllers/` and `models/` folders
- 📐 **Schema validation** with Mongoose: required fields, number types and defaults
- 🕒 **Automatic timestamps**: every document gets `createdAt` and `updatedAt`
- 🔐 **Credentials kept out of the code**: MongoDB username and password are loaded from an env file that Git ignores
- 📨 **JSON and URL-encoded request bodies** are both accepted
- 🔁 **Hot reload in development** with `nodemon`

## Tech Stack

| Layer | Tool |
|---|---|
| Runtime | [Node.js](https://nodejs.org/) (ES Modules) |
| Web framework | [Express 5](https://expressjs.com/) |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) |
| ODM | [Mongoose 9](https://mongoosejs.com/) |
| Config | [dotenv](https://github.com/motdotla/dotenv) |
| Dev tooling | [nodemon](https://nodemon.io/) |

## Project Structure

```
CRUD_app_backend/
├── controllers/
│   └── product.controller.js   # Request handlers (business logic for each endpoint)
├── models/
│   └── product.model.js        # Mongoose schema and model for Product
├── routes/
│   └── product.route.js        # Maps HTTP methods and paths to controllers
├── index.js                    # App entry: middleware, routes, DB connection, server start
├── package.json
└── .gitignore                  # Ignores node_modules/ and credential env files
```

### Request flow

```
Client ──► Express (index.js) ──► /api/products router ──► controller ──► Mongoose model ──► MongoDB Atlas
```

## Data Model

**`Product`**

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `name` | String | ✅ | | Error message if missing: *"Please enter product name"* |
| `quantity` | Number | ✅ | `0` | |
| `price` | Number | ✅ | `0` | |
| `image` | String | ❌ | | Image URL (optional) |
| `createdAt` | Date | auto | | Added by `timestamps: true` |
| `updatedAt` | Date | auto | | Added by `timestamps: true` |

Example document:

```json
{
  "_id": "66f1c2a9e4b0a1b2c3d4e5f6",
  "name": "Wireless Mouse",
  "quantity": 25,
  "price": 19.99,
  "image": "https://example.com/mouse.png",
  "createdAt": "2026-10-01T12:00:00.000Z",
  "updatedAt": "2026-10-01T12:00:00.000Z",
  "__v": 0
}
```

## API Reference

Base URL: `http://localhost:3000`

| Method | Endpoint | Description | Success response |
|---|---|---|---|
| `GET` | `/` | Health check | `200`: plain-text greeting |
| `GET` | `/api/products` | Get all products | `200`: array of products |
| `GET` | `/api/products/:id` | Get one product by ID | `200`: product object |
| `POST` | `/api/products` | Create a product | `200`: created product |
| `PUT` | `/api/products/:id` | Update a product | `200`: updated product |
| `DELETE` | `/api/products/:id` | Delete a product | `200`: `{ "message": "Product Deleted successfully" }` |

**Error responses**

| Status | When |
|---|---|
| `404` | `PUT` or `DELETE` on an ID that doesn't exist → `{ "message": "Product not found" }` |
| `500` | A validation error, a malformed ID, or a database error → `{ "message": "<error details>" }` |

### Example requests

**Create a product**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Wireless Mouse", "quantity": 25, "price": 19.99}'
```

**Get all products**
```bash
curl http://localhost:3000/api/products
```

**Get one product**
```bash
curl http://localhost:3000/api/products/<id>
```

**Update a product**
```bash
curl -X PUT http://localhost:3000/api/products/<id> \
  -H "Content-Type: application/json" \
  -d '{"price": 17.49}'
```

**Delete a product**
```bash
curl -X DELETE http://localhost:3000/api/products/<id>
```

> 💡 You can also test the endpoints with [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), or the VS Code **Thunder Client** / **REST Client** extensions.

## Getting Started

### Prerequisites

- **Node.js 20.19 or newer** (Mongoose 9 and the MongoDB 7 driver require it)
- A **MongoDB Atlas** cluster and a database user. The [free tier](https://www.mongodb.com/cloud/atlas/register) works.

### 1. Clone and install

```bash
git clone https://github.com/ShardulPanchal24/CRUD_app_backend.git
cd CRUD_app_backend
npm install
```

### 2. Add your database credentials

Create a file named **`atlas-credentials.env`** in the project root. This file is already listed in `.gitignore`.

```env
MONGODB_USERNAME=your_atlas_username
MONGODB_PASSWORD=your_atlas_password
```

The app URL-encodes both values, so passwords with special characters work as they are.

> ⚠️ **Using your own cluster?** The cluster host (`backenddb.cvl13cu.mongodb.net`) and database name (`Node-API`) are written directly in `index.js`. Replace them with your own Atlas connection details. In Atlas, also add your IP address under **Network Access**.

### 3. Run the server

```bash
# Development (restarts automatically when files change)
npm run dev

# Production-style start
npm run serve
```

You should see:

```
Connected to Database!
Server is running on http://localhost:3000
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the server with `nodemon` (hot reload) |
| `npm run serve` | Start the server with `node` |

## Roadmap

- [ ] Return `404` from `GET /api/products/:id` when the product doesn't exist
- [ ] Return `201 Created` for successful `POST` requests
- [ ] Return `400` for validation errors and invalid IDs instead of `500`
- [ ] Move the full Mongo URI and `PORT` into environment variables
- [ ] Run updates through schema validation (`runValidators: true`)
- [ ] Add pagination and filtering to `GET /api/products`
- [ ] Add automated tests (e.g. Jest + Supertest)
- [ ] Add authentication (JWT) for write routes

## Author

**Shardul Panchal** · [@ShardulPanchal24](https://github.com/ShardulPanchal24)

If this project helped you, consider giving it a ⭐!
