# Inventory Frontend (React)

A modern React application built with Vite, Tailwind CSS, and React Router for managing inventory/products. This frontend application communicates with a Laravel backend API.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** >= 18.x
- **npm** >= 9.x (comes with Node.js) or **yarn** / **pnpm**
- **Git**

### Checking Your Environment

```bash
# Check Node.js version
node -v

# Check npm version
npm -v
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone git@github.com:uzzairatinvoke/inventory-frontend-react.git
cd inventory-frontend-react
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

Or using pnpm:

```bash
pnpm install
```

### 3. Environment Configuration (Optional)

If you need to configure environment variables, create a `.env` file in the root directory:

```env
# API Base URL (default: http://localhost:8000)
VITE_API_BASE_URL=http://localhost:8000

# API Version (default: v1)
VITE_API_VERSION=v1
```

**Note:** In Vite, environment variables must be prefixed with `VITE_` to be accessible in the frontend code.

If you update the API URL, you'll need to modify the axios calls in the components to use `import.meta.env.VITE_API_BASE_URL`.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is occupied).

Open your browser and navigate to the displayed URL.

## Running the Application

### Development Mode

```bash
npm run dev
```

This starts the Vite development server with Hot Module Replacement (HMR), so changes will be reflected immediately.

### Production Build

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Linting

To run ESLint:

```bash
npm run lint
```

## Configuration

### Backend API URL

The frontend is configured to communicate with the Laravel backend at:

```
http://localhost:8000/api/v1/
```

**Important:** Make sure your Laravel backend is running on port 8000 before using this application.

If your backend is running on a different URL or port, you'll need to update the API endpoints in the following files:

- `src/components/LoginForm.jsx`
- `src/components/Dashboard.jsx`
- `src/components/ProductList.jsx`
- `src/components/ProductForm.jsx`

Or configure the API base URL using environment variables and update the components to use it.

## Application Features

### Authentication

- User login with email and password
- JWT token-based authentication (Laravel Sanctum)
- Protected routes that require authentication
- Automatic token storage in localStorage
- Logout functionality

### Product Management

- View list of products
- Create new products
- Update existing products
- Delete products
- Dashboard with product management interface

### Routing

The application uses React Router for navigation:

- `/login` - Login page
- `/dashboard` - Main dashboard (protected route)
- `/` - Redirects to login or dashboard based on authentication status

## Project Structure

```
inventory-frontend-react/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and other assets
│   ├── components/     # React components
│   │   ├── Dashboard.jsx
│   │   ├── LoginForm.jsx
│   │   ├── ProductForm.jsx
│   │   └── ProductList.jsx
│   ├── App.jsx         # Main application component
│   ├── App.css         # Application styles
│   ├── index.css       # Global styles
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration (if exists)
```

## Key Dependencies

### Production Dependencies

- **React** ^19.2.0 - UI library
- **React DOM** ^19.2.0 - React renderer
- **React Router DOM** ^7.12.0 - Client-side routing
- **Axios** ^1.13.2 - HTTP client for API calls

### Development Dependencies

- **Vite** ^7.2.4 - Build tool and dev server
- **@vitejs/plugin-react** ^5.1.1 - Vite plugin for React
- **Tailwind CSS** ^4.1.18 - Utility-first CSS framework
- **ESLint** ^9.39.1 - Code linting
- **Autoprefixer** ^10.4.23 - CSS vendor prefixing
- **PostCSS** ^8.5.6 - CSS processing

## Usage

### 1. Start the Backend

Make sure your Laravel backend is running:

```bash
cd ../inventory-backend-laravel
php artisan serve
```

### 2. Start the Frontend

In a separate terminal:

```bash
npm run dev
```

### 3. Access the Application

1. Open your browser and go to `http://localhost:5173`
2. You'll be redirected to the login page
3. Login with your credentials
4. Upon successful login, you'll be redirected to the dashboard

## Troubleshooting

### CORS Issues

If you encounter CORS (Cross-Origin Resource Sharing) errors when connecting to the backend:

1. Make sure your Laravel backend has CORS configured properly
2. Verify the backend URL in your components matches your backend server
3. Check that `SANCTUM_STATEFUL_DOMAINS` in Laravel's `.env` includes `localhost:5173`

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port. Check the terminal output for the actual port number.

To specify a custom port:

```bash
npm run dev -- --port 3000
```

### Module Not Found Errors

If you encounter module not found errors:

```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### Build Errors

If you encounter build errors:

1. Clear the Vite cache:
   ```bash
   rm -rf node_modules/.vite
   ```

2. Rebuild:
   ```bash
   npm run build
   ```

### API Connection Issues

- Verify the backend server is running
- Check the API URL in the component files
- Ensure you're using the correct port (default: 8000)
- Check browser console for detailed error messages
- Verify CORS configuration in the backend

## Browser Support

This application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tips

- Use React DevTools browser extension for debugging
- Check the Network tab in browser DevTools to monitor API calls
- Use the Console tab to see any JavaScript errors
- Enable "Preserve log" in DevTools to keep logs after page navigation

## Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Axios Documentation](https://axios-http.com)

## License

This project is open-sourced software licensed under the MIT license.
