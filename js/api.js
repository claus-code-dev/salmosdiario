const BASE_URL = "https://claus-code-dev.github.io/salmos";

export async function buscarSalmos() {
  try {
    const resposta = await fetch(`${BASE_URL}/salmos.json`);
    if (!resposta.ok) {
      throw new Error(`Erro na rede: status ${resposta.status}`);
    }
    return await resposta.json();
  } catch (erro) {
    console.error("Falha ao buscar o arquivo JSON:", erro);
    return null;
  }
}
