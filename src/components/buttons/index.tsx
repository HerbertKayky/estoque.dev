"use client";

import { api } from "@/lib/api";
import { ProdutoProps } from "@/utils/product.type";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Buttons({ produto }: ProdutoProps) {
  const router = useRouter();

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, seteditFormData] = useState({
    nome: produto.nome,
    descricao: produto.descricao,
    preco: produto.preco,
    quantidade: produto.quantidade,
    categoria: produto.categoria,
  });

  async function handleEditProduct() {
    try {
      await api.put(`/api/product?id=${produto.id}`, {
        nome: editFormData.nome,
        descricao: editFormData.descricao,
        preco: editFormData.preco,
        quantidade: editFormData.quantidade,
        categoria: editFormData.categoria,
      });

      setIsModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const newValue =
      name === "preco" || name === "quantidade" ? Number(value) : value;
    seteditFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  }

  async function handleDeleteProduct() {
    try {
      await api.delete("/api/product", {
        params: {
          id: produto.id,
        },
      });
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsConfirmDeleteOpen(false);
    }
  }

  return (
    <>
      <tr className="flex items-center justify-center gap-3 mt-1">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white font-medium bg-blue-600 p-1 rounded-md"
        >
          Editar
        </button>
        <button
          onClick={() => setIsConfirmDeleteOpen(true)}
          className="text-white font-medium bg-red-600 p-1 rounded-md"
        >
          Excluir
        </button>
      </tr>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Editar Produto</h2>

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
                value={editFormData.nome}
                onChange={handleChange}
                placeholder="Nome do produto"
                className="w-full p-2 border rounded"
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
                value={editFormData.preco}
                onChange={handleChange}
                placeholder="Preço"
                className="w-full p-2 border rounded"
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
                value={editFormData.descricao || ""}
                onChange={handleChange}
                placeholder="Descrição"
                className="w-full p-2 border rounded"
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
                value={editFormData.quantidade}
                onChange={handleChange}
                placeholder="Quantidade"
                className="w-full p-2 border rounded"
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
                value={editFormData.categoria || ""}
                onChange={handleChange}
                placeholder="Categoria"
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleEditProduct}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Salvar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Confirmar Exclusão</h2>
            <p className="mb-4">
              Você tem certeza que deseja excluir este produto?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleDeleteProduct}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Excluir
              </button>
              <button
                onClick={() => setIsConfirmDeleteOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
