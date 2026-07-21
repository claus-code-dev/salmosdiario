document.getElementById("app").innerHTML=`

<div class="min-h-screen bg-gradient-to-b from-green-800 via-green-700 to-green-600">

<div class="max-w-5xl mx-auto p-6">

<div class="text-center text-white pt-10">

<h1 class="text-5xl font-bold">

🙏 Oração Celestial

</h1>

<p class="mt-3 text-green-100">

Sua inspiração diária na Palavra de Deus

</p>

</div>

<div class="mt-10 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">

<h2 class="text-3xl font-bold text-white text-center">

📖 Salmo do Dia

</h2>

<h3 id="titulo"

class="text-2xl mt-8 text-center text-yellow-300">

Carregando...

</h3>

<p id="texto"

class="text-white text-xl leading-10 mt-8 text-center">

Carregando...

</p>

<div class="text-center mt-10">

<button class="bg-yellow-400 hover:bg-yellow-500 transition rounded-full px-8 py-3 text-lg font-bold">

🙏 Compartilhar

</button>

</div>

</div>

</div>

</div>

`;

const salmos=[

{

titulo:"Salmo 23",

texto:"O Senhor é o meu pastor; nada me faltará."

},

{

titulo:"Salmo 91",

texto:"Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará."

},

{

titulo:"Salmo 121",

texto:"Elevo os meus olhos para os montes; de onde me virá o socorro?"

}

];

const hoje=new Date();

const inicio=new Date(hoje.getFullYear(),0,0);

const dia=Math.floor((hoje-inicio)/86400000);

const indice=dia % salmos.length;

document.getElementById("titulo").innerHTML=salmos[indice].titulo;

document.getElementById("texto").innerHTML=salmos[indice].texto;
