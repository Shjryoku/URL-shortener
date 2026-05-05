# 🔗 URL Shortener Service

[![Node.js](https://img.shields.io/badge/Node.js-22-green)]()
[![Docker](https://img.shields.io/badge/Docker-supported-blue)]()
[![License](https://img.shields.io/badge/license-MIT-lightgrey)]()

A simple and efficient URL shortening service built with **Node.js**.  
It allows you to create short links, redirect users, and track click statistics.

---

## 🚀 Features

- 🔗 Generate short URLs
- ↪️ Redirect to original URLs
- 📊 Track click counts
- ⚡ Redis caching
- 🛡 Rate limiting
- 📝 Request logging
- 📚 Swagger API documentation
- 🐳 Docker support

---

## 🛠 Tech Stack

- Node.js
- Express
- Redis
- Docker
- Swagger (OpenAPI)

---

## 📁 Project Structure

```text
.
├── config/             # DB, Redis, Swagger configs
│   ├── db.js
│   ├── redis.js
│   └── swagger.js
├── middleware/         # Rate limiter, request logger
│   ├── md.rateLimiter.js
│   └── md.requestLogger.js
├── urls/               # URL domain logic
│   ├── url.controller.js
│   ├── url.service.js
│   ├── url.model.js
│   ├── url.router.js
│   └── url.counter.js
├── utils/              # Helpers (base62, logger)
│   ├── base62.js
│   └── logger.js
├── logs/               # Log files
├── tests/              # Tests
├── .env.example
├── app.js
├── server.js
├── Dockerfile
├── docker-compose.yml
```
---

## ⚙️ Installation

1. Clone the repository  
```
git clone https://github.com/your-username/url-shortener.git  
cd url-shortener  
```

2. Install dependencies
```
npm install
```

3. Configure environment variables  
Copy `.env.example` to `.env` and update values as needed  
```
cp .env.example .env  
```
4. Run the application  
```
npm run dev  
```

Server will start on the port defined in your `.env` file  

---

## 🐳 Running with Docker
Build and start services  
```
docker-compose --env-file config/.env up --build
```
Stop services  
```
docker-compose down -v
```
---

## 🔑 Environment Variables

Create a `.env` file in the root directory and configure:
```.env
PORT=3000
BASE_URL=http://localhost:3000  
REDIS_HOST=redis  
REDIS_PORT=6379  
DB_URL=your_database_connection  
```
---

## 📡 API Endpoints

POST /api/shorten  
Create a short URL  

GET /:code  
Redirect to the original URL  

GET /api/stats/:code  
Get statistics for a short URL  

---

## 📊 Example Request

POST /api/shorten  

Body:
```
{  
  "url": "https://example.com"  
}
```

Response:  
```
{  
  "shortUrl": "http://localhost:3000/abc123"  
}  
```

---

## 📚 API

Swagger UI is available at  
```
http://localhost:3000/api-docs  
```
---

## 🧪 Testing

Run tests with  
```
npm test  
```
---

## 📦 Logging

Logs are stored in the `logs/` directory  
Includes request logs and server activity  

---

## ⚡ Performance Notes

Redis is used to cache frequently accessed URLs  
This significantly reduces database load and improves redirect speed  

---

## 🛡 Security

Rate limiting is applied to prevent abuse  
Input validation ensures only valid URLs are processed  

---

## 📌 Future Improvements

- User authentication  
- Custom aliases for short URLs  
- Expiration time for links  
- Analytics dashboard  
- QR code generation  

---

## 📄 License

This project is licensed under the MIT License  
