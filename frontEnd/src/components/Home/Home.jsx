import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "../ui/button";

import { Link, useNavigate } from "react-router-dom";
import fetchData from "../HttpClient/fetchData";

export default function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const resp = await fetchData();
                if (resp.data) {
                    console.log('Usuario encontrado, redirigiendo a /logged');
                    navigate('/logged');
                } else {
                    console.log('Usuario no encontrado');
                }
            } catch (error) {
                console.log('Error al obtener los datos del usuario:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full md:w-2/3 lg:w-1/4 lg:h-1/4 text-center flex flex-col justify-center">
                <CardHeader>
                    <CardTitle className="text-3xl" >Bienvenido</CardTitle>
                    <CardDescription className="text-xl" >Registrate o inicia sesión</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center gap-4">
                    <Button  ><Link >Registrarse</Link></Button>
                    <Button ><Link to="/form/login">Iniciar Sesión</Link></Button>

                </CardContent>
            </Card>


        </div>


    );


}