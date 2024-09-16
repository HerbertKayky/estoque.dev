import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import prismaClient from "@/lib/prisma";

export default async function Estoque() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  const produtos = await prismaClient.produto.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="flex w-full max-w-5xl mx-auto">
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-white">Nome</th>
            <th className="px-4 py-2 text-white">Preço</th>
            <th className="px-4 py-2 text-white">Quantidade</th>
            <th className="px-4 py-2 text-white">Criado em</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id} className="border-t border-gray-600">
              <td className="px-4 py-2 text-white">{produto.nome}</td>
              <td className="px-4 py-2 text-white">
                R$ {produto.preco.toFixed(2)}
              </td>
              <td className="px-4 py-2 text-white">{produto.quantidade}</td>
              <td className="px-4 py-2 text-white">
                {new Date(produto.createdAt).toLocaleDateString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
