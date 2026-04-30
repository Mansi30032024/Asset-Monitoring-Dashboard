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

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000
```

This setup keeps the app running on your local machine while using MongoDB Atlas as the online database.

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

## Local App With MongoDB Atlas

This project is currently intended to run locally:

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`
- Database: MongoDB Atlas

### 1. Prepare MongoDB Atlas

Create a MongoDB Atlas cluster and copy the connection string.

Use this connection string as the backend `MONGODB_URL` value:

```env
MONGODB_URL=mongodb+srv://username:password@cluster-name.mongodb.net/database-name
```

Make sure MongoDB Atlas Network Access allows your current IP address. For local learning/testing, you can temporarily allow access from anywhere:

```text
0.0.0.0/0
```

### 2. Start Backend Locally

Open a terminal:

```bash
cd backend
npm run dev
```

The backend should print:

```text
Server is running on 5000
Successfully connected to MongoDb
```

### 3. Start Frontend Locally

Open another terminal:

```bash
cd frontend
npm run dev
```

Open the local Vite URL:

```text
http://localhost:5173
```

### 4. Local Checklist

- `backend/.env` has `MONGODB_URL`, `JWT_SECRET`, and `CLIENT_URL=http://localhost:5173`.
- `frontend/.env` has `VITE_API_URL=http://localhost:5000`.
- Backend is running on port `5000`.
- Frontend is running on port `5173`.
- MongoDB Atlas allows your IP address.
- Restart backend and frontend after changing any `.env` file.

## Generic Use Cases

This project is intentionally written as a general asset monitoring system. Example asset names can be:

- Infusion Device 01
- Patient Monitor 02
- Calibration Tool 03
- Temperature Sensor 04
- Facility Equipment 05
- Diagnostic Device 06
