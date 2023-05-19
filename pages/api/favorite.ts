import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { movieId } = req.body;
      const { currentUser } = await serverAuth(req, res);
      const existingMovie = await prismadb.movies.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Id Invalido");
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.query as { movieId: string };

      const existingMovie = await prismadb.movies.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Id Invalido");
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}

// O código é um manipulador de API que lida com solicitações POST e
// DELETE para adicionar ou remover filmes favoritos de um usuário autenticado.
// import { NextApiRequest, NextApiResponse } from "next"; - Importa os tipos NextApiRequest e NextApiResponse do pacote "next".
// Esses tipos são usados para definir os parâmetros da função do manipulador de API.

// import { without } from "lodash"; - Importa a função without do pacote "lodash". Essa função é usada para remover um elemento específico de um array.

// import prismadb from "@/libs/prismadb"; - Importa o cliente Prisma prismadb, que é usado para fazer consultas ao banco de dados.

// import serverAuth from "@/libs/serverAuth"; - Importa a função serverAuth do arquivo "@/libs/serverAuth". Essa função é usada para autenticação do servidor.

// export default async function handler(req: NextApiRequest, res: NextApiResponse)
// { - Define a função do manipulador de API como padrão, que recebe um objeto req do tipo NextApiRequest e um objeto res do tipo NextApiResponse.

// if (req.method === "POST") { - Verifica se o método da solicitação é POST.

// const { movieId } = req.body; - Extrai o movieId do corpo da solicitação.

// const { currentUser } = await serverAuth(req, res); - Autentica a solicitação do servidor usando a função serverAuth e extrai o usuário autenticado (currentUser).

// const existingMovie = await prismadb.movies.findUnique({ where: { id: movieId } }); - Verifica se o filme com o ID fornecido (movieId) existe no banco de dados.

// if (!existingMovie) { throw new Error("Id Invalido"); } - Se o filme não existir, lança um erro com a mensagem "Id Invalido".

// const user = await prismadb.user.update({ ... }); - Atualiza os dados do usuário no banco de dados para adicionar o movieId à lista de filmes favoritos do usuário.

// return res.status(200).json(user); - Retorna uma resposta com o status 200 (OK) e o objeto user como JSON.

// if (req.method === "DELETE") { - Verifica se o método da solicitação é DELETE.

// const { currentUser } = await serverAuth(req,res); - Autentica a solicitação do servidor usando a função serverAuth e extrai o usuário autenticado (currentUser).

// const { movieId } = req.query as { movieId: string }; - Extrai o movieId da consulta da solicitação.

// const existingMovie = await prismadb.movies.findUnique({ where: { id: movieId } }); - Verifica se o filme com o ID fornecido (movieId) existe no banco de dados.

// if (!existingMovie) { throw new Error("Id Invalido"); } - Se o filme não existir, lança um erro com a mensagem "Id Invalido".

// const updatedFavoriteIds = without(currentUser.favoriteIds, movieId); - Remove o movieId
