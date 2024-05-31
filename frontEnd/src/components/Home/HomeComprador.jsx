import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

import { toast } from "sonner";
import CalificacionGeneral from "../Products/CalificacionGeneral";

import { axiosInstance } from "@/services/Axios/axiosClient";
import CartIcon from "../Icons/CartIcon";

export default function HomeComprador() {
    const { user } = useContext(UserContext);  // Obtener el usuario del contexto
    const navigate = useNavigate();

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buscar, setBuscar] = useState("");
    const [productosFiltrados, setProductosFiltrados] = useState([]); // Aquí guardas los productos filtrados [productosFiltrados, setProductosFiltrados] = useState([
    const obtenerProductos = () => {
        axiosInstance.get('producto/productos')
            .then((res) => {
                setProductos(res.data);
                if (productosFiltrados.length === 0) {
                    setProductosFiltrados(res.data);
                }
            })
            .catch((err) => { toast(err) })
            .finally(() => setLoading(false));
    }
   useEffect(() => {
    if (productosFiltrados!==productos) {
    const productosActualizados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(buscar.toLowerCase())
  );
  setProductosFiltrados(productosActualizados);}else{
    const productosActualizados = productosFiltrados.filter((producto) =>
    producto.nombre.toLowerCase().includes(buscar.toLowerCase())
  );
  setProductosFiltrados(productosActualizados);
  }
 
  console.log(productosFiltrados);
  console.log(buscar);
   }, [buscar]);

   
    useEffect(() => {
        obtenerProductos();
        // Obtener las categorías desde la API
        axiosInstance.get('/producto/obtener-todas-las-categorias-existentes')
            .then((res) => {
                setCategorias(res.data.categorias);
            })
            .catch((err) => { toast.error("Error al cargar las categorías"); })
            .finally(() => setLoading(false));
    }, []);

    


    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const handleClickCard = (product_id) => {
        navigate(`/detalles-producto/${product_id}`)
    }

    const selectedcategory = (e) => {
        if (e === "Todas") {
            setProductosFiltrados(productos);
            return;
        }
        let categoria = encodeURIComponent(e);
        axiosInstance.get(`/producto/filtrar-producto/${categoria}`)
            .then((res) => {
                setProductosFiltrados(res.data);
            })
            .catch((err) => {
                toast.error("Error al cargar los productos"),
                    obtenerProductos()
            })
            .finally(() => setLoading(false));
    }
    const handleSearch=(e)=>{
       setBuscar(e.target.value);
    }


    return (
        <div className="flex justify-center items-center w-full py-10 flex-col">
            
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">Bienvenido a MercaditApp</h1>
            <Select onValueChange={selectedcategory} >
                <SelectTrigger className=" mb-8 text-base w-[300px]">

                    <SelectValue placeholder="Filtra por Categorias" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Todas" className="hover:cursor-pointer">
                        Todas las categorías
                    </SelectItem>
                    {categorias.map((cat) => (
                        <SelectItem key={cat} value={cat} className=" hover:cursor-pointer">

                            {cat}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
      <Input type="text" placeholder="Buscar productos" onChange={handleSearch} />
      <Button type="submit">Buscar</Button>
    </div>
            

            <div className="grid grid-cols-3 gap-6">
                {productosFiltrados.map((producto) => (
                    <Card key={producto.id_producto} className="h-92 w-96 hover:scale-105 hover:cursor-pointer" >
                        <CardHeader className="flex items-center">
                            <img src={producto.foto} alt={producto.nombre} className=" h-52 w-48 rounded-md" onClick={() => { handleClickCard(producto.id_producto) }} />
                        </CardHeader>
                        <CardContent onClick={() => { handleClickCard(producto.id_producto) }}>
                            <p className="text-lg font-medium">{producto.nombre}</p>
                            <p className="text-3xl font-semibold text-indigo-800">{formatCurrency(producto.precio)}</p>
                            <CalificacionGeneral product_id={producto.id_producto} /> {/* AQUÍ PASAS EL product_id */}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full font-semibold hover:scale-100">
                                <CartIcon className="h-5 w-5 mr-2" />
                                <span className="text-base">Agregar al carrito</span>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div >
    );
}