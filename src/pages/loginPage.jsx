export default function LoginPage() {
    return (
        <div className="w-full bg-red-900 h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full">

            </div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-xl rounded-2xl flex flex-col justify-center items-center">
                    <input
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="email"
                        placeholder="Email" 
                    />
                    <input
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="password"
                        placeholder="Password" 
                    />
                    <button className="w-[400px] h-[50px] bg-green-500 rounded-xl text-white cursor-pointer">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}