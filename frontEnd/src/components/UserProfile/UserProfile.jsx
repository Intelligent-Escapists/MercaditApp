/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BaL8upd1vk8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { UserContext } from "@/providers/UserProvider";
import { useContext, useState } from "react"
import { toast } from "sonner";
import { axiosInstance } from "@/services/Axios/axiosClient";


import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import ChevronDownIcon from "../Icons/ChevronDownIcon";
import useInput from "../Hooks/useInput";
import { isLengthOk } from "../Hooks/Validators/isLengthOk";
import { isEmailValid } from "../Hooks/Validators/isEmailValid";
import { isPhoneNumber } from "../Hooks/Validators/isPhoneNumber";


export default function UserProfile() {
    const { user, setUser, actualizarUsuario } = useContext(UserContext);

    const [selectedPhoto, setSelectedPhoto] = useState(user.foto);

    const nombre_usuarioInput = useInput(user.nombre_usuario, { errorMsg: 'Nombre de usuario invalido', validator: isLengthOk });
    const correoInput = useInput(user.correo, { errorMsg: 'Correo invalido', validator: isEmailValid });
    const telefonoInput = useInput(user.telefono, { errorMsg: 'Telefono invalido', validator: isPhoneNumber });

    const handlePhotoChange = (value) => {
        setSelectedPhoto(value);
    };

    const hayErrores = () => {
        return nombre_usuarioInput.error || correoInput.error || telefonoInput.error;
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (hayErrores()) {
            toast.error('Por favor llena los campos correctamente', {
                duration: 2000
            });

        }

        const usuario = {
            "nombre_usuario": nombre_usuarioInput.value,
            "correo": correoInput.value,
            "telefono": telefonoInput.value,
            "foto": selectedPhoto
        }
        console.log(usuario)

        const usuarioPromise = actualizarUsuario(usuario);

        toast.promise(usuarioPromise, {
            loading: 'Actualizando información...',
            success: 'Información actualizada exitosamente',
            error: (error) => error.response?.data?.error || "Error al actualizar informacion",
        });

        try {
            const response = await usuarioPromise;
            setUser(prevUser => ({ ...prevUser, ...usuario }));
        } catch (error) {
            console.error("Error al registrar el producto:", error);
        }



    }


    return (
        <div className="flex flex-col w-full justify-center items-center">
            <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold ">Tu Perfil</h2>
            <div className="flex items-center gap-8 p-6 md:p-10 w-[40%]">
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={selectedPhoto} alt="foto-de-perfil" />
                        <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <ChevronDownIcon className="h-5 w-5 stroke-black" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Selecciona una foto de perfil</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Selecciona una foto de perfil</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup defaultValue={selectedPhoto} onValueChange={handlePhotoChange}>
                                    <DropdownMenuRadioItem value="../../src/assets/profile-pic-1.png" className="hover:cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-24 w-24">
                                                <img src="../../src/assets/profile-pic-1.png" alt="Foto-de-perfil-1" />
                                                <AvatarFallback>JP</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="../../src/assets/profile-pic-2.png" className="hover:cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-24 w-24">
                                                <img src="../../src/assets/profile-pic-2.png" alt="Foto-de-perfil-1" />
                                                <AvatarFallback>JP</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="../../src/assets/profile-pic-3.png" className="hover:cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-24 w-24">
                                                <img src="../../src/assets/profile-pic-3.png" alt="Foto-de-perfil-1" />
                                                <AvatarFallback>JP</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="../../src/assets/profile-pic-4.png" className="hover:cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-24 w-24">
                                                <img src="../../src/assets/profile-pic-4.png" alt="Foto-de-perfil-1" />
                                                <AvatarFallback>JP</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="flex-1 space-y-4">
                    <form onSubmit={onSubmitHandler}>
                        <div className="space-y-2">
                            <Label htmlFor="username">Nombre de usuario</Label>
                            <Input id="username" value={nombre_usuarioInput.value} onChange={nombre_usuarioInput.onChange} type="text" />
                            {nombre_usuarioInput.error && <small style={{ color: 'red' }}>{nombre_usuarioInput.error}</small>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo</Label>
                            <Input id="email" type="email" value={correoInput.value} onChange={correoInput.onChange} />
                            {correoInput.error && <small style={{ color: 'red' }}>{correoInput.error}</small>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input id="phone" type="text" value={telefonoInput.value} onChange={telefonoInput.onChange} />
                            {telefonoInput.error && <small style={{ color: 'red' }}>{telefonoInput.error}</small>}
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button className="font-semibold" type="submit">Guardar Cambios</Button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}



