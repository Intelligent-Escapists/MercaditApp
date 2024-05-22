// src/components/Products.jsx
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/services/Axios/axiosClient";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get("/producto/consultar-productos");
                setProducts(response.data);
            } catch (err) {
                setError("Error al cargar los productos");
            }
        };

        fetchProducts();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Productos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product.id_producto} className="card">
                        <img src={product.foto} alt={product.nombre} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold">{product.nombre}</h2>
                            <p>{product.descripcion}</p>
                            <p className="font-semibold">${product.precio}</p>
                            <p className="text-sm">Stock: {product.no_stock}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
