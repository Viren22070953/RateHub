# RateHub - Store Rating Platform

RateHub is a full-stack store rating web application built for a role-based assessment workflow. The platform allows normal users to discover registered stores and submit ratings, store owners to monitor customer feedback, and administrators to manage users, stores, and platform activity.

The project is structured as a production-style React frontend connected to an Express.js and MySQL backend with JWT authentication, role-based authorization, validation, and a clean dark professional UI.

## Features

### Authentication and Authorization

- Single login system for all user roles
- JWT-based authentication
- Role-based route protection
- Persisted frontend session using localStorage
- Password update flow for authenticated users

### System Administrator

- Dashboard with total users, stores, and ratings
- Add users with admin, normal user, or store owner roles
- View, filter, sort, and delete users
- View user details, including store owner average rating
- Add, view, filter, sort, and delete stores

### Normal User

- Signup and login
- Browse all registered stores
- Search stores by name and address
- View overall store rating
- Submit a rating from 1 to 5
- Modify an existing rating

### Store Owner

- Dashboard for owned store
- View average store rating
- View users who submitted ratings
- View rating date and customer details

### UI and UX

- Dark professional RateHub theme
- Responsive layout for desktop, tablet, and mobile
- Role-aware navbar
- Back button on every page
- Toast notifications for actions
- Loading skeletons and empty states
- Interactive star rating component
- Styled tables, modals, forms, badges, and cards

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- React Hook Form
- Yup
- React Hot Toast
- Lucide React
- CSS

### Backend

- Node.js
- Express.js
- MySQL
- mysql2
- JWT
- bcryptjs
- express-validator
- dotenv

## Project Structure

```text
ZStore_Rating_Website/
  backend/
    scripts/
      createAdmin.js
    src/
      config/
        db.js
      controllers/
      middlewares/
      model/
        user.model.js
        store.model.js
        ratings.model.js
        index.js
      routes/
      validations/
      app.js
    server.js
    package.json

  frontend/
    public/
      ratehub-logo.png
    src/
      api/
      components/
      context/
      pages/
      utils/
      App.jsx
      index.css
      main.jsx
    package.json
```

## Database Schema

The backend initializes the required MySQL tables automatically when the server starts.

Tables:

- `users`
- `stores`
- `ratings`

Important relationships:

- A store can optionally belong to a store owner.
- A normal user can submit one rating per store.
- Ratings are constrained between 1 and 5.
- Deleting a user or store cleans up related rating data through foreign keys.

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating_db
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=7d
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Viren22070953/Store-Review-Paltform
cd Store-Review-Paltform
```

If you already have the project locally:

```powershell
cd C:\ZStore_Rating_Website
```

### 2. Create the MySQL Database

Open MySQL and create the database:

```sql
CREATE DATABASE store_rating_db;
```

The tables are created automatically by the backend when the server starts.

### 3. Install Backend Dependencies

```powershell
cd C:\ZStore_Rating_Website\backend
npm install
```

### 4. Start the Backend

```powershell
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

### 5. Create the Default Admin User

In a separate terminal:

```powershell
cd C:\ZStore_Rating_Website\backend
node scripts\createAdmin.js
```

Default admin credentials from the script:

```text
Email: admin@store.com
Password: Admin@123
```

### 6. Install Frontend Dependencies

```powershell
cd C:\ZStore_Rating_Website\frontend
npm install
```

### 7. Start the Frontend

```powershell
npm run dev
```

Frontend URL:

```text
http://127.0.0.1:5173
```

## Available Scripts

### Backend

```bash
npm run dev
```

Starts the backend with nodemon.

```bash
npm start
```

Starts the backend with Node.

### Frontend

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run lint
```

Runs ESLint checks.

```bash
npm run preview
```

Previews the production build locally.

## API Overview

Base URL:

```text
http://localhost:5000/api
```

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Admin Users

- `GET /admin/dashboard`
- `POST /admin/users`
- `GET /admin/users`
- `GET /admin/users/:id`
- `DELETE /admin/users/:id`

### Admin Stores

- `POST /admin/stores`
- `GET /admin/stores`
- `GET /admin/stores/:id`
- `DELETE /admin/stores/:id`

### Normal User Stores and Ratings

- `GET /stores`
- `POST /ratings`
- `PUT /ratings/:id`

### Store Owner

- `GET /owner/dashboard`

### Password

- `PUT /users/password`

## Validation Rules

- Name: minimum 20 characters, maximum 60 characters
- Address: maximum 400 characters
- Password: 8 to 16 characters, at least one uppercase letter and one special character
- Email: valid email format
- Rating: integer between 1 and 5

## Application Flow

1. The user first lands on the HomePage.
2. The user chooses Login or Signup.
3. After login, the app redirects based on role:
   - Admin: Admin dashboard
   - Normal User: Store listing
   - Store Owner: Owner dashboard
4. Protected routes require a valid JWT token.
5. Unauthorized role access is redirected to a Not Allowed page.

## Verification

The project has been verified with:

```bash
npm run lint
npm run build
```

The backend schema initializer has also been tested against MySQL.

## Notes

- Keep the backend running before using the frontend.
- Make sure the database name in `.env` matches the database created in MySQL.
- The frontend API URL is controlled by `VITE_API_BASE_URL`.
- The RateHub logo is stored in `frontend/public/ratehub-logo.png`.

## Author

Developed by Viren as a full-stack store rating platform project.
