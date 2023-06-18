import Input from "@/components/input";
import React, { useState } from "react";

const Login: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [variant, setVariant] = useState("Login");

    // const toggleVariant = useCallback((=> {

    // }), [])

    return (
        <>
            <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-center bg-cover bg-no-repeat">
                <div className="bg-black md:bg-opacity-50 h-full w-full">
                    <nav className="px-12 py-5">
                        <img src="/images/logo.png" alt="Logo" className="h-12" />
                    </nav>
                    <div className="flex justify-center">
                        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 md:w-3/5 md:max-w-md rounded-md w-full">
                            <h2 className="text-white text-left text-2xl font-bold py-5">{variant === 'Login'? "Sign In": "Create a new Account" }</h2>

                            <div className="flex flex-col gap-4">
                            {variant === 'Signup'&& <Input label="User name" type="text" id="name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name} />}
                                
                                
                                <Input label="Email" type="email" id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email} />
                                <Input label="Password" type="password" id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password} />
                            </div>
                            <button className="bg-red-600 text-white py-3 rounded-md w-full
                                                mt-10 hover:bg-red-700 transition">Login</button>
                            <p className="text-neutral-500 mt-12">
                            {variant === 'Login'? "First time using Netflix?": "Already have an account?" }
                                <span onClick={() => setVariant(()=> variant === "Login" ? "Signup" : "Login")} className="text-white ml-1 hover:underline cursor-pointer">
                                   {variant === 'Login'? "Create a new account": "Login" } 
                                </span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;