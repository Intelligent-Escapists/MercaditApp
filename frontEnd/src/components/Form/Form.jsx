import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";

import useInput from "../Hooks/useInput";
import { isEmailValid } from "../Hooks/Validators/isEmailValid";
import { isPasswordValid } from "../Hooks/Validators/isPasswordValid";

import httpClient from "../HttpClient/httpClient";
import fetchData from "../HttpClient/fetchData";

export default function Form() {
    const [alert, setAlert] = useState('ok');
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

    }, [alert]);



    const { type } = useParams();
    const correoInput = useInput('', { errorMsg: 'Correo invalido', validator: isEmailValid });
    const passwordInput = useInput('', { errorMsg: 'Contraseña invalida, tiene que contener más de 5 caracteres', validator: isPasswordValid });
    const cardTitle = type === 'login' ? 'Iniciar Sesión' : 'Registrarse';
    const cardDescription = type === 'login' ? 'Inicia sesión en tu cuenta' : 'Crea una cuenta para empezar a usar la aplicación';


    const onSubmitHandler = async (e) => {
        e.preventDefault();


        try {
            const resp = await httpClient.post("//localhost:5000/usuario/login-usuario", {
                correo: correoInput.value,
                password: passwordInput.value
            })

            console.log(resp.data);

            navigate('/logged');

        } catch (error) {
            setAlert('Usuario o contraseña incorrectos');
            if (error.response.status === 401) {

            }
        }


    }

    return (
        <>
            {
                alert !== 'ok' &&
                <Alert variant="destructive" >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Usuario o contraseña incorrectos</AlertDescription>
                </Alert>
            }

            <div className="flex justify-center items-center h-screen">

                <Card className='w-[350px]'>
                    <CardHeader>
                        <CardTitle>{cardTitle}</CardTitle>
                        <CardDescription>{cardDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={onSubmitHandler} >
                            <div className="grid w-full gap-4">
                                <div className="flex flex-col items-start space-y-2">
                                    <Label htmlFor='email'>Email</Label>
                                    <Input id='email' type="email" placeholder="m@example.com" onChange={correoInput.onChange} value={correoInput.value} required className={correoInput.error ? 'ring-offset-red-500 focus-visible:ring-red-500' : ''} />
                                    {correoInput.error && <small style={{ color: 'red' }}>{correoInput.error}</small>}

                                </div>
                                <div className="flex flex-col items-start space-y-2">
                                    <Label htmlFor='password'>Contraseña</Label>
                                    <Input id='password' type="password" placeholder="Password" onChange={passwordInput.onChange} value={passwordInput.value} required className={passwordInput.error ? 'ring-offset-red-500 focus-visible:ring-red-500' : ''} />
                                    {passwordInput.error && <small style={{ color: 'red' }}>{passwordInput.error}</small>}

                                </div>


                            </div>
                            <Button className='w-full mt-6' type="submit">{cardTitle}</Button>
                        </form>
                    </CardContent>
                </Card>

            </div >
        </>

    );

}