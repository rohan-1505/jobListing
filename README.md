# 🧑‍💼 Job Listing Platform (Full Stack)

A full-stack job portal application where users can **create job posts** and **search for jobs** based on skills, description, and experience.

---

## 🚀 Features

* 📝 Create new job listings
* 🔍 Search jobs by keywords
* 🧾 View all job posts
* ❌ Delete job listings
* 📊 Experience & skill tracking

---

## 🛠 Tech Stack

**Backend**

* Java, Spring Boot
* Spring Data MongoDB

**Frontend**

* React.js
* HTML, CSS

**Database**

* MongoDB

---



## 📡 API Endpoints

* `POST /jobs` → Create job
* `GET /jobs` → Get all jobs
* `GET /jobs/search` → Search jobs
* `DELETE /jobs/{id}` → Delete job

---

## ▶️ Run Project

### Backend

```
cd backend
mvn spring-boot:run
```

### Frontend

```
cd frontend
npm install
npm start
```

---

## ⚙️ Configuration

Update MongoDB in `application.properties`:

```
spring.data.mongodb.uri=your_mongodb_url
```

---

## 👨‍💻 Author

Rohan Mahajan
GitHub: https://github.com/rohan-1505

---

## ⭐ Note

Frontend developed collaboratively. Backend and API design implemented by me.
