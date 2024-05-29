import Login from "@/components/Forms/Login";

export default function HomePanel() {

    return (

        <div className="flex items-center justify-between w-full">
            <section className=" h-full w-3/5 flex justify-center items-center">
                <img src="src/assets/Shopping.png" alt="Login-image" className=" w-[500px] h-[500px]" />
            </section>
            <aside className=" h-full w-2/5 flex items-center">
                <Login />
            </aside>
        </div>
    );
}