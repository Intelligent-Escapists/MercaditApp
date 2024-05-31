
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { toast } from "sonner";
import CalificacionGeneral from "../Products/CalificacionGeneral";

import { axiosInstance } from "@/services/Axios/axiosClient";
import CartIcon from "../Icons/CartIcon";


export default function BusquedaProductos() {


    const { nombre_producto } = useParams();
    const { user } = useContext(UserContext);  // Obtener el usuario del contexto
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [errorBusqueda, setErrorBusqueda] = useState(false);


    const goBackHandler = () => {
        navigate(-1);
    };

    useEffect(() => {
        axiosInstance.get(`producto/buscar-producto/${nombre_producto}`)
            .then((res) => {
                setProductos(res.data);
                setErrorBusqueda(false);
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorBusqueda(true);
            })
    }, [errorBusqueda]);

    if (errorBusqueda) {
        return (
            <div className="flex justify-center items-center flex-col gap-12">
                <h2 className="mt-10 text-3xl font-semibold">No se encontraron productos</h2>
                <img src="../../src/assets/Folder.png" alt="imagen-de-un-folder" className="w-[500px] h-[500px]" />
            </div>
        );
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-US', { style: 'currency', currency: 'USD' }).format(amount);
    };
    const handleClickCard = (product_id) => {
        navigate(`/detalles-producto/${product_id}`)
    }

    return (
        <div className="flex flex-col justify-center">
            <Breadcrumb className="py-4">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-lg" href="#" onClick={goBackHandler}>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-lg">Busqueda</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-center items-center w-full py-10 flex-col">
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
            </div >
        </div>
    );
}