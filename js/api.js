const BASE_URL = "https://claus-code-dev.github.io/salmos";

export async function buscarSalmos() {
  try {
    const resposta = await fetch(`${BASE_URL}/salmos.json`);
    if (!resposta.ok) throw new Error(`Erro: ${resposta.status}`);
    
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Erro ao carregar o arquivo de salmos:", erro);
    return null;
  }
}
