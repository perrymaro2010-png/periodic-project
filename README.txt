## Periodic Project: Vida Loca Clothing Store
This is the all you need to initate Vida Loca Clothing Store, where you can upload your own products, buy exceptional attire, and keep a clean history for all of your orders! 

Here is the repo link:
https://github.com/perrymaro2010-png/periodic-project

## Prerequisites

- Node.js
- MongoDB
- npm

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

| Method |         URL         |     Description    |
|--------|---------------------|--------------------|
| GET    | /api/categories     | Get categories     |
| GET    | /api/categories/:id | Get Category by ID |
| POST   | /api/categories     | Create Category    |
| PUT    | /api/categories/:id | Update Category    |
| DELETE | /api/categories/:id | Delete Category    |


**Products API**
| Method |         URL         |       Description      |
|--------|---------------------|------------------------|
| GET    | /api/products       | Get Products           |
| GET    | /api/products/:id   | Get Product by ID      |
| POST   | /api/products       | Create Product         |
| PUT    | /api/products/:id   | Update Product         |
| PATCH  | /api/products/:id   | Update Product         |
| DELETE | /api/products/:id   | Soft-Delete Product    |


**Cart API**

| Method |         URL           |        Description       |
|--------|-----------------------|--------------------------|
| GET    | /api/cart             | Get Cart                 |
| POST   | /api/cart/items       | Add Product to Cart      |
| PATCH  | /api/cart/items/:id   | Update Product Quantity  |
| DELETE | /api/cart/items/:id   | Remove Product from Cart |
| DELETE | /api/cart/items       | Clear Cart               |


**Order API**
| Method |           URL          |      Description     |
|--------|------------------------|----------------------|
| GET    | /api/orders            | Get All Orders       |
| GET    | /api/orders/:id        | Get Order by orderID |
| POST   | /api/orders            | Create Order         |
| PATCH  | /api/orders/:id/status | Update Order Status  |

## Project Folder Tree
```text
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
```

## Use of every folder
**controllers/** - has all the API logic concerning requests stored
**db/** - has the function that connects main.js to MongoDB
**middleware/** - includes custom middleware such as errorHandler
**models/** - defines mongoose schemas and models
**routes/** - has all the possible routes and API endpoints
**utils/** - includes functions used for error-handling and are reusable

## Author
**Priscilla Samuel**
This project was developed as part of a backend development course to demonstrate RESTful API development using Node.js, Express.js, MongoDB, and Mongoose.