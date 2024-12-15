import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@components/Navbar';
import { AuthProvider } from '@context/AuthContext';

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const location = useLocation();
  const isProductosUsados = location.pathname.includes('/productosUsados');

  return (
    <>
      {/* Solo mostrar el Navbar si no estamos en la ruta de ProductosUsados */}
      {!isProductosUsados && <Navbar />}
      <Outlet />
    </>
  );
}

export default Root;
