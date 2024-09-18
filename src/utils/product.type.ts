export interface ProdutoProps {
  produto: {
    id: string;
    nome: string;
    preco: number;
    descricao: string | null;
    quantidade: number;
    categoria: string | null;
    createdAt: Date;
  };
}
