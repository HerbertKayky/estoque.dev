import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import prismaClient from "@/lib/prisma";

export default async function Cadastro() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  async function handleRegisterProduct(formData: FormData) {
    "use server";

    const nome = formData.get("nome");
    const descricao = formData.get("descricao");
    const preco = formData.get("preco");
    const quantidade = formData.get("quantidade");
    const categoria = formData.get("categoria");

    const precoNumber = parseFloat(preco as string);
    const quantidadeNumber = parseInt(quantidade as string);

    if (!nome || !preco || !quantidade) {
      return;
    }

    if (!session?.user.id) {
      return { error: "Usuário não autenticado" };
    }

    await prismaClient.produto.create({
      data: {
        nome: nome as string,
        descricao: descricao as string,
        preco: precoNumber,
        quantidade: quantidadeNumber,
        categoria: categoria as string,
        userId: session?.user.id,
      },
    });
    redirect("/estoque");
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-2">
      <form className="flex flex-col mt-6" action={handleRegisterProduct}>
        <label className="mb-1 font-medium text-lg">Nome do produto</label>
        <input
          className="w-full border-2 rounded-md px-2 mb-2 h-11"
          type="text"
          placeholder="Digite o nome do produto"
          required
          name="nome"
        />

        <label className="mb-1 font-medium text-lg">Descrição do produto</label>
        <input
          className="w-full border-2 rounded-md px-2 mb-2 h-11"
          type="text"
          placeholder="Descrição do produto (opcional)"
          name="descricao"
        />

        <label className="mb-1 font-medium text-lg">Preço do produto</label>
        <input
          className="w-full border-2 rounded-md px-2 mb-2 h-11"
          type="number"
          placeholder="Digite o preço do produto"
          required
          name="preco"
          step="0.01"
        />

        <label className="mb-1 font-medium text-lg">Quantidade</label>
        <input
          className="w-full border-2 rounded-md px-2 mb-2 h-11"
          type="number"
          placeholder="Digite a quantidade disponível"
          required
          name="quantidade"
        />

        <label className="mb-1 font-medium text-lg">Categoria</label>
        <input
          className="w-full border-2 rounded-md px-2 mb-2 h-11"
          type="text"
          placeholder="Digite a categoria do produto"
          name="categoria"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Cadastrar Produto
        </button>
      </form>
    </main>
  );
}
