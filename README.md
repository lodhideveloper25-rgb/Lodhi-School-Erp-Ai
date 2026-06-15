# LODH School ERP AI - Free Edition 🎓

![LODH ERP Banner](https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop)

A uniquely designed, modern, and premium School Management System built from the ground up for small and medium schools. This project strictly relies on free, open-source tools with absolutely no paid APIs required.

## 🌟 Key Features

- **Premium Dark Glassmorphism UI**: A stunning, animated interface built with Tailwind CSS and Framer Motion.
- **AI-Powered Analytics**: Rule-based logic algorithms instantly flag Fee Defaulters and perform Student Performance Analysis locally (no paid OpenAI API required).
- **Free WhatsApp Integration**: Built-in WhatsApp QR connect module using `whatsapp-web.js` to send free automated messages to parents.
- **Complete Suite of Modules**: Manages Students, Teachers, Classes, Attendance, Fees, Exams, Homework, Parents, Transport, Library, Inventory, and Staff.
- **PDF & Excel Exports**: Instantly export reports and ID cards to PDF/Excel using open-source libraries.

## 🛠️ Technology Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- Framer Motion (Animations)
- Lucide React (Icons)
- Recharts (Analytics Data Visualization)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT) & bcrypt for Security
- whatsapp-web.js

## 🚀 Getting Started Locally

### 1. Backend Setup
Navigate into the backend directory, install the dependencies, and start the development server.
```bash
cd backend
npm install
npm start
```
*Note: Make sure you have a local MongoDB instance running, or provide your Atlas URI in a `.env` file.*

### 2. Database Seeding (Optional)
To test the application, you can seed the database with mock demo data:
```bash
cd backend
node seed.js
```

### 3. Frontend Setup
Navigate into the frontend directory, install the dependencies, and start the Vite development server.
```bash
cd frontend
npm install
npm run dev
```

Open your browser to `http://localhost:5173` to see the application!

## 🌐 Live Deployment
This project is fully equipped with configuration files for immediate deployment to popular free hosting providers.
- **Frontend**: Deploy directly to Vercel (uses included `vercel.json`).
- **Backend**: Deploy directly to Render (uses included `render.yaml`).
- **Database**: Host securely on MongoDB Atlas Free Tier.

## 📜 License
This project is built for the Lodhi School ERP initiative and relies exclusively on MIT licensed open-source libraries.
