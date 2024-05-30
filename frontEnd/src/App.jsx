import { Toaster } from 'sonner'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Root from "./components/Root/Root";
import { ThemeProvider } from "@/components/theme-provider"
import HomeComprador from './components/Home/HomeComprador';
import HomeVendendor from './components/Home/HomeVendedor';
import Registro from './components/Forms/Registro';
import HomePanel from './components/Root/HomePanel';
import CorreoEnviado from './components/RegisterPanel/CorreoEnviado';
import CorreoConfirmado from './components/RegisterPanel/CorreoConfirmado';
import RegistrarProducto from './components/Forms/RegistrarProducto';
import DetalleUsuario from './components/User/DetalleUsuario';
import DetallesProducto from './components/Products/DetallesProducto';
import { UserProvider } from './providers/UserProvider';

//mario_front
import Comment from './components/Products/Comment';



function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={< Root />}>
        <Route index element={<HomePanel />} />
        <Route path="registro" element={<Registro />} />
        <Route path="correo-enviado" element={<CorreoEnviado />} />
        <Route path="verificar-correo/:token" element={<CorreoConfirmado />} />
        <Route path="homeCompra" element={< HomeComprador />} />
        <Route path="homeVenta" element={< HomeVendendor />} />
        <Route path="registra-producto" element={< RegistrarProducto />} />
        <Route path="detalle-usuario" element={< DetalleUsuario />} />
        <Route path="detalles-producto/:product_id" element={< DetallesProducto />} />
        <Route path="comentarios/:id" element={< Comment />} />
      </Route>
    </>
  ));

  return (
    <UserProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Toaster position="top-center" richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserProvider>
  )
}

export default App


