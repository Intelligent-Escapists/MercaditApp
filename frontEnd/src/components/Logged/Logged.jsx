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
import httpClient from "../HttpClient/httpClient";
import fetchData from "../HttpClient/fetchData";


export default function Logged() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const resp = await fetchData();
                setUser(resp.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, []);

    const logOut = async () => {
        await httpClient.post("//localhost:5000/usuario/logout-usuario");
        navigate('/home');
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full md:w-2/3 lg:w-1/4 lg:h-1/4 text-center flex flex-col justify-center">
                <CardHeader>
                    <CardTitle className="text-3xl" >Has iniciado sesión</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center gap-4 flex-col">
                    {user &&
                        <div>
                            <p>email:{user.correo}</p>
                        </div>}


                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={logOut}>Cerrar Sesión</Button>
                </CardFooter>
            </Card>


        </div>


    );

}