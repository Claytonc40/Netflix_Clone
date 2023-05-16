import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from '@/components/Navbar';

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
     <Navbar />
    </>
  );
}
