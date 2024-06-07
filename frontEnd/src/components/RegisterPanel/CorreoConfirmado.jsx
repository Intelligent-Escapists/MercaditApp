
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


import { axiosInstance } from "@/services/Axios/axiosClient";

export default function CorreoConfirmado() {
    const { token } = useParams();
    const [errormsg, setErrormsg] = useState('');

    useEffect(() => {
        axiosInstance.get(`/usuario/verificar-correo/${token}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {

                if (err.response.status === 401) {
                    setErrormsg('El token no es valido');
                }
                else if (err.response.status === 408) {
                    setErrormsg('El token no existe');
                }
                else if (err.response.status === 404) {
                    setErrormsg('Usuario no encontrado');
                }
            });
    }, []);


    return (
        <>

            {errormsg === '' ?

                <div className=" flex flex-col justify-center items-center">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">¡Tu correo ha sido verificado exitosamente!</h1>
                    <p className="mt-8 scroll-m-20  text-xl  font-medium">Ahora puedes <span><Link to="/" className=" text-violet-700 font-medium">Iniciar Sesión</Link></span></p>
                    <img src="../../src/assets/Login.png" alt="login-image" className="w-[500px] h-[500px]" />
                </div> :

                <div className=" flex flex-col justify-center items-center">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">{errormsg}</h1>
                    <img src="../../src/assets/Error.png" alt="error-image" className="w-[500px] h-[500px]" />
                </div>



            }
        </>

    )



}