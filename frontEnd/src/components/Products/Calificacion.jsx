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
            <Button className="mt-4 mb-3">
                <span className="text-base">Calificar Producto</span>
            </Button>
        </div>
    );
}
