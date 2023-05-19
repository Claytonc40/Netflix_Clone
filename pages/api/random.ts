import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    await serverAuth(req, res);

    const moviesCount = await prismadb.movies.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await prismadb.movies.findMany({
      take: 1,
      skip: randomIndex,
    });

    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}

// Este código define um handler para uma rota em uma API Next.js. 
// A rota só aceita requisições do tipo GET.

// Importa os módulos NextApiRequest e NextApiResponse do pacote next.
// Importa o módulo prismadb de "@/libs/prismadb", que provavelmente 
// é uma biblioteca ou um arquivo personalizado contendo funcionalidades 
// relacionadas ao banco de dados.
// Importa a função serverAuth de "@/libs/serverAuth", que provavelmente é uma 
// função personalizada responsável pela autenticação do usuário.
// Define a função handler como uma função assíncrona que recebe os objetos req 
// (objeto de requisição) e res (objeto de resposta) como parâmetros.
// Verifica se o método da requisição é diferente de GET. Se for, retorna uma 
// resposta com o status 405 (Método não permitido) e encerra a execução da função.
// Chama a função serverAuth passando o objeto req como argumento. Essa função 
// provavelmente realiza algum tipo de autenticação do usuário com base na requisição.
// Obtém a contagem total de filmes no banco de dados, usando a função count() 
// do objeto movies do prismadb.
// Gera um índice aleatório entre 0 e o número total de filmes.
// Obtém um único filme aleatório do banco de dados, usando a função findMany() 
// do objeto movies do prismadb, com as opções take: 1 (pega apenas um filme) e skip: 
// randomIndex (pula o número de filmes especificado pelo índice aleatório).
// Retorna uma resposta com o status 200 (Sucesso) e envia o filme aleatório como JSON na resposta.
// Se ocorrer algum erro durante o processo, o erro é registrado no console e uma resposta 
// com o status 500 (Erro interno do servidor) é retornada.