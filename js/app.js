import { buscarSalmos } from './api.js';

async function carregarSalmoDoDia() {
  const listaSalmos = await buscarSalmos();

  if (!listaSalmos || listaSalmos.length === 0) {
    document.getElementById("titulo").textContent = "Erro ao carregar";
    document.getElementById("texto").textContent = "Não foi possível carregar os salmos.";
    return;
  }

  // Lógica para selecionar o salmo rotativo com base no dia do ano
  const hoje = new Date();
  const inicioDoAno = new Date(hoje.getFullYear(), 0, 0);
  const diffTempo = hoje - inicioDoAno;
  const diaDoAno = Math.floor(diffTempo / (1000 * 60 * 60 * 24));

  const indice = diaDoAno % listaSalmos.length;
  const salmoObjeto = listaSalmos[indice].chapter;

  // Extrai o número do Salmo do @osisID (Ex: "Ps.23" -> "23")
  const numeroSalmo = salmoObjeto["@osisID"].replace("Ps.", "");
  const tituloFormatado = `Salmo ${numeroSalmo}`;

  // Processa os versículos para criar o texto completo
  let versiculos = salmoObjeto.verse;
  
  // Se for um salmo de versículo único, garante que trate como array
  if (!Array.isArray(versiculos)) {
    versiculos = [versiculos];
  }

  // Junta o texto de todos os versículos separados por quebras de linha
  const textoCompleto = versiculos
    .map(v => v["#text"].replace("¶ ", "")) // Remove o símbolo ¶ se preferir
    .join("\n\n");

  // Atualiza os elementos no HTML
  document.getElementById("titulo").textContent = tituloFormatado;
  
  // Usamos innerHTML com <p> para formatar os parágrafos bonitinhos
  const containerTexto = document.getElementById("texto");
  containerTexto.innerHTML = versiculos
    .map(v => `<p><sup>${v["@osisID"].split(".")[2]}</sup> ${v["#text"].replace("¶ ", "")}</p>`)
    .join("");
}

document.addEventListener("DOMContentLoaded", carregarSalmoDoDia);
