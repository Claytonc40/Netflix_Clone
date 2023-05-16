import bcrypt from "bcrypt";
import prismadb from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { email, name, password } = req.body;

    const exitingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (exitingUser) {
      return res.status(422).json({ error: "E-mail já está cadastrado!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}


// Esse código implementa um manipulador de API (API handler) no contexto do Next.js para criar um novo usuário.

// A linha import bcrypt from "bcrypt"; importa o módulo bcrypt, que é usado para realizar o hash da senha do usuário.

// A linha import prismadb from "@/lib/prismadb"; importa o cliente Prisma prismadb, que é usado para fazer consultas ao banco de dados.

// A função handler é definida como uma função assíncrona que recebe um objeto req do tipo NextApiRequest e um objeto res do tipo NextApiResponse.
//  Essa função representa o manipulador da API.

// Dentro da função handler, é feita uma verificação condicional if (req.method !== "POST") para verificar se o método da requisição não é "POST".
//  Se não for um método "POST", a função retorna uma resposta com status 405 (Método não permitido) usando res.status(405).end().
//   Isso indica que apenas requisições POST são permitidas para essa API.

// Se o método da requisição for "POST", a função continua executando o código dentro do bloco try.

// Dentro do bloco try, o corpo da requisição (req.body) é desestruturado para obter os valores de email, name e password do novo usuário.

// É feita uma consulta ao banco de dados usando o Prisma Client (prismadb.user.findUnique) para verificar se já existe um usuário com o mesmo endereço de e-mail (email).

// Se um usuário já existir com o mesmo endereço de e-mail, uma resposta com status 422 (Entidade não processável) é retornada, indicando que o e-mail já está cadastrado.

// Se nenhum usuário existir com o mesmo endereço de e-mail, a senha é hasheada usando a função bcrypt.hash com um fator de custo de 12 (12 rounds de hash).

// Em seguida, é criado um novo usuário no banco de dados usando o Prisma Client (prismadb.user.create).
//  O objeto data contém os campos email, name, hashedPassword, image (vazio) e emailVerified (data atual).

// Por fim, é retornada uma resposta com status 200 (OK) e o novo usuário criado é retornado como resposta da API.

// Se ocorrer algum erro durante o processo de criação do usuário,
//  a exceção é capturada pelo bloco catch. O erro é registrado no console usando console.log(error)
//   e uma resposta com status 400 (Solicitação inválida) é retornada usando res.status(400).end().

// A linha export default async function handler(...) exporta a função handler como padrão, permitindo que ela seja importada e usada em outros módulos.