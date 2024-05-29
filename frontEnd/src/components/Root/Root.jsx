import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Nav from "./Nav";


export default function Root() {

    return (
        <>
            <div className="h-screen">
                <Nav />
                <div className="flex gap-4 justify-around  min-h-[70%]">

                    <Outlet />

                </div>
                <Footer />
            </div>
        </>
    );


}