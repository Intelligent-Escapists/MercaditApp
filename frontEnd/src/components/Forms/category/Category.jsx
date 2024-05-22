import {
    NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/services/Axios/axiosClient";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get("/producto/obtener-todas-las-categorias-existentes");
                setCategories(response.data.categorias); // Corrección aquí
            } catch (err) {
                setError("Error al cargar las categorías");
            }
        };

        fetchCategories();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <NavigationMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger className="text-xl hover:underline focus:outline-none text-white">Categorías</DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 text-lg">
                    {categories.map(category => (
                        <DropdownMenuItem key={category} onClick={() => handleCategoryClick(category)}>
                            {category}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </NavigationMenuItem>
    );
};

export default Category;
