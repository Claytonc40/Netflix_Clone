import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default fetcher;

// Esse código implementa um fetcher utilizando a biblioteca Axios em um ambiente JavaScript ou TypeScript.
// O fetcher é uma função que recebe uma URL como argumento e usa o Axios para fazer uma solicitação GET para essa URL.
// Quando a resposta é recebida do servidor, o código usa a função .then() para acessar os dados da resposta (res.data) e retorna esses dados como resultado do fetcher.
