import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Importar useNavigate
import { UserContext } from "../../providers/UserProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { axiosInstance } from "@/services/Axios/axiosClient";
import CartIcon from "../Icons/CartIcon";

export default function HomeVendendor() {
    const { user } = useContext(UserContext);  // Obtener el usuario del contexto
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();  // Inicializar useNavigate

    useEffect(() => {
        axiosInstance.get('producto/productos')
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

    return (
        <div className="flex justify-center items-center">
            <div className="overflow-y-auto">
                <div className="grid grid-cols-3 gap-6">
                    <h2>SESION VENDEDOR {user.nombre_usuario}</h2>
                    {productos.map((producto) => (
                        <Card key={producto.id_producto} className="h-92 w-96">
                            <CardHeader className="flex items-center">
                                <img src={producto.foto} alt={producto.nombre} className="h-52 w-48 rounded-md" />
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-medium">{producto.nombre}</p>
                                <p className="text-3xl font-semibold text-indigo-800">{formatCurrency(producto.precio)}</p>
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
                <Button className="w-full font-semibold hover:scale-100 mt-4" onClick={handleUploadProduct}>
                    <span className="text-base">Subir Producto</span>
                </Button>
            </div>
        </div>
    );
}
