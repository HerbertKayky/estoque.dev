import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prismaClient = new PrismaClient();

export async function POST(request: Request) {
  const { nome, descricao, preco, quantidade, categoria } =
    await request.json();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  try {
    await prismaClient.produto.create({
      data: {
        nome,
        descricao,
        preco,
        quantidade,
        categoria,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ message: "Produto cadastrado com sucesso" });
  } catch (err) {
    console.log("Erro no servidor", err);
    return NextResponse.json(
      { error: "Falha ao criar produto" },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nome = searchParams.get("nome");

  try {
    if (nome) {
      const produtos = await prismaClient.produto.findMany({
        where: {
          nome: {
            contains: nome,
            mode: "insensitive",
          },
        },
      });
      return NextResponse.json(produtos);
    }
    const produtos = await prismaClient.produto.findMany();
    return NextResponse.json(produtos);
  } catch (err) {
    console.log("Erro no servidor", err);
    return NextResponse.json(
      { error: "Falha ao buscar produtos" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const produtoId = searchParams.get("id");

  const { nome, descricao, preco, quantidade, categoria } =
    await request.json();

  try {
    await prismaClient.produto.update({
      where: {
        id: produtoId as string,
      },
      data: {
        nome,
        descricao,
        preco,
        quantidade,
        categoria,
      },
    });

    return NextResponse.json({
      message: "Produto editado com sucesso",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Falha ao atualizar o produto" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const produtoId = searchParams.get("id");

  try {
    await prismaClient.produto.delete({
      where: {
        id: produtoId as string,
      },
    });

    return NextResponse.json({ message: "Produto deletado com sucesso" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Falha ao deletar o produto" },
      { status: 400 }
    );
  }
}
