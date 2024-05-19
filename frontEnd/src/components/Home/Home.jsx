// import { Login } from "@/components/Forms/Login";
import { useState } from "react";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { axiosInstance } from "@/services/Axios/axiosClient";

export default function Home() {
    const [picture, setPicture] = useState(null);
    const [base64Picture, setBase64Picture] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log('submit');
        console.log(picture);
        axiosInstance.get(`producto/obtener-producto/${picture}`)
            .then((res) => {
                console.log(res.data);
                setBase64Picture(res.data["foto"]);
            })
            .catch((err) => { console.log(err) })
    }

    const changePicture = (e) => {
        const file = e.target.value;
        setPicture(file);
    }

    // const convertToBase64 = (file) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //         setBase64String(reader.result);
    //     };
    //     reader.onerror = (error) => {
    //         console.error('Error converting file to Base64', error);
    //     };
    // };

    return (
        <div className="flex justify-center items-center h-screen">

            <div className="grid w-full max-w-sm items-center gap-1.5">
                <form onSubmit={onSubmitHandler}>
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" type="text" onChange={changePicture} value={picture} />
                    <button type="submit">Submit</button>
                    {base64Picture && (
                        <div>
                            <p>Base64 String:</p>
                            <img src={base64Picture} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                        </div>
                    )}
                </form>
            </div>


        </div>


    );


}