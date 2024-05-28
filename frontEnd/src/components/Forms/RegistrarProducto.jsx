import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useInput from "../Hooks/useInput";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import ImageCropper from "./ImageCropper";

import { axiosInstance } from "@/services/Axios/axiosClient";
import CartIcon from "../Icons/CartIcon";

export default function RegistrarProducto() {
    const { user } = useContext(UserContext);
    const [productos, setProductos] = useState([]);
    const [croppedImage, setCroppedImage] = useState(null);

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

    const handleImageCropped = (croppedImage) => {
        setCroppedImage(croppedImage);
    };

    return (
        <div className="flex justify-center items-center">
            <div className="overflow-y-auto">
                <div className="grid grid-cols-1 gap-6">
                    <form >
                        <div className="grid w-full gap-4">
                            <Card className='w-[450px] h-[640px]'>
                                <CardHeader>
                                    <CardTitle>Nuevo Producto</CardTitle>
                                    <CardDescription>Inicia con la nueva venta de un producto</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form action="">
                                        <div className="grid w-full gap-6">
                                            <div className="flex flex-col items-start space-y-2">
                                                <Label>Nombre</Label>
                                                <Input
                                                    id='nombre'
                                                    type="text"
                                                    placeholder="Ej. Camisa"
                                                    required />
                                            </div>
                                            <div className="flex flex-col items-start space-y-2">
                                                <Label>Descripcion</Label>
                                                <Textarea
                                                    id='descripcion'
                                                    type="text"
                                                    placeholder="Ej. Camisa negra con estampado de Star Wars"
                                                    required />
                                            </div>
                                            <div className="flex flex-col items-start space-y-2">
                                                <Label>Foto</Label>
                                                <ImageCropper onImageCropped={handleImageCropped} />
                                                {croppedImage && <img src={croppedImage} alt="Cropped" />}
                                            </div>
                                            <div className="flex flex-col items-start space-y-2">
                                                <Label>Stock</Label>
                                                <Input
                                                    id='stock'
                                                    type="number"
                                                    placeholder="5"
                                                    required />
                                            </div>
                                            <div className="flex flex-col items-start space-y-2">
                                                <Label>Precio</Label>
                                                <Input
                                                    id='precio'
                                                    type="number"
                                                    placeholder="5"
                                                    required />
                                            </div>
                                        </div>
                                        <Button className='w-full mt-6 font-semibold'>
                                            <span className=" text-base ">Subir Producto</span>
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
