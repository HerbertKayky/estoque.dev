"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  async function handleRegisterProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = {
      nome: e.currentTarget.nome.value,
      descricao: e.currentTarget.descricao.value,
      preco: Number(e.currentTarget.preco.value),
      quantidade: Number(e.currentTarget.quantidade.value),
      categoria: e.currentTarget.categoria.value,
    };

    try {
      await api.post("/api/product", formData);
      setIsModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <button
        className="bg-blue-600 text-white font-medium rounded-md px-4 py-2"
        onClick={() => setIsModalOpen(true)}
      >
        Cadastrar produto Modal
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-black">
              Cadastrar Produto
            </h2>

            <form onSubmit={handleRegisterProduct}>
              <div className="mb-4">
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nome do produto
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Nome do produto"
                  className="w-full p-2 border rounded text-gray-700 bg-white"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="preco"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Preço
                </label>
                <input
                  type="number"
                  id="preco"
                  name="preco"
                  step="0.01"
                  placeholder="Preço"
                  className="w-full p-2 border rounded text-gray-700 bg-white"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="descricao"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Descrição
                </label>
                <input
                  type="text"
                  id="descricao"
                  name="descricao"
                  placeholder="Descrição"
                  className="w-full p-2 border rounded text-gray-700 bg-white"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="quantidade"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantidade
                </label>
                <input
                  type="number"
                  id="quantidade"
                  name="quantidade"
                  placeholder="Quantidade"
                  className="w-full p-2 border rounded text-gray-700 bg-white"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="categoria"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Categoria
                </label>
                <input
                  type="text"
                  id="categoria"
                  name="categoria"
                  placeholder="Categoria"
                  className="w-full p-2 border rounded text-gray-700 bg-white"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

