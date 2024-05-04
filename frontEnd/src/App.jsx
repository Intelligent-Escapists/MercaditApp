import { Car } from "lucide-react"
import { Button } from "./components/ui/button"

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Form from "./components/Form/Form";
import Home from "./components/Home/Home";
import { ThemeProvider } from "@/components/theme-provider"
import Logged from "./components/Logged/Logged";

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>

      <Route path="/home" element={<Home />} />
      <Route path="/form/:type" element={<Form />} />
      <Route path="/logged" element={<Logged />} />
    </>
  ));

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
