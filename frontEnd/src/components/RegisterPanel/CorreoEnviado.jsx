
export default function CorreoEnviado() {


    return (

        <div className="flex flex-col justify-center items-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">¡Ya casi estas!</h1>
            <p className="mt-8 scroll-m-20  text-xl  font-medium">Se ha enviado un correo a tu correo electrónico con un enlace para completar tu registro.</p>
            <p className="mt-4 scroll-m-20 text-xl font-medium">Si no ves el correo en tu bandeja de entrada, revisa la carpeta de spam o correo no deseado</p>
            <img src="src/assets/mail-computer.png" alt="computadora con un icono de correo" className="w-[500px] h-[500px]" />
        </div>

    );

}