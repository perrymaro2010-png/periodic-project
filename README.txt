## Periodic Project: Vida Loca Clothing Store
This is the all you need to initate Vida Loca Clothing Store, where you can upload your own products, buy exceptional attire, and keep a clean history for all of your orders! 

Here is the repo link:
https://github.com/perrymaro2010-png/periodic-project

## Prerequisites

- Node.js
- Express.js
- MongoDB
- Mongoose

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
git clone https://github.com/perrymaro2010-png/periodic-project

2- Navigate into Project Folder:
cd periodic-project

3- Install dependencies:
npm install

4- Set up .env file:
.env
PORT=
MONGO_URI=

5- Seed the database
npm run seed

6- Start developmental server


| Variable  | Description                     |
| --------- | ------------------------------- |
| PORT      | Port used by the Express server |
| MONGO_URI | MongoDB connection string       |
