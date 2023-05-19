import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from '@/components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';

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
  const { data: favorites = [] } = useFavorites();
  const { data: movies = [] } = useMovieList();
  const {isOpen, closeModal } = useInfoModal();
  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal} />
     <Navbar />
     <Billboard />
     <div className='pb-40'>
      <MovieList data={movies} title='Tendência agora' />
      <MovieList title="Minha Lista" data={favorites} />
     </div>
    </>
  );
}
