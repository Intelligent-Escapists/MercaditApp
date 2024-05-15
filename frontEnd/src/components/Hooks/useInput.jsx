import { useState } from "react";

export default function useInput(initialValue, { errorMsg, validator, isRadioButton = false }) {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState('');


    const handleChange = (e) => {
        const value = isRadioButton ? e : e.target.value;
        setValue(value)
        if (validator) {

            const isValid = validator(value);
            if (!isValid) {
                setError(errorMsg);
            } else {
                setError('');
            }
        }
    };

    return {
        value,
        setValue,
        onChange: handleChange,
        error,
        setError
    };
}