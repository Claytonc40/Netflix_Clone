import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const { movieId } = req.query;

    if (typeof movieId !== "string") {
      throw new Error("id Invalido");
    }

    if (!movieId) {
      throw new Error("Id não encontrado");
    }

    const movies = await prismadb.movies.findUnique({
      where: {
        id: movieId,
      },
    });

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}


// O código implementa um manipulador de API (API handler) para uma rota que recebe uma 
// solicitação GET para buscar detalhes de um filme com base em um ID fornecido na consulta.

// import { NextApiRequest, NextApiResponse } from "next";: Importa os tipos NextApiRequest e NextApiResponse do pacote "next". 
// Esses tipos são usados para definir os parâmetros da função do manipulador de API.

// import prismadb from "@/libs/prismadb";: Importa o cliente Prisma prismadb, que é usado para fazer consultas ao banco de dados.

// import serverAuth from "@/libs/serverAuth";: Importa a função serverAuth do arquivo "@/libs/serverAuth". 
// Essa função é usada para autenticação do servidor.

// export default async function handler(req: NextApiRequest, res: NextApiResponse) 
// {: Define a função do manipulador de API como padrão, que recebe um objeto req do tipo NextApiRequest e um objeto res do tipo NextApiResponse.

// if (req.method !== "GET") { return res.status(405).end(); }: Verifica se o método da solicitação não é "GET". 
// Se não for, retorna uma resposta com o status 405 (Método Não Permitido).

// await serverAuth(req, res);: Chama a função serverAuth para autenticar a solicitação do servidor. 
// Essa função provavelmente verifica se o usuário está autenticado antes de prosseguir com a solicitação.

// const { movieId } = req.query;: Extrai o parâmetro movieId da consulta da solicitação.

// if (typeof movieId !== "string") { throw new Error("id Invalido"); }: Verifica se o tipo de movieId não é uma string. 
// Se não for, lança um erro com a mensagem "id Invalido".

// if (!movieId) { throw new Error("Id não encontrado"); }: Verifica se movieId está vazio. Se estiver, lança um erro com a mensagem "Id não encontrado".

// const movies = await prismadb.movies.findUnique({ where: { id: movieId } });: 
// Faz uma consulta ao banco de dados usando o Prisma Client (prismadb) para buscar um filme único com base no id fornecido.

// return res.status(200).json(movies);: Retorna uma resposta com o status 200 (OK) e os detalhes do filme em formato JSON.

// catch (error) { console.log(error); return res.status(500).end(); }: 
// Captura qualquer erro que ocorrer durante o processamento do código, 
// registra o erro no console e retorna uma resposta com o status 500 (Erro Interno do Servidor).