import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { axiosInstance } from "@/services/Axios/axiosClient";

export default function RegistrarProducto() {
    const { user } = useContext(UserContext);
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [foto, setFoto] = useState(null);
    const [stock, setStock] = useState("");
    const [precio, setPrecio] = useState("");
    const [categoria, setCategoria] = useState("");

    useEffect(() => {
        axiosInstance.get('producto/productos')
            .then((res) => {
                setProductos(res.data);
            })
            .catch((err) => { toast.error(err.message) });

        // Obtener las categorías desde la API
        axiosInstance.get('/producto/obtener-todas-las-categorias-existentes')
            .then((res) => {
                setCategorias(res.data.categorias);
            })
            .catch((err) => { toast.error("Error al cargar las categorías"); });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id_usuario', user.id); // Asumiendo que el id del usuario está en user.id
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('foto', foto);
        formData.append('cantidad', stock);
        formData.append('precio', precio);
        formData.append('categoria', categoria);

        try {
            const response = await axiosInstance.post('/producto/agregar-producto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 201) {
                toast.success("Producto registrado exitosamente");
                setNombre("");
                setDescripcion("");
                setFoto(null);
                setStock("");
                setPrecio("");
                setCategoria("");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "Error al registrar el producto");
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
        <div className="flex justify-center items-center">
            <div className="overflow-y-auto">
                <div className="grid grid-cols-1 gap-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full gap-4">
                            <Card className='w-[450px] h-[640px]'>
                                <CardHeader>
                                    <CardTitle>Nuevo Producto</CardTitle>
                                    <CardDescription>Inicia con la nueva venta de un producto</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid w-full gap-6">
                                        <div className="flex flex-col items-start space-y-2">
                                            <Label htmlFor='nombre'>Nombre</Label>
                                            <Input
                                                id='nombre'
                                                type="text"
                                                placeholder="Ej. Camisa"
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col items-start space-y-2">
                                            <Label htmlFor='descripcion'>Descripción</Label>
                                            <Textarea
                                                id='descripcion'
                                                placeholder="Ej. Camisa negra con estampado de Star Wars"
                                                value={descripcion}
                                                onChange={(e) => setDescripcion(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col items-start space-y-2">
                                            <Label htmlFor='foto'>Foto</Label>
                                            <Input
                                                id='foto'
                                                type="file"
                                                onChange={(e) => setFoto(e.target.files[0])}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col items-start space-y-2">
                                            <Label htmlFor='stock'>Stock</Label>
                                            <Input
                                                id='stock'
                                                type="number"
                                                placeholder="5"
                                                value={stock}
                                                onChange={(e) => setStock(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col items-start space-y-2">
                                            <Label htmlFor='precio'>Precio</Label>
                                            <Input
                                                id='precio'
                                                type="number"
                                                placeholder="5"
                                                value={precio}
                                                onChange={(e) => setPrecio(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col items-start space-y-2">
                                            <Label htmlFor='categoria'>Categoría</Label>
                                            <select
                                                id='categoria'
                                                value={categoria}
                                                onChange={(e) => setCategoria(e.target.value)}
                                                required
                                                className="input"
                                            >
                                                <option value="" disabled>Selecciona una categoría</option>
                                                {categorias.map((cat) => (
                                                    <option key={cat} value={cat}>
                                                        {cat}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <Button className='w-full mt-6 font-semibold' type="submit">
                                        <span className="text-base">Subir Producto</span>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
