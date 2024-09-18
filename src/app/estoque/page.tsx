import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import prismaClient from "@/lib/prisma";
import { Buttons } from "@/components/buttons";
import Link from "next/link";

export default async function Estoque() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  const produtos = await prismaClient.produto.findMany({
    where: {
      userId: session.user.id,
    },
  });
  

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto mt-4">
      <div>
      <Link className=" ml-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition" href="/cadastro">
      Cadastrar produto +
      </Link>
      </div>
      
      <table className="w-full text-left table-auto mt-3">
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
              <Buttons produto={produto} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
