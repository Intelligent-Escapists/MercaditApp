import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner";

import useInput from "../Hooks/useInput";
import { isNumberValid } from "../Hooks/Validators/isNumberValid";

import { axiosInstance } from "@/services/Axios/axiosClient";

export default function RegistrarProducto() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {


        // Obtener las categorías desde la API
        axiosInstance.get('/producto/obtener-todas-las-categorias-existentes')
            .then((res) => {
                setCategorias(res.data.categorias);
            })
            .catch((err) => { toast.error(err || "Error al cargar las categorías"); });
    }, []);


    const { user } = useContext(UserContext);
    // console.log(user);
    const nombreInput = useInput('', { errorMsg: 'Nombre invalido' });
    const descripcionInput = useInput('', { errorMsg: 'Descripción invalida' });
    const precioInput = useInput('', { errorMsg: 'Precio invalido', validator: isNumberValid });
    const cantidadInput = useInput('', { errorMsg: 'Cantidad invalida', validator: isNumberValid });

    const [categoriaInput, setCategoriaInput] = useState('');
    const [foto, setFoto] = useState('');
    const [fotoError, setFotoError] = useState('');


    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await convertToBase64(file);
                setFoto(base64);
                setFotoError("");
            } catch (error) {
                setFotoError("Error al cargar la imagen");
            }
        }
    };
    const handleCategoriaChange = (value) => {
        setCategoriaInput(value);
    }

    // Función para convertir archivo a base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const productToSend = {
            id_usuario: user.id_usuario,
            nombre: nombreInput.value,
            descripcion: descripcionInput.value,
            precio: parseInt(precioInput.value),
            cantidad: parseInt(cantidadInput.value),
            categoria: categoriaInput,
            foto: foto,
        };

        console.log(productToSend);

        const productPromise = axiosInstance.post('/producto/agregar-producto', productToSend);

        toast.promise(productPromise, {
            loading: 'Registrando producto...',
            success: 'Producto registrado exitosamente',
            error: (error) => error.response?.data?.error || "Error al registrar el producto",
        });

        try {
            const response = await productPromise;
            if (response.status === 201) {
                toast.success("Producto registrado exitosamente");
            }
        } catch (error) {
            console.error("Error al registrar el producto:", error);
        }
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-medium">Por favor, inicia sesión para ver los productos.</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center py-12">

            <Card className='w-[450px] h-[730px]'>
                <CardHeader>
                    <CardTitle>Nuevo Producto</CardTitle>
                    <CardDescription>Inicia con la nueva venta de un producto</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full gap-6">
                            <div className="flex flex-col items-start space-y-2">
                                <Label htmlFor='nombre'>Nombre</Label>
                                <Input
                                    name='nombre'
                                    type="text"
                                    placeholder="Ej. Camisa"
                                    value={nombreInput.value}
                                    onChange={nombreInput.onChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col items-start space-y-2">
                                <Label htmlFor='descripcion'>Descripción</Label>
                                <Textarea
                                    name='descripcion'
                                    placeholder="Ej. Camisa negra con estampado de Star Wars"
                                    value={descripcionInput.value}
                                    onChange={descripcionInput.onChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col items-start space-y-2">
                                <Label htmlFor='foto'>Foto</Label>
                                <Input
                                    name='foto'
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/png, image/jpeg"
                                    required
                                />
                            </div>
                            <div className="flex flex-col items-start space-y-2">
                                <Label htmlFor='stock'>Stock</Label>
                                <Input
                                    name='cantidad'
                                    type="text"
                                    placeholder="5"
                                    value={cantidadInput.value}
                                    onChange={cantidadInput.onChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col items-start space-y-2">
                                <Label htmlFor='precio'>Precio</Label>
                                <Input
                                    name='precio'
                                    type="text"
                                    placeholder="5"
                                    value={precioInput.value}
                                    onChange={precioInput.onChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col items-start space-y-2">
                                <Label htmlFor='categoria'>Categoría</Label>
                                <Select onValueChange={handleCategoriaChange} >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona una categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categorias.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button className='w-full mt-6 font-semibold' type="submit">
                            <span className="text-base">Subir Producto</span>
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>

    );
}
