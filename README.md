# Task Manager App

A full-stack task manager app with a Django backend, PostgreSQL database, and React Native frontend. This app allows users to register, login, create, update, and delete tasks. It uses Docker to containerize both the backend and frontend for easy deployment.


---

## 📘 Introduction & Setup Instructions

This project is hosted at:  
🔗 [GitHub Repository](https://github.com/AMANKUMAR22MCA/taskMangerApp-React-Native-Expo-.git)

### 🔧 Setup Instructions (Step-by-Step)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AMANKUMAR22MCA/taskMangerApp-React-Native-Expo-.git
   cd taskMangerApp-React-Native-Expo-
   ```

2. **Set Up Python Virtual Environment**
   ```bash
   python3 -m venv env
   source env/bin/activate    # macOS/Linux
   env\Scripts\activate     # Windows
   ```

3. **Install Node Modules**
   ```bash
   cd taskMangerApp
   npm install
   ```

4. **Configure Django Settings**
   ```bash
   cd backend/task_manager
   # Open settings.py and update:
   # - DATABASES with your PostgreSQL credentials
   # - ALLOWED_HOSTS with your local IP
   # - CORS_ALLOWED_ORIGINS = ["http://<your-ip>:8081"]
   # - Add db credentials in docker-compose.yml file also
   ```

5. **Get Your Local Device IP**
   ```bash
   ipconfig   # Copy the IPv4 address
   ```

6. **Run the App**
   ```bash
   docker-compose up --build -d
   docker-compose logs -f frontend
   ```

7. **Wait for Metro Bundler to Start**

8. **Install and Launch on Android**
   - Install **Expo Go** from Google Play Store
   - Open Expo Go and manually enter:
     ```
     exp://<your-local-ip>:8081
     ```

---

## 🌟 Features

### Backend (Django)
- ✅ JWT Authentication (Login & Registration)
- ✅ Task CRUD Operations (Create, Read, Update, Delete)
- ✅ PostgreSQL Integration
- ✅ CORS Setup for Frontend Access
- ✅ RESTful API via Django REST Framework

### Frontend (React Native with Expo)
- ✅ Mobile Interface for Task Management
- ✅ User Login/Signup
- ✅ Real-time Task Updates via API
- ✅ QR & Manual Expo Access
- ✅ Dockerized Development Setup

---

## 🏗️ Architecture Overview

```
[ React Native (Expo) ]
         |
   Mobile Frontend
         |
     API Requests
         |
[ Django REST API + PostgreSQL DB ]
         |
   Docker-Compose Orchestration
         |
  Backend & Frontend in Isolated Containers
```

---

## 🧰 Tech Stack

| Layer         | Technology                  |
|---------------|-----------------------------|
| Frontend      | React Native, Expo          |
| Backend       | Django, Django REST Framework |
| Database      | PostgreSQL                  |
| Containerization | Docker, Docker Compose   |
| Auth          | JWT                         |
| Mobile Access | Expo Go App                 |

---

## 🖼️ Screenshots 

> 📷 *screenshots to showcase the UI or API responses.*



![image](https://github.com/user-attachments/assets/2b449a36-a2e3-4951-b30d-0f85adbe56d4)  <br> <br>
![image](https://github.com/user-attachments/assets/3d4ccf96-7acd-419b-9d7e-85addc85be9c)  <br> <br>
![image](https://github.com/user-attachments/assets/28dd145a-40e9-4c4c-ab01-6b706257b0d8)  <br> <br>
![image](https://github.com/user-attachments/assets/fad63ec6-1cba-444c-8886-64577c0692b2)  <br> <br>
![image](https://github.com/user-attachments/assets/c42520db-ef45-400c-8cac-58807e26da6b)  <br> <br>






---
