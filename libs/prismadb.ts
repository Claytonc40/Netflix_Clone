import { PrismaClient } from "@prisma/client";

const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === "production") {
  global.prismadb = client;
}

export default client;

// Esse código implementa a criação de um cliente Prisma utilizando o Prisma Client.

// A linha import { PrismaClient } from "@prisma/client"; importa o PrismaClient do pacote @prisma/client.

// Em seguida, a variável client é definida como global.prismadb ou como uma nova instância do PrismaClient.
// Isso permite que o cliente Prisma seja compartilhado globalmente entre módulos, evitando a criação de várias instâncias.

// A condição if (process.env.NODE_ENV === "production") verifica se o ambiente de execução é de produção.
// Se for, a variável global global.prismadb é atribuída ao cliente Prisma, caso contrário, é criada uma nova instância do PrismaClient.

// Por fim, a linha export default client; exporta o cliente Prisma como o padrão para ser importado em outros módulos.
