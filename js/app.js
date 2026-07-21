import { buscarSalmos } from './api.js';

async function carregarSalmoDoDia() {
  const listaSalmos = await buscarSalmos();

  if (!listaSalmos || listaSalmos.length === 0) {
    const elTitulo = document.getElementById("titulo");
    const elTexto = document.getElementById("texto");
    if (elTitulo) elTitulo.textContent = "Erro ao carregar";
    if (elTexto) elTexto.textContent = "Não foi possível carregar os salmos no momento.";
    return;
  }

  // Lógica para selecionar o salmo rotativo com base no dia do ano
  const hoje = new Date();
  const inicioDoAno = new Date(hoje.getFullYear(), 0, 0);
  const diffTempo = hoje - inicioDoAno;
  const diaDoAno = Math.floor(diffTempo / (1000 * 60 * 60 * 24));

  const indice = diaDoAno % listaSalmos.length;
  const salmoObjeto = listaSalmos[indice].chapter;

  // Extrai o número do Salmo (Ex: "Ps.91" -> "91")
  const numeroSalmo = salmoObjeto["@osisID"].replace("Ps.", "");
  const tituloFormatado = `Salmo ${numeroSalmo}`;

  // Processa os versículos
  let versiculos = salmoObjeto.verse;
  if (!Array.isArray(versiculos)) {
    versiculos = [versiculos];
  }

  // Atualiza o título
  const elementoTitulo = document.getElementById("titulo");
  if (elementoTitulo) {
    elementoTitulo.textContent = tituloFormatado;
  }

  // Monta o HTML com todos os versículos numerados
  const containerTexto = document.getElementById("texto");
  if (containerTexto) {
    containerTexto.innerHTML = versiculos
      .map(v => {
        const numVersiculo = v["@osisID"].split(".")[2];
        const textoLimpo = v["#text"].replace(/^¶\s*/, ""); // Limpa o símbolo ¶ no início
        return `<p class="versiculo"><sup class="num-versiculo">${numVersiculo}</sup>${textoLimpo}</p>`;
      })
      .join("");
  }

  // Lógica do botão Compartilhar
  configurarBotaoCompartilhar(tituloFormatado, versiculos);
}

function configurarBotaoCompartilhar(titulo, versiculos) {
  const btnCompartilhar = document.querySelector(".btn-compartilhar, button");
  if (!btnCompartilhar) return;

  btnCompartilhar.addEventListener("click", async () => {
    const textoParaCompartilhar = `${titulo}\n\n` + 
      versiculos.map(v => `${v["@osisID"].split(".")[2]}. ${v["#text"].replace(/^¶\s*/, "")}`).join("\n");

    if (navigator.share) {
      try {
        await navigator.share({
          title: titulo,
          text: textoParaCompartilhar,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Compartilhamento cancelado ou não suportado.");
      }
    } else {
      // Fallback: Copia para a área de transferência
      navigator.clipboard.writeText(textoParaCompartilhar);
      alert("Salmo copiado para a área de transferência!");
    }
  });
}

document.addEventListener("DOMContentLoaded", carregarSalmoDoDia);
