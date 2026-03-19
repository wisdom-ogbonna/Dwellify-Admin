# Dwellify Admin Dashboard

This repository contains the **Dwellify Admin** application, a web-based administration panel for the Dwellify platform. The project is divided into two main parts:

- `backend/` – Node.js/Express API server (and possibly related services).
- `frontend/` – Vite-powered React application used by administrators to manage properties, users, and statistics.

> 🚀 **Built with:** Node.js, Express, React, Vite, and modern JavaScript (ESM).

---

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running Locally](#running-locally)
3. [Project Structure](#project-structure)
4. [Development](#development)
5. [Deployment](#deployment)
6. [Contributing](#contributing)
7. [License](#license)

---

## Features

- Responsive admin dashboard layout
- Authentication and login page
- Quick statistics and charts on the dashboard
- Sidebar navigation component
- Utilities such as clipboard handling (custom hook)

> Additional backend features (APIs, database models, etc.) should be documented in the `backend/` folder.

## Getting Started

### Prerequisites

- [Node.js (16+ or latest LTS)](https://nodejs.org/) and npm/yarn
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/wisdom-ogbonna/dwellify-admin.git
   cd dwellify-admin
   ```

2. Install dependencies for the backend and frontend:

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

### Running Locally

#### Backend

From the `backend` directory:

```bash
npm run dev    # or whatever script starts the server
```

The API server will typically run on `http://localhost:3000` (check package.json scripts).

#### Frontend

In `frontend` directory:

```bash
npm run dev
```

This starts the Vite dev server, usually at `http://localhost:5173`.

> The frontend is configured to proxy API requests to the backend; review `vite.config.js` for details.

## Project Structure

Within each folder, a standard layout is used:

```
backend/
  ├─ package.json
  ├─ src/                 # API routes, models, controllers, etc.
  └─ ...

frontend/
  ├─ package.json
  ├─ vite.config.js
  ├─ src/
  │   ├─ App.jsx
  │   ├─ main.jsx
  │   ├─ components/      # React components
  │   ├─ hooks/           # Custom hooks (e.g. useClipboard)
  │   ├─ Pages/           # Page views (Dashboard, Login)
  │   ├─ utils/           # Utility functions
  │   └─ assets/          # Static assets (images, fonts, videos)
  └─ public/              # static public files
```

## Development

- Use ESLint (`npm run lint`) and Prettier if configured.
- Add new components under `frontend/src/Components` and pages under `Pages`.
- Keep backend API routes under `backend/src/routes` (adjust to your actual structure).
- Ensure environment variables are managed via `.env` files (example included in each folder if needed).

## Deployment

Deployment instructions depend on your hosting provider. Typical steps:

1. Build frontend:

   ```bash
   cd frontend
   npm run build
   ```

   Copy the output from `dist/` to your static file host or serve it via the backend.

2. Start the backend in production mode (e.g., `NODE_ENV=production node dist/server.js` or using PM2).

3. Configure environment variables, database connections, and any reverse proxy.

## Contributing

1. Fork the repo and create your feature branch (`git checkout -b feature/foo`).
2. Commit your changes (`git commit -am 'Add foo'`).
3. Push to the branch (`git push origin feature/foo`).
4. Open a Pull Request.

Be sure to follow any coding standards and run tests if applicable.

## License

This project is licensed under the [MIT License](LICENSE).

---

>  **Enjoy building Dwellify Admin!**


<aside className="fixed left-0 top-0 h-full w-64 border-r bg-black text-white border-zinc-800 p-6 hidden md:block select-none">