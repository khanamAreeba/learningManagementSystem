# 📚 LMS Project – Assignment Week 1

A full-stack **Learning Management System (LMS)** built using **Angular (Frontend)** and **Laravel (Backend API)**.
This project demonstrates CRUD operations, API integration, and a modular project structure.

---

## 🚀 Tech Stack

### 🔹 Frontend

* Angular (v19)
* TypeScript
* HTML5 / CSS3

### 🔹 Backend

* Laravel
* RESTful APIs
* MySQL (or any supported DB)

---

## ✨ Features

* 📖 Course Management System
* ➕ Add / ✏️ Edit / ❌ Delete functionality
* 🔗 Frontend–Backend API Integration
* 📊 Dynamic UI with Angular
* 📱 Responsive Design

---

## 📁 Project Structure

```
project-root/
│
├── backend/        # Laravel API
├── front-end/      # Angular Application
└── README.md
```

---

## ⚙️ Getting Started

### 🔽 Clone the Repository

```bash
git clone <your-repository-link>
cd project-root
```

---

### 🔧 Backend Setup (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```

Backend will run on:
👉 http://127.0.0.1:8000/

---

### 💻 Frontend Setup (Angular)

```bash
cd front-end
npm install
ng serve
```

Frontend will run on:
👉 http://localhost:4200/

---

## 🔗 API Configuration

Make sure your Angular app is pointing to the correct backend API URL in environment files.

Example:

```ts
apiUrl: 'http://127.0.0.1:8000/api'
```

---

## 🧪 Running Tests

### Frontend Tests

```bash
ng test
```

---

## 📸 Screenshots

*Add screenshots of your UI here (optional but recommended)*

---

## 👩‍💻 Author

**Areeba Khan**

---

## 📌 Important Notes

* Always start the backend server before the frontend
* Ensure database is properly configured in `.env`
* Update API endpoints if running on different ports

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!
