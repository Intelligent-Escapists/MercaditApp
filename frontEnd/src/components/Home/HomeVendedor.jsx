import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Importar useNavigate
import { UserContext } from "../../providers/UserProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { axiosInstance } from "@/services/Axios/axiosClient";
import CartIcon from "../Icons/CartIcon";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function HomeVendendor() {
    const { user } = useContext(UserContext);  // Obtener el usuario del contexto
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();  // Inicializar useNavigate


    useEffect(() => {
        axiosInstance.get(`producto/productos/${user.id_usuario}`)
            .then((res) => {
                setProductos(res.data);
            })
            .catch((err) => { toast(err) })
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-medium">Por favor, inicia sesión para ver los productos.</p>
            </div>
        );
    }

    const handleUploadProduct = () => {
        navigate('/registra-producto');  // Redirigir a registra-producto
    };

    const handleVerDetallesButton = (id_producto) => {

        navigate(`/detalles-producto/${id_producto}`);  // Redirigir a detalles-producto con el id del producto


    }

    return (

        <div className="flex justify-center items-center">
            {productos == [] ?
                (
                    <>
                        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-7">Al parecer no tienes registrado ningun producto</h2>
                        <Button className="w-full font-semibold hover:scale-100 mt-4" onClick={handleUploadProduct}>
                            <span className="text-base">Subir Producto</span>
                        </Button>
                    </>
                ) : (

                    <div className="w-full">

                        <Table>
                            <TableCaption>Tus productos.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">IdProducto</TableHead>
                                    <TableHead className="text-center">Nombre</TableHead>
                                    <TableHead className="text-center">Descripción</TableHead>
                                    <TableHead className="text-center">No. Stock</TableHead>
                                    <TableHead className="text-center">Precio</TableHead>
                                    <TableHead className="text-center">Más</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {productos.map((producto) => (
                                    <TableRow key={producto.id_producto}>
                                        <TableCell>{producto.id_producto}</TableCell>
                                        <TableCell>{producto.nombre}</TableCell>
                                        <TableCell>{producto.descripcion}</TableCell>
                                        <TableCell>{producto.no_stock}</TableCell>
                                        <TableCell>{formatCurrency(producto.precio)}</TableCell>
                                        <TableCell><Button onClick={() => { handleVerDetallesButton(producto.id_producto) }}>Ver detalles</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                )}
        </div>


    );
}
