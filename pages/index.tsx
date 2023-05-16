import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

//esse código verifica se o usuário possui uma sessão ativa usando a função
//getSession. Se não houver uma sessão ativa, redireciona o usuário para a
//página de autenticação ("/auth"). Caso contrário,
//permite que a página seja renderizada normalmente.

export default function Home() {
  const { data: user } = useCurrentUser();
  return (
    <>
      <h1 className="text-4xl text-green-500 flex justify-center mt-10">
        Netflix On
      </h1>
      <p className="text-white">Esta logado com: {user?.email} </p>
      <button
        className="bg-blue-700 rounded-md w-full p-2"
        onClick={() => signOut()}
      >
        Logout!
      </button>
    </>
  );
}
