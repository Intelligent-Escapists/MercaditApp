import { Toaster } from 'sonner'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Root from "./components/Root/Root";
import { ThemeProvider } from "@/components/theme-provider"
import Home from './components/Home/Home';
import Registro from './components/Forms/Registro';
import HomePanel from './components/Root/HomePanel';
import CorreoEnviado from './components/RegisterPanel/CorreoEnviado';
import CorreoConfirmado from './components/RegisterPanel/CorreoConfirmado';
import { UserProvider } from './providers/UserProvider';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={< Root />}>
        <Route index element={<HomePanel />} />
        <Route path="registro" element={<Registro />} />
        <Route path="correo-enviado" element={<CorreoEnviado />} />
        <Route path="verificar-correo/:token" element={<CorreoConfirmado />} />
        <Route path="home" element={< Home />} />
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


