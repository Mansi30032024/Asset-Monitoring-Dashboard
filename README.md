# Asset Monitoring Dashboard

A full-stack Asset Monitoring Dashboard for tracking operational assets, monitoring status, and managing maintenance-related information through a clean admin interface.

The application includes authentication, protected asset management, real-time dashboard counts, and CRUD operations for assets such as equipment, devices, instruments, monitors, sensors, systems, tools, and vehicles. The naming is intentionally generic so the project can fit manufacturing, healthcare, facility operations, and industrial monitoring use cases.

## Features

- User signup and login with JWT authentication
- Separate login/signup screens before accessing the dashboard
- Protected admin operations for adding, updating, and deleting assets
- Asset status tracking: `active`, `inactive`, and `maintenance`
- Dashboard summary cards for total, active, inactive, and maintenance assets
- Auto-refreshing asset table every 5 seconds
- Asset fields for type, location, temperature, pressure, and last service date
- Modular React component structure for cleaner code maintenance
- REST API backend using Express and MongoDB Atlas

## Tech Stack

**Frontend:** React, Vite, Axios, CSS

**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, bcrypt

## Project Structure

```text
assestsDashboard/
|-- backend/
|   |-- models/
|   |   |-- asset.js
|   |   `-- user.js
|   |-- routes/
|   |   |-- assetRoutes.js
|   |   `-- userRoutes.js
|   |-- .env
|   |-- .env.example
|   |-- db.js
|   |-- jwt.js
|   |-- package.json
|   `-- server.js
|
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |   |-- AssetForm.jsx
|   |   |   |-- AssetsTable.jsx
|   |   |   |-- AuthPage.jsx
|   |   |   |-- Dashboard.jsx
|   |   |   |-- MessageBanner.jsx
|   |   |   |-- StatsGrid.jsx
|   |   |   `-- Topbar.jsx
|   |   |-- config/
|   |   |   `-- assets.js
|   |   |-- services/
|   |   |   `-- api.js
|   |   |-- App.css
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- package.json
|   |-- .env.example
|   `-- vite.config.js
|
`-- README.md
```

## System Flow Diagram

![Asset Monitoring System Flow](docs/asset-monitoring-flow.svg)


## API Endpoints

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/user/signup` | Create a new user or admin account |
| `POST` | `/user/login` | Login and receive a JWT token |

### Assets

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `GET` | `/asset` | Get all assets | Public |
| `GET` | `/asset/status/count` | Get asset counts by status | Public |
| `GET` | `/asset/recent` | Get recently updated assets | Public |
| `GET` | `/asset/:assetID` | Get one asset by ID | Public |
| `POST` | `/asset` | Create a new asset | Admin |
| `PUT` | `/asset/:assetID` | Update asset details | Admin |
| `PUT` | `/asset/status/:assetID` | Update asset status | Authenticated user |
| `DELETE` | `/asset/:assetID` | Delete an asset | Admin |

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGODB_URL=mongodb+srv://username:password@cluster-name.mongodb.net/database-name
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Create a `.env` file inside the `frontend` folder for production-style local testing:

```env
VITE_API_URL=https://your-backend.onrender.com
Local dev: http://localhost:5000
```

For normal local development, the frontend can also use the Vite proxy configured in `frontend/vite.config.js`, so `VITE_API_URL` is optional locally.

## Installation and Setup

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Start backend server

```bash
npm run dev
```


### 3. Install frontend dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### 4. Start frontend

```bash
npm run dev
```

The frontend runs on the Vite development URL, usually:

```text
http://localhost:5173
```

## Frontend Routing Behavior

This project does not require `react-router-dom`. It uses local React state to switch between:

- Login page
- Signup page
- Main dashboard

After successful login or signup, the JWT token is saved in `localStorage`, and the user is redirected to the dashboard.

## Deployment

This project can be deployed with:

- Backend on Render
- Frontend on Vercel
- Database on MongoDB Atlas

### 1. Prepare MongoDB Atlas

Create a MongoDB Atlas cluster and copy the connection string.

Use this connection string as the backend `MONGODB_URL` environment variable:

```env
MONGODB_URL=mongodb+srv://username:password@cluster-name.mongodb.net/database-name
```

Make sure your Atlas database network access allows the deployed backend to connect.

### 2. Deploy Backend on Render

Create a new Render Web Service from your GitHub repository.

Use these settings:

| Setting | Value |
| --- | --- |
| Root Directory | `backend` |
| Runtime | `Node` |
| Build Command | `npm install` |
| Start Command | `npm start` |

Add these Render environment variables:

```env
MONGODB_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_secret_key
CLIENT_URL=https://your-vercel-frontend-url.vercel.app
```

If you do not know the Vercel URL yet, deploy the backend first and temporarily leave `CLIENT_URL` empty. After the frontend is deployed, add the Vercel URL and redeploy the backend.

Your backend URL will look like:

```text
https://your-backend-name.onrender.com
```

Test it in the browser:

```text
https://your-backend-name.onrender.com/
```

### 3. Deploy Frontend on Vercel

Create a new Vercel project from the same GitHub repository.

Use these settings:

| Setting | Value |
| --- | --- |
| Root Directory | `frontend` |
| Framework Preset | `Vite` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Add this Vercel environment variable:

```env
VITE_API_URL=https://your-backend-name.onrender.com
```

Redeploy the Vercel project after adding or changing environment variables.

### 4. Final Deployment Checklist

- Backend Render service is running.
- MongoDB Atlas connection string is added in Render.
- `JWT_SECRET` is added in Render.
- `VITE_API_URL` is added in Vercel.
- `CLIENT_URL` in Render matches the deployed Vercel frontend URL.
- Signup/login works from the deployed frontend.
- Asset add, update, delete, and status update work after login.

## Generic Use Cases

This project is intentionally written as a general asset monitoring system. Example asset names can be:

- Infusion Device 01
- Patient Monitor 02
- Calibration Tool 03
- Temperature Sensor 04
- Facility Equipment 05
- Diagnostic Device 06
