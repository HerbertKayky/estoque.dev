import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import prismaClient from "@/lib/prisma";

export default async function Estoque() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  const produtos = await prismaClient.produto.findMany();

  return (
    <div className="flex w-full max-w-5xl mx-auto">
      <h1 className="text-white text-xl">Todos os produtos:</h1>

      {produtos.map((produto) => (
        <div key={produto.id}>
          <h2>{produto.nome}</h2>
          <h2>{produto.preco}</h2>
        </div>
      ))}
    </div>
  );
}
