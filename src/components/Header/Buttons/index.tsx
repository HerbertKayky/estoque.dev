"use client";

import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

interface ButtonsProps {
  session: any;
}

export function Buttons({ session }: ButtonsProps) {
  const { data: sessionData } = useSession();

  return (
    <div>
      {sessionData || session ? (
        <button
          className="bg-transparent border px-8 py-1 font-bold rounded-lg text-white hover:scale-105 hover:text-black hover:bg-white transition-all"
          onClick={() => signOut()}
        >
          Sair
        </button>
      ) : (
        <button
          className="bg-transparent border px-8 py-1 font-bold rounded-lg text-white hover:scale-105 hover:text-black hover:bg-white transition-all"
          onClick={() => signIn("google")}
        >
          Acessar
        </button>
      )}
    </div>
  );
}
