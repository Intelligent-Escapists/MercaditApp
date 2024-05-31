/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HvO4ZPwbzhF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "@/providers/UserProvider"

export default function BarraBusqueda() {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const { setSearched, searched } = useContext(UserContext)

    const searchOnChange = (e) => {
        setSearch(e.target.value)
    }

    const performSearch = () => {
        // Aquí puedes realizar la acción deseada, como redirigir a una página de resultados de búsqueda
        if (search.trim() === "") return
        console.log('Buscando:', search);
        navigate(`busqueda/${search}`)
        setSearch("")
        setSearched(!searched)
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    };

    return (
        <div className="flex items-center justify-center gap-4  rounded-lg px-4 py-2 shadow-sm">
            <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                <Input
                    type="search"
                    placeholder="Buscar producto..."
                    value={search}
                    onKeyDown={handleKeyDown}
                    onChange={searchOnChange}
                    className="pl-10 pr-12 rounded-md focus:ring-2 focus:ring-gray-900 focus:outline-none dark:focus:ring-gray-50 dark:bg-gray-900 dark:text-gray-50"
                />

            </div>

        </div>
    )
}

function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}


