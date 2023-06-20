import Input from "@/components/input";
import React, { use, useCallback, useState } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Login: React.FC = () => {
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [variant, setVariant] = useState("Login");

  // const toggleVariant = useCallback((=> {

  // }), [])

  const login = useCallback(async () => {
    try {
      const result = await signIn<"credentials">("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      console.log(email, password, name);
      const user = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });
      console.log(user);
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, password, name, login]);

  return (
    <>
      <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-center bg-cover bg-no-repeat">
        <div className="bg-black md:bg-opacity-50 h-full w-full">
          <nav className="px-12 py-5">
            <img src="/images/logo.png" alt="Logo" className="h-12" />
          </nav>
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 md:w-3/5 md:max-w-md rounded-md w-full">
              <h2 className="text-white text-left text-2xl font-bold py-5">
                {variant === "Login" ? "Sign In" : "Create a new Account"}
              </h2>

              <div className="flex flex-col gap-4">
                {variant === "Signup" && (
                  <Input
                    label="User name"
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                )}

                <Input
                  label="Email"
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Input
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              {variant === "Login" ? (
                <button
                  onClick={login}
                  className="bg-red-600 text-white py-3 rounded-md w-full
                                                mt-10 hover:bg-red-700 transition"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={register}
                  className="bg-red-600 text-white py-3 rounded-md w-full
                                        mt-10 hover:bg-red-700 transition"
                >
                  Register
                </button>
              )}

              <p className="text-neutral-500 mt-12">
                {variant === "Login"
                  ? "First time using Netflix?"
                  : "Already have an account?"}
                <span
                  onClick={() =>
                    setVariant(() => (variant === "Login" ? "Signup" : "Login"))
                  }
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant === "Login" ? "Create a new account" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
