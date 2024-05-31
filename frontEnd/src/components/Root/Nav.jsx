import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/providers/UserProvider";
import Category from "../Forms/category/Category";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Button } from "../ui/button";
import UserIcon from "../Icons/UserIcon";
import CartIcon from "../Icons/CartIcon";


export default function Nav() {
    const navigate = useNavigate();
    const { user, register, toggleRegister, logout, loged } = useContext(UserContext);

    const handleLogoClick = () => {
        toggleRegister();
        if (user) {
            if (user.rol == 0)
                navigate('/homeCompra');
            else if (user.rol == 1) {
                navigate('/homeVenta');
            }
        } else {
            navigate('/');
        }
    };

    const handleClickRegisterButton = () => {
        toggleRegister();
        if (register) {
            navigate('/');
        } else {
            navigate('/registro');
        }
    };

    const handleClickLogOut = () => {
        logout();
        navigate('/');
    };

    const handleClickUserDetail = () => {
        navigate('/perfil');
    };

    const getPrimerasDosLetrasUsuario = user ? user.correo.charAt(0).toUpperCase() + user.correo.charAt(2).toUpperCase : '';

    return (
        <header className="bg-indigo-900 py-5 pl-8 pr-8 h-[10%]">
            <NavigationMenu className="w-full">
                <NavigationMenuList className="flex justify-between">
                    <div className="flex items-center">
                        <NavigationMenuItem className="mr-4">
                            <div onClick={handleLogoClick} className="cursor-pointer">
                                <NavigationMenuLink>
                                    <img src="../../src/assets/mercadit-app-logo.png" alt="MercaditApp Logo" className="w-[70px] h-[70px]" />
                                </NavigationMenuLink>
                            </div>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <div onClick={handleLogoClick} className="cursor-pointer">
                                <NavigationMenuLink>
                                    <p className="text-3xl font-bold text-white">MercaditApp</p>
                                </NavigationMenuLink>
                            </div>
                        </NavigationMenuItem>
                    </div>        
                    {user && loged ? (
                        <div className="flex gap-7">
                            {user.rol === 0 && (
                                <NavigationMenuItem>
                                    <Link to="/carrito">
                                        <CartIcon className="w-10 h-10 text-white" />
                                    </Link>
                                </NavigationMenuItem>
                            )}
                            <NavigationMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="text-xl focus:outline-none text-white">
                                        <Avatar className=" w-12 h-12">
                                            <AvatarImage src={user.foto} alt="foto-de-perfil" />
                                            <AvatarFallback>{getPrimerasDosLetrasUsuario}</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-36 text-lg">
                                        <DropdownMenuItem className="hover:cursor-pointer" onClick={handleClickUserDetail}>Perfil</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="hover:cursor-pointer" onClick={handleClickLogOut}>Cerrar Sesión</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </NavigationMenuItem>
                        </div>
                    ) : (
                        <div>
                            <NavigationMenuItem>
                                <Button className={`text-lg font-semibold ${register ? 'bg-transparent hover:bg-transparent' : ''}`} onClick={handleClickRegisterButton}>{register ? 'Iniciar Sesión' : 'Registrate'}</Button>
                            </NavigationMenuItem>
                        </div>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
}
