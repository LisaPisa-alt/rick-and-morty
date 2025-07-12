# Getting Started with The Rick and Morty Application

A full stack application built with **React**, **Express**, and **Prisma**, interacting with the [Rick & Morty API](https://rickandmortyapi.com).

## Features

- **Secure Authentication**: Only authenticated users can access the app.
- **Character Listing**: Browse all Rick & Morty characters.
- **Favorites System**: Mark/unmark characters as favorites per user.
- **Character Details**: View more information about each character.
- Fallback mode if Rick & Morty API is down.

## Project Structure

    /frontend → React application (UI)
    /backend → Express server (API, DB, Auth)

### 1. Clone the Repository

git clone https://github.com/LisaPisa-alt/rick-and-morty.git  
cd rick-and-morty

### 2. Install Dependencies

    cd frontend
    `npm install`

    cd backend
    `npm install`

### 3. Set up Prisma

    npx prisma generate # Generate Prisma client
    npx prisma migrate dev # Run migrations (creates DB tables)

### 4. Run the application locally

    cd backend
    `node server`

Runs on: http://localhost:5000

    cd frontend
    `npm start`

Runs on: http://localhost:3000

## Potential Enhancements

Here are some additional improvements to take the project to production-ready level:

### ✅ Testing

- **Frontend Testing**
  - Use [Jest](https://jestjs.io/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit and integration tests.

- **Backend Testing**
  - Use [Jest](https://jestjs.io/) for unit and integration tests.

### 🧭 Observability & Monitoring

- **Logging**
  - Use a structured logger for backend logs.
  - Send logs to centralized services.

- **Error Tracking**
  - Integrate [Sentry](https://sentry.io/)(or similar) on both frontend and backend to capture runtime errors and stack traces.
