import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import prismadb from "@/libs/prismadb";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "passord",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("E necessário e-mail e senha ");
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("E-mail não existe");
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Senha Incorreta");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// Esse código configura e exporta a instância do servidor NextAuth, definindo as opções de autenticação e provedores de autenticação disponíveis.

// As linhas import NextAuth, { AuthOptions } from "next-auth";, import GithubProvider from "next-auth/providers/github";,
// import GoogleProvider from "next-auth/providers/google";, import Credentials from "next-auth/providers/credentials";,
// import { PrismaAdapter } from "@next-auth/prisma-adapter";, import { compare } from "bcrypt";, import prismadb from "@/libs/prismadb";
// importam as dependências necessárias para configurar o NextAuth e os provedores de autenticação.

// A função NextAuth é chamada passando um objeto de opções como argumento. Esse objeto de opções define os provedores de autenticação,
// as páginas personalizadas, o modo de depuração, o adaptador para o Prisma, a estratégia de sessão, a configuração JWT e a chave secreta.

// O objeto providers contém uma lista de provedores de autenticação disponíveis. Neste caso, estão configurados os provedores GithubProvider,
// GoogleProvider e Credentials. O GithubProvider e GoogleProvider são provedores de autenticação externos que podem ser usados para autenticar os
// usuários usando contas do GitHub e Google, respectivamente. O Credentials é um provedor de autenticação personalizado que permite a autenticação
// usando um formulário de login com e-mail e senha.

// Cada provedor de autenticação é configurado com as respectivas credenciais, como ID do cliente e segredo do cliente, que são obtidos de variáveis de ambiente.

// O provedor Credentials também define uma função authorize que é executada durante o processo de autenticação com credenciais.
// Nessa função, as credenciais (e-mail e senha) fornecidas pelo usuário são verificadas em relação aos dados armazenados no banco de dados.
// Se as credenciais forem válidas, o usuário correspondente é retornado.

// O objeto pages define as páginas personalizadas para o fluxo de autenticação. Neste caso, a página signIn é definida como "/auth",
// o que significa que a página de login personalizada está localizada em "/auth".

// O objeto debug é definido como true quando o ambiente de execução é de desenvolvimento, permitindo mensagens de depuração adicionais.
// Em ambiente de produção, o debug é desativado.

// O objeto adapter é configurado com PrismaAdapter(prismadb), que conecta o Prisma como adaptador para o armazenamento das sessões de autenticação.

// O objeto session define a estratégia de sessão como "jwt", o que significa que o token JWT é usado para armazenar as informações da sessão.

// O objeto jwt define a configuração do JWT, como a chave secreta que é usada para assinar e verificar os tokens JWT. A chave secreta é obtida de uma variável de ambiente.

// O objeto secret define a chave secreta para o NextAuth, que é usada para proteger os cookies de sessão.

// Por fim, a instância do servidor NextAuth é exportada como padrão.
