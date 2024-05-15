import { Link } from "react-router-dom";


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
                    <div className="">
                        <NavigationMenuItem>
                            <Link to="/registro"> <Button className="text-lg font-semibold">Registrate</Button> </Link>
                        </NavigationMenuItem>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>

        </header>
    );
}