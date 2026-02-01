# VYBEY — Backend API

VYBEY Backend is a REST API built for a demo e-commerce website.  
It handles product management, image uploads, and database operations for the frontend application.

This backend is created as a **learning and demonstration project** and is connected to a separately deployed frontend.

---

## 🔗 Live API

Base URL:  
https://vybey-backened.onrender.com

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary (image storage)
- Multer (file upload handling)
- dotenv
- CORS

---

## ✨ Features

- Product CRUD operations
- Image upload using Cloudinary
- Trending & Best Seller product filtering
- MongoDB database integration
- RESTful API structure
- Error handling & validation
- Deployed backend environment

---

## 📦 API Routes

### Products

- `GET /api/products`  
  Fetch all products

- `GET /api/products?trending=true`  
  Fetch trending products

- `GET /api/products?bestSeller=true`  
  Fetch best seller products

- `POST /api/products/add`  
  Add a new product (Admin)  
  - Supports image upload via Cloudinary

- `DELETE /api/products/:id`  
  Delete a product by ID

---

## 🧩 Database

- MongoDB is used for storing product data
- Product schema includes:
  - name
  - price
  - image
  - trending (boolean)
  - bestSeller (boolean)
  - timestamps

---

## 🔗 Frontend Connection

This backend is consumed by a separately deployed frontend:

Frontend URL:  
https://aryankhatri7.github.io/vybey-frontend/

The frontend fetches data from this API and renders products dynamically.

---

## 📝 Note

This backend is built **only for learning and demonstration purposes**.  
It is not intended for production or commercial use.

---

## 🚀 Status

- ✔️ MongoDB connected
- ✔️ APIs working
- ✔️ Image uploads functional
- ✔️ Deployed on Render
