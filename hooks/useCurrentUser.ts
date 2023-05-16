import useSwr from "swr";

import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/current", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;

// Este código define uma função userCurrentUser que utiliza a biblioteca SWR (Stale-While-Revalidate)
// para buscar dados do usuário atual a partir da API /api/current usando a função fetcher como argumento.

// O SWR é uma biblioteca de gerenciamento de estado que permite buscar dados de maneira otimizada,
// cacheando os dados em memória e revalidando-os em um intervalo de tempo configurável.
// A função userCurrentUser retorna um objeto com as propriedades data, error, isLoading e mutate.

// data contém os dados do usuário atual retornados pela API ou undefined se os dados ainda não foram carregados.
// error contém um objeto de erro caso ocorra algum problema ao buscar os dados.
// isLoading é uma flag booleana que indica se os dados estão sendo carregados ou não.
// mutate é uma função que permite atualizar os dados em cache do SWR de forma imperativa.
