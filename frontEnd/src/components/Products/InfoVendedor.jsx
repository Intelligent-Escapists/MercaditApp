/**
 * v0 by Vercel.
 * @see https://v0.dev/t/k2VPgHY3KcH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useEffect, useState } from "react"
import { axiosInstance } from "@/services/Axios/axiosClient"

import { Card, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import InboxIcon from "../Icons/InboxIcon"
import PhoneIcon from "../Icons/PhoneIcon"

export default function InfoVendedor({ id_vendedor }) {

    const [vendedor, setVendedor] = useState({});

    useEffect(() => {
        axiosInstance.get(`/usuario/obtener-usuario/${id_vendedor}`)
            .then((res) => {
                setVendedor(res.data);
            })
            .catch((err) => { console.log(err) })
    }, []);

    return (
        <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Información del Vendedor</h3>
            <Card className="w-full max-w-sm p-6 bg-white dark:bg-gray-950 rounded-lg shadow-md">

                <div className="flex items-center space-x-4">
                    {/* <Avatar className="h-12 w-12 rounded-full">
                        <img src="/placeholder.svg" alt="Seller Avatar" />
                        <AvatarFallback>JS</AvatarFallback>
                    </Avatar> */}
                    <div>
                        <h3 className="text-lg font-semibold">{vendedor.nombre_usuario}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Vendedor</p>
                    </div>
                </div>
                <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-2">
                        <InboxIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <a href="#" className="text-blue-600 hover:underline">
                            {vendedor.correo}
                        </a>
                    </div>
                    <div className="flex items-center space-x-2">
                        <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <a href="#" className="text-blue-600 hover:underline">
                            {vendedor.telefono}
                        </a>
                    </div>
                </div>
            </Card>
        </div>
    )
}



