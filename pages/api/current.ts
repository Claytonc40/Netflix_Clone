import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req);

    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

// Esse código implementa um manipulador de API (API handler) no contexto do Next.js.

// As linhas import { NextApiRequest, NextApiResponse } from "next"; e import serverAuth from "@/libs/serverAuth"; 
// importam os tipos NextApiRequest e NextApiResponse do pacote next e a função serverAuth do módulo @/libs/serverAuth, respectivamente.

// A função handler é definida como uma função assíncrona que recebe um objeto req do tipo NextApiRequest e um objeto res do tipo NextApiResponse.
//  Essa função representa o manipulador da API.

// Dentro da função handler, é feita uma verificação condicional if (req.method !== "GET") para verificar se o método da requisição não é "GET".
//  Se não for um método "GET", a função retorna uma resposta com status 405 (Método não permitido) usando res.status(405).end().
//   Isso indica que apenas requisições GET são permitidas para essa API.

// Se o método da requisição for "GET", a função continua executando o código dentro do bloco try.

// Dentro do bloco try, a função serverAuth é chamada passando o objeto req como argumento. Essa função é responsável por autenticar o usuário no lado do servidor,
//  conforme definido no código anterior.

// O resultado retornado pela função serverAuth é desestruturado para obter o valor currentUser.

// Em seguida, é retornada uma resposta com status 200 (OK) e o objeto currentUser é convertido em JSON usando res.status(200).json(currentUser).
//  Isso retorna o usuário autenticado como resposta da API.

// Se ocorrer algum erro durante a autenticação ou ao obter o usuário autenticado, a exceção é capturada pelo bloco catch.
//  O erro é registrado no console usando console.log(error) e uma resposta com status 400 (Solicitação inválida) é retornada usando res.status(400).end().

// A linha export default async function handler(...) exporta a função handler como padrão, permitindo que ela seja importada e usada em outros módulos.