import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Buttons } from "./Buttons";
import { ThemeButton } from "./ThemeButton";

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="w-full flex h-16 justify-center items-center bg-stone-400">
      <section className="w-full max-w-5xl flex p-5 justify-between items-center">
        <nav className="flex items-center">
          <Link href="/" className="text-2xl font-medium items-center flex">
            <h1 className="text-3xl font-medium">
              Controle<span className="text-orange-600">+</span>
            </h1>
          </Link>
          {session?.user && (
            <Link
              href="/estoque"
              className="py-1 px-2 ml-3 rounded bg-slate-100 font-medium"
            >
              Meu estoque
            </Link>
          )}
        </nav>

        <ThemeButton />

        <Buttons session={session} />
      </section>
    </header>
  );
}
