import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "@/providers/UserProvider";
import { useEffect, useState, useContext } from "react";
import { axiosInstance } from "@/services/Axios/axiosClient";
import { toast } from "sonner";
import { FaStar } from 'react-icons/fa';
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import confetti from "canvas-confetti"; // Importa la librería de confeti

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
                console.log("USER RATING", userRating);
                if (userRating !== "No existe calificacion") {
                    setExistingRating(userRating); // Almacenar la calificación existente
                    setRating(userRating);
                } else {

                }
            } catch (error) {
                toast.error("Error al obtener la calificación");
                console.error("Fetch Rating Error:", error);
            }
        };

        fetchRating();
    }, [product_id, user.id_usuario]);

    const handleCalificar = async () => {
        console.log("ESTOY PRESIONANDO EL BOTON");
        if (rating === null) {
            console.log("No se ha seleccionado ninguna calificación");
            toast.warning("Por favor selecciona una calificación antes de enviar");
            return;
        }

        const calificacionData = {
            id_producto: parseInt(product_id),
            id_usuario: parseInt(user.id_usuario),
            calificacion: rating
        };

        try {
            const response = await axiosInstance.post('producto/calificar-producto', calificacionData);
            console.log("Response:", response.data);
            if (response.data.calificacion) {
                toast.success("Gracias por calificar el producto!!");
                setExistingRating(rating); // Actualizar la calificación existente

                // Mostrar confeti
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            } else {
                toast.error(response.data.error || "Error al calificar el producto");
            }
        } catch (error) {
            toast.error("Error al enviar la calificación");
            console.error("Submit Rating Error:", error);
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
            {existingRating && (<p className="mt-3">Calificaste a este producto con {existingRating} estrellas</p>)}
            <Button className="mt-4 mb-3" onClick={handleCalificar}>
                {existingRating === null ? <span className="text-base">Calificar producto</span> : <span className="text-base">Actualizar calificación</span>}

            </Button>
        </div>
    );
}
