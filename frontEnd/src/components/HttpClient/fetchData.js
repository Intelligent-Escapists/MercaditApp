import httpClient from "./httpClient";
export default async function fetchData() {
    try {
        const resp = await httpClient.get("//localhost:5000/usuario/@usuario");

        return resp;
    } catch (error) {
        console.log(error);
    }
}