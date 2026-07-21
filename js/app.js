import { buscarSalmos } from './api.js';

async function carregarSalmoDoDia() {
  const elTitulo = document.getElementById("titulo");
  const elTexto = document.getElementById("texto");

  try {
    const listaSalmos = await buscarSalmos();

    if (!listaSalmos || listaSalmos.length === 0) {
      if (elTitulo) elTitulo.textContent = "Erro ao carregar";
      if (elTexto) elTexto.textContent = "Não foi possível carregar a lista de salmos.";
      return;
    }

    // Lógica para selecionar o salmo rotativo do dia
    const hoje = new Date();
    const inicioDoAno = new Date(hoje.getFullYear(), 0, 0);
    const diffTempo = hoje - inicioDoAno;
    const diaDoAno = Math.floor(diffTempo / (1000 * 60 * 60 * 24));

    const indice = diaDoAno % listaSalmos.length;
    const salmoObjeto = listaSalmos[indice].chapter;

    // Extrai o número do Salmo (Ex: "Ps.91" -> "91")
    const numeroSalmo = salmoObjeto["@osisID"].replace("Ps.", "");
    const tituloFormatado = `Salmo ${numeroSalmo}`;

    if (elTitulo) {
      elTitulo.textContent = tituloFormatado;
    }

    // Processa os versículos
    let versiculos = salmoObjeto.verse;
    if (!Array.isArray(versiculos)) {
      versiculos = [versiculos];
    }

    // Renderiza todos os versículos
    if (elTexto) {
      elTexto.innerHTML = versiculos
        .map(v => {
          const numVersiculo = v["@osisID"].split(".")[2];
          const textoLimpo = v["#text"].replace(/^¶\s*/, "");
          return `<p class="versiculo"><sup class="num-versiculo">${numVersiculo}</sup>${textoLimpo}</p>`;
        })
        .join("");
    }

    configurarBotaoCompartilhar(tituloFormatado, versiculos);

  } catch (erro) {
    console.error("Erro no script principal:", erro);
    if (elTitulo) elTitulo.textContent = "Ops! Ocorreu um erro";
    if (elTexto) elTexto.textContent = "Verifique o console para mais detalhes.";
  }
}

function configurarBotaoCompartilhar(titulo, versiculos) {
  const btn = document.querySelector(".btn-compartilhar");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const textoParaCompartilhar = `${titulo}\n\n` + 
      versiculos.map(v => `${v["@osisID"].split(".")[2]}. ${v["#text"].replace(/^¶\s*/, "")}`).join("\n");

    if (navigator.share) {
      try {
        await navigator.share({
          title: titulo,
          text: textoParaCompartilhar,
          url: window.location.href,
        });
      } catch (e) {
        // Compartilhamento cancelado pelo usuário
      }
    } else {
      navigator.clipboard.writeText(textoParaCompartilhar);
      alert("Salmo copiado para a área de transferência!");
    }
  });
}

document.addEventListener("DOMContentLoaded", carregarSalmoDoDia);
