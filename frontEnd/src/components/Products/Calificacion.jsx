import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "@/providers/UserProvider";
import { useEffect, useState, useContext } from "react";
import { axiosInstance } from "@/services/Axios/axiosClient";
import { toast } from "sonner";
import { FaStar } from 'react-icons/fa';
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Calificacion() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [existingRating, setExistingRating] = useState(null); // Nuevo estado para almacenar la calificación existente
    const { user } = useContext(UserContext);
    const { product_id } = useParams();

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const response = await axiosInstance.get(`producto/obten-calificacion?id_producto=${product_id}&id_usuario=${user.id_usuario}`);
                const userRating = response.data.calificacion;
                console.log("USER RATING", userRating)
                if (userRating !== "No existe calificacion") {
                    setExistingRating(userRating); // Almacenar la calificación existente
                    setRating(userRating);
                }
            } catch (error) {
                toast.error("Error al obtener la calificación");
            }
        };

        fetchRating();
    }, [product_id, user.id]);

    const handleCalificar = async () => {
        const calificacionData = {
            id_producto: parseInt(product_id),
            id_usuario: parseInt(user.id_usuario),
            calificacion: rating
        };

        try {
            const response = await axiosInstance.post('producto/calificar-producto', calificacionData);
            if (response.data.calificacion) {
                toast.success("Producto calificado con éxito");
                setExistingRating(rating); // Actualizar la calificación existente
            } else {
                toast.error(response.data.error || "Error al calificar el producto");
            }
        } catch (error) {
            toast.error("Error al enviar la calificación");
        }
    };

    return (
        <div>
            <div className="flex space-x-2">
                {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                        <Label key={currentRating}>
                            <Input className="hidden"
                                type="radio"
                                name="rating"
                                value={currentRating}
                                onClick={() => setRating(currentRating)}
                            />
                            <FaStar
                                className="cursor-pointer"
                                size={35}
                                color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(null)}
                                onClick={() => setRating(currentRating)}
                            />
                        </Label>
                    );
                })}
            </div>
            {existingRating === null && ( // Renderizar el párrafo si no existe calificación
                <p className="mt-3">Aun no cuentas con una calificación. ¡Califica el producto ahora!</p>
            )}
            <p className="mt-3">Haz calificado este producto con {existingRating} estrellas</p>
            <Button className="mt-4 mb-3" onClick={handleCalificar}>
                <span className="text-base">Calificar Producto</span>
            </Button>
        </div>
    );
}
