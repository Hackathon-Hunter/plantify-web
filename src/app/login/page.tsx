'use client';

import { BasicButton } from "@/components/Button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with", { email, password });
  };

  return (
    <div className="flex h-screen bg-landing-bg bg-cover bg-center">
      {/* Left Side: Image */}
      <div className="relative w-1/2 bg-gray-200">
        <img
          src="/img/bg-login.png" // Ensure this path is correct and the image exists
          alt="Login Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center text-blue-primary text-1xl font-normal p-52">
          Access your MetaFarm account to seamlessly invest in real-world farming projects through NFTs. Manage your
          investments, track harvests, and enjoy the benefits of transparent and profitable agriculture.
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-lg p-8">
          <h2 className="text-4xl font-semi-bold text-gray-700 mb-2">Welcome</h2>
          <h2 className="text-2sm text-gray-700 mb-12">Login to continue</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-black"
              />
            </div>

            <div>
              <BasicButton
                onclick={() => router.push("/")}
                title="Login"
                fullWidth={true} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;