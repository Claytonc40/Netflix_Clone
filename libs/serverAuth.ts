import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prismadb from '@/libs/prismadb';
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error('não esta logado');
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    }
  });
  
  if (!currentUser) {
    throw new Error('não esta logado');
  }

  return { currentUser };
}

export default serverAuth;

// Esse código implementa uma função serverAuth que lida com a autenticação do lado do servidor em uma API Next.js usando o pacote next-auth.

// A linha import { NextApiRequest } from "next"; importa o tipo NextApiRequest do pacote next, que representa uma solicitação HTTP recebida pelo servidor Next.js.

// A linha import { getSession } from "next-auth/react"; importa a função getSession do pacote next-auth/react, que é usada para obter a sessão do usuário autenticado.

// A linha import prismadb from "@/libs/prismadb"; importa o cliente Prisma prismadb, que é usado para fazer consultas ao banco de dados.

// A função serverAuth é definida como uma função assíncrona que recebe um objeto req do tipo NextApiRequest. Essa função lida com a autenticação do usuário no lado do servidor.

// Dentro da função serverAuth, a primeira coisa que acontece é chamar getSession({ req }) para obter a sessão do usuário atual com base na requisição recebida.

// Em seguida, é verificado se a sessão existe e se o campo email do usuário está presente. Caso contrário, uma exceção é lançada com a mensagem "não está logado".

// Se a sessão existe e o campo email está presente, é feita uma consulta ao banco de dados usando o Prisma Client (prismadb).
//  É procurado um usuário único com base no endereço de e-mail obtido da sessão.

// Se não for encontrado um usuário com o e-mail fornecido, outra exceção é lançada com a mensagem "não está logado".

// Por fim, se o usuário for encontrado, ele é retornado como resultado da função.

// A linha export default serverAuth; exporta a função serverAuth como padrão para que ela possa ser importada e usada em outros módulos.
