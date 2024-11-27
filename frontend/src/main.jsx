import Ordenes from '@pages/Ordenes';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';
import Inventory from './pages/Inventory';
<<<<<<< HEAD
import Sesion from './pages/Sesion';
=======
>>>>>>> b9eedb38bc5442afd7e96d483e4fa936d76e4ecd

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/users',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: '/inventory',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
<<<<<<< HEAD
            <Inventory />
          </ProtectedRoute>
        ),
      },
      {
        path: '/sesion', // Ruta para la página de Sesión
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <Sesion />
=======
            <Inventory/>
>>>>>>> b9eedb38bc5442afd7e96d483e4fa936d76e4ecd
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/auth',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
