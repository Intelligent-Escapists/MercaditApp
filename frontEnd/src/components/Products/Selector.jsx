/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zIWKpoOyxdf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import PlusIcon from "../Icons/PlusIcon"
import MinusIcon from "../Icons/MinusIcon"
import { useState } from "react"

export default function Selector() {
    const [number, setNumber] = useState(1);

    const handleIncrement = () => {

        setNumber((prev) => prev + 1);
    }
    const handleDecrement = () => {
        if (number === 1) return;
        setNumber((prev) => prev - 1);
    }

    return (
        <div className="flex items-center gap-2">
            <Button className="px-2 py-1 rounded-l-md" variant="outline" onClick={handleDecrement} type="button">
                <MinusIcon className="w-4 h-4" />
            </Button>
            <div className="bg-gray-100 px-4 py-2 rounded-md font-medium dark:bg-gray-800 dark:text-gray-50">{number}</div>
            <Button className="px-2 py-1 rounded-r-md" variant="outline" onClick={handleIncrement} type="button">
                <PlusIcon className="w-4 h-4" />
            </Button>
        </div>
    )
}