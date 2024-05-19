import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/providers/UserProvider";

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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";


export default function Nav() {
    const navigate = useNavigate();
    const { user, register, toggleRegister, logout } = useContext(UserContext);


    console.log(user);

    const handleClickRegisterButton = () => {
        toggleRegister();
        if (register) {
            navigate('/')
        } else {
            navigate('/registro')
        }
    }

    const handleClickLogOut = () => {
        logout();
        navigate('/');
    }

    return (
        <header className="bg-indigo-900 py-5 pl-8 pr-8 h-[10%]">
            <NavigationMenu className="w-full">
                <NavigationMenuList className="flex justify-between">
                    <div className="flex items-center">
                        <NavigationMenuItem className="mr-4">
                            <Link to="/" legacyBehavior passHref>
                                <NavigationMenuLink>
                                    <img src="../../src/assets/mercadit-app-logo.png" alt="" className="w-[70px] h-[70px]" />
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/" legacyBehavior passHref>
                                <NavigationMenuLink>
                                    <p className="text-3xl font-bold text-white">MercaditApp</p>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </div>
                    {user &&
                        <div>
                            <NavigationMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="text-xl hover:underline focus:outline-none text-white">Categorías</DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 text-lg">
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Billing</DropdownMenuItem>
                                        <DropdownMenuItem>Team</DropdownMenuItem>
                                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </NavigationMenuItem>
                        </div>
                    }
                    {user ?

                        <div className="">
                            <NavigationMenuItem>
                                <Button className="text-lg font-semibold" onClick={handleClickLogOut}>Log Out</Button>
                            </NavigationMenuItem>
                        </div>
                        :
                        <div className="">
                            <NavigationMenuItem>
                                <Button className={`text-lg font-semibold ${register ? 'bg-transparent hover:bg-transparent' : ''}`} onClick={handleClickRegisterButton}>{register ? 'Iniciar Sesión' : 'Registrate'}</Button>
                            </NavigationMenuItem>
                        </div>

                    }
                </NavigationMenuList>
            </NavigationMenu>

        </header>
    );
}