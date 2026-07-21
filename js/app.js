import { buscarSalmos } from './api.js';

async function carregarSalmoDoDia() {
  const elTitulo = document.getElementById("titulo");
  const elTexto = document.getElementById("texto");
  const elData = document.getElementById("data-atual");

  // Formata a data atual em português
  const hoje = new Date();
  if (elData) {
    const opcoesData = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    let dataFormatada = hoje.toLocaleDateString('pt-BR', opcoesData);
    // Capitaliza a primeira letra do dia da semana
    dataFormatada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
    elData.textContent = dataFormatada;
  }

  try {
    const listaSalmos = await buscarSalmos();

    if (!listaSalmos || listaSalmos.length === 0) {
      if (elTitulo) elTitulo.textContent = "Erro";
      if (elTexto) elTexto.textContent = "Não foi possível carregar os salmos.";
      return;
    }

    const inicioDoAno = new Date(hoje.getFullYear(), 0, 0);
    const diffTempo = hoje - inicioDoAno;
    const diaDoAno = Math.floor(diffTempo / (1000 * 60 * 60 * 24));

    const indice = diaDoAno % listaSalmos.length;
    const salmoObjeto = listaSalmos[indice].chapter;

    const numeroSalmo = salmoObjeto["@osisID"].replace("Ps.", "");
    if (elTitulo) {
      elTitulo.textContent = `Salmo ${numeroSalmo}`;
    }

    let versiculos = salmoObjeto.verse;
    if (!Array.isArray(versiculos)) {
      versiculos = [versiculos];
    }

    if (elTexto) {
      elTexto.innerHTML = versiculos
        .map(v => {
          const numVersiculo = v["@osisID"].split(".")[2];
          const textoLimpo = v["#text"].replace(/^¶\s*/, "");
          return `<p class="versiculo"><sup class="num-versiculo">${numVersiculo}</sup>${textoLimpo}</p>`;
        })
        .join("");
    }

  } catch (erro) {
    console.error("Erro ao carregar salmo:", erro);
  }
}

document.addEventListener("DOMContentLoaded", carregarSalmoDoDia);
