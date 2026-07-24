"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center mb-2">
          JET Sports
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Admin Login
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 text-white mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 text-white mb-6 outline-none"
        />

        <button
          onClick={signIn}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

      </div>

    </main>
  );
}