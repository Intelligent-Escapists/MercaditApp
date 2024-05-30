import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "@/providers/UserProvider";
import { useEffect, useState, useContext } from "react";
import { axiosInstance } from "@/services/Axios/axiosClient";
import { toast } from "sonner"
import CommentSection from "./CommentSection";
import Comment from "./Comment";
import Calificacion from "./Calificacion";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import useInput from "../Hooks/useInput";
import { isNumberValid } from "../Hooks/Validators/isNumberValid";

import CartIcon from "../Icons/CartIcon";
import Selector from "./Selector";
import EditIcon from "../Icons/EditIcon";

export default function DetallesProducto() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { product_id } = useParams();
    const [producto, setProducto] = useState(null);
    const [categorias, setCategorias] = useState([]);

    const nombreInput = useInput('', { errorMsg: 'Nombre invalido' });
    const descripcionInput = useInput('', { errorMsg: 'Descripción invalida' });
    const precioInput = useInput('', { errorMsg: 'Precio invalido', validator: isNumberValid });
    const cantidadInput = useInput('', { errorMsg: 'Cantidad invalida', validator: isNumberValid });

    const [categoriaInput, setCategoriaInput] = useState('');
    const [foto, setFoto] = useState('');
    const [fotoError, setFotoError] = useState('');

    useEffect(() => {
        axiosInstance.get(`producto/obtener-producto/${product_id}`)
            .then((res) => {
                setProducto(res.data);
                setterTodo(res.data);
            })
            .catch((err) => { console.log(err.message) });

        axiosInstance.get('/producto/obtener-todas-las-categorias-existentes')
            .then((res) => {
                setCategorias(res.data.categorias);
            })
            .catch((err) => { toast.error(err || "Error al cargar las categorías"); });

    }, [product_id]);

    const setterTodo = (producto) => {
        nombreInput.setValue(producto.nombre);
        descripcionInput.setValue(producto.descripcion);
        precioInput.setValue(producto.precio);
        cantidadInput.setValue(producto.no_stock);
        setCategoriaInput(producto.categoria);
        setFoto(producto.foto);
    };

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
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    if (!producto) {
        return <div className="flex justify-center items-center">Loading...</div>;
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const goBackHandler = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productToSend = {
            id_producto: parseInt(product_id),  // Asegúrate de incluir id_producto
            id_usuario: user.id_usuario,
            nombre: nombreInput.value,
            descripcion: descripcionInput.value,
            precio: parseInt(precioInput.value),
            no_stock: parseInt(cantidadInput.value),
            categoria: [categoriaInput],
            foto: foto,
        };
        console.log(productToSend);

        const productPromise = axiosInstance.put('/producto/actualizar-producto', productToSend);

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

    return (
        <div className="flex justify-center items-center gap-9 ">
            <div>
                <Breadcrumb className="py-4">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="text-lg" href="#" onClick={goBackHandler}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-lg">{producto.nombre}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Card className="p-3 flex justify-center items-center h-[500px] w-[500px]">
                    <img src={producto.foto} alt={producto.nombre} className="h-[350px] w-[350px]" />
                </Card>
            </div>
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>{producto.nombre}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <p>{producto.descripcion}</p>
                    <Separator />
                    <p className="text-[3.2rem] font-semibold text-indigo-800">{formatCurrency(producto.precio)}</p>
                    <p>Tu calificación del producto</p>
                    <Calificacion />
                </CardContent>
                <CardFooter className="flex gap-8">
                    {user.rol === 0 ? (
                        <>
                            <Selector />
                            <Button className="font-semibold hover:scale-100 w-[500px]">
                                <CartIcon className="h-5 w-5 mr-2" />
                                <span className="text-base">Agregar al carrito</span>
                            </Button>
                        </>
                    ) : (
                        <Dialog>
                            <DialogTrigger asChild className="w-full">
                                <Button variant="outline">
                                    <EditIcon className="h-5 w-5 mr-2" />
                                    Editar
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Editar producto</DialogTitle>
                                    <DialogDescription>
                                        Asegúrate de que los datos sean correctos antes de guardar los cambios.
                                    </DialogDescription>
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid w-full gap-6 mt-4">
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
                                                <Select onValueChange={handleCategoriaChange} value={categoriaInput}>
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
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button type="submit" className="font-semibold mt-4">Guardar Cambios</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </form>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    )}
                </CardFooter>
            </Card>

                    {/* Agregar sección de comentarios */}
            <div className="mt-8 w-full max-w-xl">
                <CommentSection entityId={product_id} userId={user?.id_usuario} />
            </div>

        </div>
    );
}
