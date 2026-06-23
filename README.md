# CodeVector Assignment

## Live Links

### Backend
https://codevector-assignment-983p.onrender.com

### Frontend
https://your-app.vercel.app

### GitHub Repository
https://github.com/Vedant21072006/CodeVector-Assignment

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- React (Frontend)
- Render (Backend Deployment)
- Vercel (Frontend Deployment)

## Features

- Browse 200,000 products
- Category filtering
- Cursor-based pagination
- Snapshot pagination for consistency
- Indexed MongoDB queries
- Simple frontend UI

## Running Locally

```bash
npm install
npm run seed
npm run dev
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

## API

### Get Products

```http
GET /products
```

### Filter By Category

```http
GET /products?category=Books
```

## Design Decisions

- Used MongoDB Atlas for storage.
- Generated 200,000 products using batch inserts (`insertMany`).
- Used cursor-based pagination instead of `skip()` for better performance on large datasets.
- Used snapshot pagination to prevent duplicates or missing products when data changes during browsing.
- Added indexes on `updatedAt`, `_id`, and `category` to optimize filtering and sorting.

## Future Improvements

- Automated tests
- API documentation
- Better frontend pagination UX
- Request validation

## Author

Vedant Rathod
