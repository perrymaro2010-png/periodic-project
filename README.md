## Periodic Project: Vida Loca Clothing Store
This is the all you need to initate Vida Loca Clothing Store, where you can upload your own products, buy exceptional attire, and keep a clean history for all of your orders! 

Here is the repo link:
https://github.com/perrymaro2010-png/periodic-project

## Prerequisites

- Node.js
- Express.js
- MongoDB
- Mongoose

## Features

**Category API**:
- Create, delete, retrieve, and update

**Products API**:
- Create, soft-delete, retrieve, update, and replace 
- Filter by category, price, stock, and search keyword

**Cart API**:
- Create cart, add items, update item quantity, remove item, clear cart
- Fetches using userID 

**Order API**:
- Create order, get all orders, get specific order, update order status
- gets orders according to orderNumber

Before running, please make sure to have the following packages installed:
- node.js
- Mongoose
- npm
- cors
- dotenv

## Installation

1- Clone repository :
```bash
git clone https://github.com/perrymaro2010-png/periodic-project
```

2- Navigate into Project Folder:
```bash
cd periodic-project
```

3- Install dependencies:
```bash
npm install
```

4- Set up .env file:
```env
PORT=<your_port>
MONGO_URI=<your_connection_string>
```

5- Seed the database
```bash
npm run seed
```

6- Start developmental server
```bash
npm run dev
```

## Environment Variables
| Variable  | Description                     |
| --------- | ------------------------------- |
| PORT      | Port used by the Express server |
| MONGO_URI | MongoDB connection string       |


## API Endpoints
**Category API**

| Method |                   URL                   |     Description    |
|--------|-----------------------------------------|--------------------|
| GET    |http://localhost:5000/api/categories     | Get categories     |
| GET    |http://localhost:5000/api/categories/:id | Get Category by ID |
| POST   |http://localhost:5000/api/categories     | Create Category    |
| PUT    |http://localhost:5000/api/categories/:id | Update Category    |
| DELETE |http://localhost:5000/api/categories/:id | Delete Category    |


**Products API**
| Method |                   URL                   |       Description      |
|--------|-----------------------------------------|------------------------|
| GET    |http://localhost:5000/api/products       | Get Products           |
| GET    |http://localhost:5000/api/products/:id   | Get Product by ID      |
| POST   |http://localhost:5000/api/products       | Create Product         |
| PUT    |http://localhost:5000/api/products/:id   | Update Product         |
| PATCH  |http://localhost:5000/api/products/:id   | Update Product         |
| DELETE |http://localhost:5000/api/products/:id   | Soft-Delete Product    |


**Cart API**

| Method |                   URL                     |        Description       |
|--------|-------------------------------------------|--------------------------|
| GET    |http://localhost:5000/api/cart             | Get Cart                 |
| POST   |http://localhost:5000/api/cart/items       | Add Product to Cart      |
| PATCH  |http://localhost:5000/api/cart/items/:id   | Update Product Quantity  |
| DELETE |http://localhost:5000/api/cart/items/:id   | Remove Product from Cart |
| DELETE |http://localhost:5000/api/cart/items       | Clear Cart               |


**Order API**
| Method |                 URL                 |      Description     |
|--------|-------------------------------------|----------------------|
| GET    |http://localhost:5000/api/orders     | Get All Orders       |
| GET    |http://localhost:5000/api/orders/:id | Get Order by orderID |
| POST   |http://localhost:5000/api/orders     | Create Order         |

## Project Folder Tree
periodic-project/
|
├──controllers/
├──db/
├──middleware/
├──models/
├──routes/
├──utils/
├──.env.example
├──.gitignore
├──E-Commerce API.postman_collection.json
├──main.js
├──package-lock.json
├──package.json
├──README.md
├──README.txt
├──seed.js


## Use of every folder
**controllers/** - has all the API logic stored
**db/** - has the function that connects main.js to MongoDB
**middleware/** - includes errorHandler
**models/** - includes all the schemas for all the models
**routes/** - has all the possible routes for all APIs
**utils/** - includes functions used for error-handling and functions that are needed throughout many files
