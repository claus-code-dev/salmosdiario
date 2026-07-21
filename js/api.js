export async function buscarSalmos() {
  try {
    // Busca o salmos.json na pasta data (voltando um nível /..)
    const resposta = await fetch('../data/salmos.json'); 
    
    // Se não achar local, tenta a URL pública como fallback
    if (!resposta.ok) {
      const respostaBackup = await fetch('https://claus-code-dev.github.io/salmos/salmos.json');
      return await respostaBackup.json();
    }

    return await resposta.json();
  } catch (erro) {
    console.error("Falha ao buscar os salmos:", erro);
    return null;
  }
}
