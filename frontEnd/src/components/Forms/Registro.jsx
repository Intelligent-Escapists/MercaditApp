import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/providers/UserProvider";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"



import useInput from "../Hooks/useInput";
import { isEmailValid } from "../Hooks/Validators/isEmailValid";
import { isPasswordValid } from "../Hooks/Validators/isPasswordValid";
import { isLengthOk } from "../Hooks/Validators/isLengthOk";
import { isPhoneNumber } from "../Hooks/Validators/isPhoneNumber";

import { toast } from "sonner";

import { axiosInstance } from "@/services/Axios/axiosClient";

export default function Registro() {

    const navigate = useNavigate();
    const { toggleRegister } = useContext(UserContext);

    const nombre_usuarioInput = useInput('', { errorMsg: 'Nombre de usuario invalido', validator: isLengthOk });
    const correoInput = useInput('', { errorMsg: 'Correo invalido', validator: isEmailValid });
    const passwordInput = useInput('', { errorMsg: 'La contraseña debe contener al menos un caracter especial, numeros y una letra en mayusculaz', validator: isPasswordValid });

    const telefonoInput = useInput('', { errorMsg: 'Telefono invalido', validator: isPhoneNumber });

    const rolInput = useInput(1, { errorMsg: 'Rol invalido', isRadioButton: true });

    const hayErrores = () => {
        return nombre_usuarioInput.error || correoInput.error || passwordInput.error || telefonoInput.error || rolInput.error;
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (hayErrores()) {
            toast.error('Por favor llena los campos correctamente', {
                duration: 2000
            });

        }

        const nuevoUsuario = {
            "nombre_usuario": nombre_usuarioInput.value,
            "correo": correoInput.value,
            "password": passwordInput.value,
            "telefono": telefonoInput.value,
            "rol": rolInput.value
        }

        axiosInstance.post('/usuario/crear-usuario', nuevoUsuario)
            .then((res) => {
                navigate('/correo-enviado');
                console.log(res.data);

            })
            .catch((error) => {
                let errormsg = '';

                if (error.response.status === 409) {
                    errormsg = 'El correo o el nombre de usuario ya esta registrado';
                }

                toast.error(errormsg, {
                    duration: 5000
                });
            });



    }

    return (
        <>

            <div className="flex justify-center items-center flex-col">

                {/* <h2>¡Únete a MercaditApp hoy y forma parte de nuestra comunidad de estudiantes entusiastas, creando una red de ventas segura juntos!</h2> */}

                <Card className='w-[700px] min-h-[500px] max-h-[570px]'>
                    <CardHeader>
                        <CardTitle>Registrarse</CardTitle>
                        <CardDescription>Llena el formulario para realizar tu registro</CardDescription>
                    </CardHeader>
                    <CardContent >
                        <form onSubmit={onSubmitHandler} >


                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col items-start space-y-2">
                                    <Label htmlFor='password'>Nombre de Usuario<span className="text-red-500">*</span></Label>
                                    <Input id='nombre_usuario' type="text" placeholder="user_example12" onChange={nombre_usuarioInput.onChange} value={nombre_usuarioInput.value} required className={nombre_usuarioInput.error ? 'ring-offset-red-500 focus-visible:ring-red-500' : ''} />
                                    {nombre_usuarioInput.error && <small style={{ color: 'red' }}>{nombre_usuarioInput.error}</small>}

                                </div>
                                <div className="flex flex-col items-start space-y-2">
                                    <Label htmlFor='email'>Correo<span className="text-red-500">*</span></Label>
                                    <Input id='email' type="email" placeholder="m@example.com" onChange={correoInput.onChange} value={correoInput.value} required className={correoInput.error ? 'ring-offset-red-500 focus-visible:ring-red-500' : ''} />
                                    {correoInput.error && <small style={{ color: 'red' }}>{correoInput.error}</small>}

                                </div>
                                <div className="flex flex-col items-start space-y-2">
                                    <Label htmlFor='password'>Contraseña<span className="text-red-500">*</span></Label>
                                    <Input id='password' type="password" placeholder="Password" onChange={passwordInput.onChange} value={passwordInput.value} required className={passwordInput.error ? 'ring-offset-red-500 focus-visible:ring-red-500' : ''} />
                                    {passwordInput.error && <small style={{ color: 'red' }}>{passwordInput.error}</small>}

                                </div>

                                <div className="flex flex-col items-start space-y-2">
                                    <Label htmlFor='password'>Teléfono<span className="text-red-500">*</span></Label>
                                    <Input id='telefono' type="text" placeholder="5576875643" onChange={telefonoInput.onChange} value={telefonoInput.value} required className={telefonoInput.error ? 'ring-offset-red-500 focus-visible:ring-red-500' : ''} />
                                    {telefonoInput.error && <small style={{ color: 'red' }}>{telefonoInput.error}</small>}

                                </div>
                                <div className="flex flex-col items-start space-y-2">
                                    <Label htmlFor='password'>¿Eres vendedor?<span className="text-red-500">*</span></Label>
                                    <RadioGroup defaultValue={rolInput.value} onValueChange={rolInput.onChange}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value={1} id="option-one" />
                                            <Label htmlFor="option-one">No</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value={0} id="option-two" />
                                            <Label htmlFor="option-two">Si</Label>
                                        </div>
                                    </RadioGroup>


                                </div>


                                <small className=" col-span-2"><span className="text-red-500">*</span> campos obligatorios</small>
                            </div>
                            <Button className='w-full mt-6 font-semibold' type="submit">Registrarse</Button>
                        </form>
                    </CardContent>
                    <CardFooter className="col-span-2">
                        <small className=" mr-2">¿Ya tienes una cuenta?</small> <small><Link to="/" className="text-blue-500 font-medium" onClick={toggleRegister}>Inicia Sesión</Link></small>
                    </CardFooter>
                </Card>

            </div >
        </>

    );

}