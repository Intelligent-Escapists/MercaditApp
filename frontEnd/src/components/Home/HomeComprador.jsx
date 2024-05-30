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

import { toast } from "sonner";
import CalificacionGeneral from "../Products/CalificacionGeneral";
import { Input } from "@/components/ui/input";

import { axiosInstance } from "@/services/Axios/axiosClient";
import CartIcon from "../Icons/CartIcon";

export default function HomeComprador() {
    const { user } = useContext(UserContext);  // Obtener el usuario del contexto
    const navigate = useNavigate();

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    const obtenerProductos = () => {
        axiosInstance.get('producto/productos')
            .then((res) => {
                setProductos(res.data);
            })
            .catch((err) => { toast(err) })
            .finally(() => setLoading(false));
    }

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

    if (productos.length === 0 || categorias.length === 0 || loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-medium">Cargando Productos...</p>
            </div>
        );
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const handleClickCard = (product_id) => {
        navigate(`/detalles-producto/${product_id}`)
    }

    const selectedcategory = (e) => {
        let categoria = encodeURIComponent(e);
        axiosInstance.get(`/producto/filtrar-producto/${categoria}`)
            .then((res) => {
                setProductos(res.data);
            })
            .catch((err) => { toast.error("Error al cargar los productos") })
            .finally(() => setLoading(false));
    }

    return (
        <div className="flex justify-center items-center w-full py-10 flex-col">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">Bienvenido a MercaditApp</h1>
                <SelectTrigger className="w-[180px] mb-8">

                    <SelectValue placeholder="Filtrar por Categorias" />
                </SelectTrigger>
                <SelectContent>
                    {categorias.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                            {cat}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="grid grid-cols-3 gap-6">
                {productos.map((producto) => (
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
        </div>
    );
}
