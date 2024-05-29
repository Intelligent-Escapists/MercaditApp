import { useContext } from "react";
import { UserContext } from "@/providers/UserProvider";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
export default function DetalleUsuario() {
    const { user } = useContext(UserContext);

    return (
        <div className="flex justify-center items-center">
            <Card className='w-[450px] h-[730px]'>
                <CardHeader>
                    <CardTitle>Perfil de {user.nombre_usuario}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        name='nombre_usuario'
                        type="text"
                        value={user.nombre_usuario}
                        required
                    />
                    <Input
                        name='correo'
                        type="text"
                        value={user.correo}
                        required
                    />
                    <Input
                        name='telefono'
                        type="number"
                        value={user.telefono}
                        required
                    />

                </CardContent>
            </Card>
        </div>
    );
}
