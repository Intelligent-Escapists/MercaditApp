import { createContext, useState, useEffect } from "react";

import { axiosInstance } from "@/services/Axios/axiosClient";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loged, setLoged] = useState(false);
    const [register, setRegister] = useState(false);
    const [searched, setSearched] = useState('');

    useEffect(() => {
        axiosInstance.get('/usuario/@usuario')
            .then((res) => {
                const userWithPhoto = { ...res.data, foto: "https://dummyimage.com/460x460/000/fff.png&text=pf" };
                setUser(userWithPhoto);
                setLoged(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const login = async (usuario) => {
        let errorMsg = 'Error desconocido, intenta de nuevo';
        try {
            const res = await axiosInstance.post('/usuario/login-usuario', usuario);
            const userWithPhoto = { ...res.data, foto: "https://dummyimage.com/460x460/000/fff.png&text=pf" };
            setUser(userWithPhoto);
            setLoged(true);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err.response.status);
            if (err.response.status === 401) {
                console.log('Correo o contraseña incorrectos');
                errorMsg = 'Correo o contraseña incorrectos';
            } else if (err.response.status === 403) {
                errorMsg = 'Correo no verificado, por favor verifica tu correo';
            }
            return { error: errorMsg };
        }
    };

    const logout = () => {
        axiosInstance.post('/usuario/logout-usuario')
            .then((res) => {
                console.log(res);
                setUser(null);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const toggleRegister = () => {
        setRegister(!register);
    }

    const actualizarUsuario = async (usuarioActualizado) => {
        try {
            const res = await axiosInstance.patch('/usuario/actualizar-usuario', usuarioActualizado);
            setUser(prevUser => ({ ...prevUser, ...usuarioActualizado }));
            return res.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, register, toggleRegister, loged, actualizarUsuario, setSearched, searched }}>
            {children}
        </UserContext.Provider>
    )
}