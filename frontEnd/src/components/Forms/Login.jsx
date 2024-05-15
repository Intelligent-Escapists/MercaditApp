import { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/services/Axios/axiosClient";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card"
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import { toast } from "sonner";

import useInput from "../Hooks/useInput";
import { isEmailValid } from "../Hooks/Validators/isEmailValid";

export default function Login() {
    const navigate = useNavigate();
    const [errormsg, setErrormsg] = useState('');

    // useEffect(() => {


    // }, [alert]);



    const correoInput = useInput('', { errorMsg: 'Correo invalido', validator: isEmailValid });
    const passwordInput = useInput('', { errorMsg: 'Contraseña invalida' });


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const usuario = {
            "correo": correoInput.value,
            "password": passwordInput.value
        }

        axiosInstance.post('/usuario/login-usuario', usuario)
            .then((res) => {
                console.log(res);
                navigate('/home')
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setErrormsg('Correo o contraseña incorrectos');
                }
                else if (err.response.status === 403) {
                    setErrormsg('Correo no verificado, por favor verifica tu correo');
                }
            })


    }

    return (
        <>

            <div className="flex justify-center items-center">

                <Card className='w-[450px] h-[400px]'>
                    <CardHeader>
                        <CardTitle>Iniciar Sesión</CardTitle>
                        <CardDescription>Si ya estas registrado, inicia sesión</CardDescription>
                    </CardHeader>
                    <CardContent >
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
                            <Button className='w-full mt-6 font-semibold' type="submit">Iniciar Sesión</Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <small className=" mr-2">¿No tienes cuenta?</small> <small><Link to="/registro" className="text-blue-500 font-medium">Registrate</Link></small>
                    </CardFooter>
                </Card>

            </div >
        </>

    );

}