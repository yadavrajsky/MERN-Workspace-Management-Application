# MERN Workspace Management Application

## Overview

This project is a MERN stack (MongoDB, Express.js, React, Node.js) application designed for workspace management with administrative features. It includes both frontend and backend components, and provides features such as filtering and searching within the workspace.

## Supports dark and light mode automatically

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Backend Setup

1. **Navigate to the Backend Directory:**

    ```bash
    cd backend
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables:**

    Create a `.env` file in the `backend` directory and add the following configuration:

    ```env
    PORT=4000
    DB_URI=mongodb://127.0.0.1:27017/your_db
    JWT_SECRET=your_secret_key
    JWT_EXPIRE=5d
    COOKIE_EXPIRE=5d
    ```

4. **Run the Backend Server:**

    ```bash
    npm run dev
    ```

    The backend server will start on `http://localhost:4000`.

### Frontend Setup

1. **Navigate to the Frontend Directory:**

    ```bash
    cd frontend
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Run the Frontend Development Server:**

    ```bash
    npm run dev
    ```

    The frontend application will be accessible at `http://localhost:5173`.

## Application Structure

### Frontend

- **Main Components:**
  - `Home`: Home page component
  - `Dashboard`: Admin dashboard component
  - `NotFound`: 404 Not Found page

### Backend

- **Server Configuration:**
  - Runs on port `4000`
  - Connects to MongoDB at `mongodb://127.0.0.1:27017/glassberydemo`

- **Endpoints:**
  - Various endpoints for managing workspaces, user authentication, and more

## Admin Access

- **Access Admin Dashboard:** `http://localhost:5173/admin/`

  Use this section to manage workspace details, apply filters, and perform searches.

## Additional Notes

- Make sure MongoDB is running before starting the backend server.
- Ensure environment variables are correctly set for SMTP configuration if email functionality is required.
- For production, consider using more secure practices for managing environment variables and sensitive data.
