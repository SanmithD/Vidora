# 🎬 Vidora

Vidora is a **video sharing platform** where users can upload, explore, and watch videos. It offers a streamlined experience similar to YouTube's core features, with a focus on simplicity and functionality.

### [Link link](https://vidora-beta.vercel.app)


![Image](https://github.com/user-attachments/assets/fd7d92a1-33cb-4b8e-bcf4-199fe0ebcfb8)

---

## 🚀 Features

- ✅ **User Authentication**
  - Sign up and login functionality using secure tokens.
- 🎥 **Video Posting**
  - Authenticated users can post and share videos.
- 👤 **Profile Page**
  - View your own uploaded videos and search history.
- 🔎 **Search Functionality**
  - Search for videos based on title content.
- 📺 **Single Video View**
  - Click on a video to open a dedicated page for viewing and details.
- 🌓 **Dark/Light Theme Toggle**
  - Custom UI theme support with Tailwind CSS.

---

## 🖼️ UI Preview

### 🔐 Profile Page
![Image](https://github.com/user-attachments/assets/6f692752-cdb9-45c9-a3a0-77833772d418)

### 🏠 Home Page
![Image](https://github.com/user-attachments/assets/fd7d92a1-33cb-4b8e-bcf4-199fe0ebcfb8)

### 📹 Video Upload
![Image](https://github.com/user-attachments/assets/a74128be-5b30-4eab-baa3-3768bc828938)

---

## 🧾 Tech Stack

### 🔧 Frontend

- [React](w)
- [React Router](w)
- [Vite](w)
- [Zustand](w) – for state management
- [Tailwind CSS](w)

### ⚙ Backend

- [Node.js](w)
- [Express](w)
- [MongoDB](w) & [Mongoose](w)
- [JWT](w) for authentication
- RESTful APIs

---

## 🛠️ Project Structure

```bash
Vidora/
├── client/         # Frontend using React + Vite
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── store/
│       └── ...
├── server/         # Backend using Node.js + Express
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── middlewares/
│       └── routes/
```

### 🧑‍💻 Setup Instructions
``` bash
Clone the Repository

git clone https://github.com/SanmithD/Vidora
cd Vidora

Setup Server
cd server
npm install
# Add your MongoDB URI and JWT secret to .env
npm start

Setup Client
cd client
npm install
npm run dev
```

### 🤝 Contributing
Contributions, issues and feature requests are welcome!
Feel free to open an issue or submit a PR.

### 📝 License
Distributed under the MIT License. See LICENSE for more information.

### 📫 Contact

Created by Sanmith
---

Let me know if you’d like me to auto-generate or compress those image URLs to match your repo structure, or help you create a deployment-ready `.env.example` file.

