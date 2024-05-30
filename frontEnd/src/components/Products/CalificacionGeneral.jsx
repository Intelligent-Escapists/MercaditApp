import { useEffect, useState } from "react";
import { axiosInstance } from "@/services/Axios/axiosClient";
import { toast } from "sonner";
import { FaStar } from 'react-icons/fa';

export default function CalificacionGeneral({ product_id }) {
    const [averageRating, setAverageRating] = useState(null);

    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                const response = await axiosInstance.get(`producto/obtener-calificacion-producto`, {
                    params: { id_producto: product_id }
                });
                const avgRating = response.data.calificacion;
                setAverageRating(avgRating);
            } catch (error) {
                toast.error("Error al obtener la calificación promedio");
                console.error("Fetch Average Rating Error:", error);
            }
        };

        fetchAverageRating();
    }, [product_id]);

    return (
        <div className="">
            <div className="flex space-x-2">
                {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                        <FaStar
                            key={currentRating}
                            size={15}
                            color={currentRating <= averageRating ? "#ffc107" : "#e4e5e9"}
                        />
                    );
                })}
            </div>
        </div>
    );
}
