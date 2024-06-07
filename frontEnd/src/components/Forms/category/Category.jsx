import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/services/Axios/axiosClient";

import {
    NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import ChevronDownIcon from "@/components/Icons/ChevronDownIcon";


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
                <DropdownMenuTrigger className=" focus:outline-none text-white">
                    <Button variant="ghost" size="sm" className="text-xl">
                        Categorías
                        <ChevronDownIcon className="h-5 w-5 " />
                    </Button>
                </DropdownMenuTrigger>
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
