import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@/components/ui/table";
import TrashIcon from "../Icons/TrashIcon";


export default function HomeVendendor() {
    const { user } = useContext(UserContext);
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();
    const [eliminado, setEliminado] = useState(false);

    useEffect(() => {
        axiosInstance.get(`producto/productos/${user.id_usuario}`)
            .then((res) => {
                setProductos(res.data);
            })
            .catch((err) => { toast(err) })
    }, [eliminado]);

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
        navigate('/registra-producto');
    };

    const handleVerDetallesButton = (id_producto) => {
        navigate(`/detalles-producto/${id_producto}`);
    };

    const toastConfirm = (product_id) => {
        toast.warning('Estas seguro de eliminar el producto', {
            action: {
                label: 'Eliminar',
                onClick: () => { handleDelete(product_id) },
            },
        });
    }
    const handleDelete = async (product_id) => {
        const deletePromise = axiosInstance.delete(`/producto/eliminar-producto/${product_id}`);

        toast.promise(deletePromise, {
            loading: 'Eliminando producto...',
            success: 'Producto eliminado exitosamente',
            error: 'Error al eliminar el producto',
        });

        try {
            const response = await deletePromise;
            if (response.status === 200) {
                setEliminado(true);
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };


    return (
        <div className="flex justify-center items-center">
            {productos.length === 0 ? (
                <>
                    <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-7">Al parecer no tienes registrado ningún producto</h2>
                    <Button className="w-full font-semibold hover:scale-100 mt-4" onClick={handleUploadProduct}>
                        <span className="text-base">Subir Producto</span>
                    </Button>
                </>
            ) : (
                <div className="w-full py-6">
                    <Button className="mb-10" onClick={handleUploadProduct}>Agregar Producto</Button>
                    <Table className="mt-10 mb-10">
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
                                    <TableCell>{producto.descripcion.length > 50 ? producto.descripcion.substring(0, 50) + '...' : producto.descripcion}</TableCell>
                                    <TableCell>{producto.no_stock}</TableCell>
                                    <TableCell>{formatCurrency(producto.precio)}</TableCell>
                                    <TableCell className="flex gap-4">
                                        <Button onClick={() => handleVerDetallesButton(producto.id_producto)}>Ver detalles</Button>
                                        <Button
                                            className="font-semibold bg-red-500 hover:bg-red-700"
                                            onClick={() => { toastConfirm(producto.id_producto) }}
                                        >
                                            <TrashIcon className="h-5 w-5 mr-3" />
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
