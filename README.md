# ✨ Sanjana Creations

![Project Banner](https://via.placeholder.com/1200x400?text=Sanjana+Creations+Jewelry+Platform)

<div align="center">

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

**A Premium E-Commerce Experience for Handcrafted Jewelry**

[View Demo](https://full-stack-e-commerce-jewelery-website.onrender.com) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📖 Overview

**Sanjana Creations** is a state-of-the-art e-commerce platform dedicated to showcasing and selling exquisite, handcrafted jewelry. Built with a modern technology stack featuring **React**, **TypeScript**, and **Vite** for a lightning-fast frontend, and powered by a robust **Node.js** and **Express** backend, this application delivers a seamless and visually stunning shopping experience.

The user interface is crafted with **Tailwind CSS** for bespoke styling and **GSAP** for fluid, engaging animations that bring the jewelry collections to life. Whether browsing the latest collections or managing the business from the admin panel, Sanjana Creations represents the perfect fusion of elegance and technology.

## 🚀 Key Features

*   **💎 Immersive User Experience**: Visually stunning interface with smooth transitions, parallax effects, and interactive product showcases.
*   **🛍️ Dynamic Product Showcase**: Unique circular scroll interactions and detailed product views.
*   **🛡️ Secure Authentication**: Robust user registration and login systems (JWT & BCrypt) to protect customer data.
*   **📊 Comprehensive Admin Dashboard**: Real-time management of products, inventory, customers, and orders.
*   **📱 Fully Responsive**: Mobile-first design ensuring a perfect experience on all devices.
*   **⚡ High Performance**: Optimized for speed with Vite and modern React patterns.

## 🛠️ Technology Stack

### Frontend
*   **Framework**: React 19 + TypeScript
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **Animations**: GSAP (GreenSock Animation Platform)
*   **State Management**: Zustand
*   **Routing**: React Router DOM
*   **Icons**: Lucide React

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (Mongoose ODM)
*   **Authentication**: JSON Web Tokens (JWT)
*   **File Handling**: Multer (for image uploads)

---

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites
*   **Node.js** (v18 or higher)
*   **npm** or **pnpm**
*   **MongoDB** (Local instance or Atlas URI)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/sanjana-creations.git
    cd sanjana-creations
    ```

2.  **Install Dependencies**
    ```bash
    # Install root/frontend dependencies
    npm install

    # Install backend dependencies
    cd backend
    npm install
    cd ..
    ```

3.  **Environment Configuration**
    Create a `.env` file in the `backend` directory:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/sanjana-creations
    JWT_SECRET=your_super_secret_key
    ```

4.  **Start Development Servers**
    We have provided a convenient script to start both backend and frontend:
    ```bash
    ./run_all.sh
    ```
    *   **Frontend**: http://localhost:5173
    *   **Backend**: http://localhost:5000

---

## 🌍 Deployment Guide

This guide assumes you are deploying to a Linux server (Ubuntu/Debian) with Nginx.

### 1. Server Setup
Ensure your server has Node.js, npm, and Nginx installed.
```bash
sudo apt update
sudo apt install nodejs npm nginx
```

### 2. Build Frontend
Generate the production-ready static files.
```bash
npm run build
# This creates a 'dist' folder in the root directory
```

### 3. Setup Backend (PM2)
Use PM2 to keep your Node.js backend running forever.
```bash
sudo npm install -g pm2
cd backend
pm2 start server.js --name "sanjana-backend"
```

### 4. Configure Nginx
Create a new Nginx configuration file: `/etc/nginx/sites-available/sanjana`

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Serve Frontend (Static Files)
    location / {
        root /var/www/sanjana-creations/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API Requests to Backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve Uploaded Images
    location /uploads {
        alias /var/www/sanjana-creations/backend/uploads;
    }
}
```

Enable the site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/sanjana /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

---

## 📂 Project Structure

```
sanjana-creations/
├── backend/                # Node.js/Express Backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   └── server.js           # Entry point
├── src/                    # React Frontend
│   ├── components/         # Reusable UI components
│   ├── pages/              # Application pages
│   ├── hooks/              # Custom React hooks
│   └── store/              # Zustand state store
├── public/                 # Static assets
└── dist/                   # Production build (generated)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Made with ❤️ by the Sanjana Creations Team</p>
</div>
