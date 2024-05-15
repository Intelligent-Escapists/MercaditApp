import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Nav from "./Nav";


export default function Root() {

    return (
        <>
            <div className="h-screen">
                <Nav />
                <div className="flex gap-4 justify-around  h-[80%]">

                    <Outlet />

                </div>
                <Footer />
            </div>
        </>
    );



    // <NavigationMenuItem className="mr-4 flex flex-col">
    //                         <DropdownMenu>
    //                             <DropdownMenuTrigger className="text-xl hover:underline focus:outline-none text-white">
    //                                 <UserIcon className="w-8 h-8" />
    //                             </DropdownMenuTrigger>
    //                             <DropdownMenuContent className="w-56 text-lg">
    //                                 <DropdownMenuItem>Profile</DropdownMenuItem>
    //                                 <DropdownMenuItem>Billing</DropdownMenuItem>
    //                                 <DropdownMenuItem>Team</DropdownMenuItem>
    //                                 <DropdownMenuItem>Subscription</DropdownMenuItem>
    //                             </DropdownMenuContent>
    //                         </DropdownMenu>
    //                     </NavigationMenuItem>

}