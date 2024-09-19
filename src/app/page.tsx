import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import heroImg from "/public/hero.png";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full flex flex-col items-center justify-center h-[calc(100vh-64px)]">
      <main>
        <div>
          <Image
            className="object-contain max-w-xl w-auto h-auto"
            src={heroImg}
            alt="Foto ilustrativa"
            quality={100}
            priority={true}
          />
        </div>
        <h1 className="font-bold text-2xl sm:text-3xl text-center mt-8 leading-10">
          Sistema feito para você organizar
          <br /> seu estoque
        </h1>
        <div className="flex justify-center mt-6">
          {session ? (
            <Link
              href="/estoque"
              className="
              text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
              font-bold rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700
              focus:outline-none dark:focus:ring-blue-800"
            >
              Veja seu estoque
            </Link>
          ) : (
            <h1 className="text-white text-xl">
              Cadastre-se para criar um estoque online
            </h1>
          )}
        </div>
      </main>
    </div>
  );
}
