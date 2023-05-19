import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useMovie = (id?: string) => {
  const { data, error, isLoading } = useSwr(id ? `/api/movies/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useMovie;


// O código implementa um hook personalizado chamado useMovie usando a biblioteca SWR. 
// O SWR é uma biblioteca de gerenciamento de estado de dados que simplifica o carregamento, 
// cache e sincronização de dados em aplicativos React.

// import useSwr from 'swr': Importa o hook useSwr da biblioteca SWR. Esse hook será usado para buscar e gerenciar o estado dos dados.

// import fetcher from '@/libs/fetcher': Importa o fetcher da biblioteca @/libs/fetcher. O fetcher é uma função personalizada que será usada para buscar os dados da API.

// const useMovie = (id?: string) => {: Define o hook personalizado useMovie com um parâmetro opcional id do tipo string.

// const { data, error, isLoading } = useSwr(...);: Utiliza o hook useSwr para buscar e gerenciar o estado dos dados. 
// O primeiro argumento é uma URL ou uma chave de cache. No caso, é utilizado /api/movies/${id} para buscar os detalhes de um filme específico, 
// onde id é o parâmetro opcional passado para o hook. O segundo argumento é o fetcher, que é responsável por fazer a requisição e retornar os dados. 
// O restante do código configura opções adicionais para o SWR.

// return { data, error, isLoading }: Retorna um objeto contendo data, error e isLoading. data contém os dados retornados pela requisição, 
// error contém qualquer erro ocorrido durante a requisição e isLoading indica se a requisição está em andamento.

// export default useMovie;: Exporta o hook useMovie como padrão para que possa ser importado e utilizado em outros módulos.