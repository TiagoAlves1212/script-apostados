const valoresApostados = document.querySelector(".opcoes");
const valorApostadoAlternativo = document.querySelector(".valor-apostado");
const apostados = document.querySelector(".apostados ul");
const ganhos = document.querySelector(".ganhos ul");
const valoresGanhos = document.querySelectorAll(".ganhou ul li");
const perdas = document.querySelector(".perdas ul");
const valoresPerdidos = document.querySelectorAll(".perdeu ul li");
const calcularBtn = document.querySelector("#calcular");
const resultado = document.querySelector(".resultado");

function criarLi(valor) {
  let li = document.createElement("li");
  li.classList.add("li");
  li.innerHTML = `
    <p>${valor}$</p>
    <div>
      <button title="Mudar para ganho" class="dot-1"></button>
      <button title="Mudar para perda" class="dot-2"></button>
      <button title="Mudar para apostados" class="dot-3"></button>
    </div>
  `;
  apostados.appendChild(li);
}

let totalApostado = 0;

valorApostadoAlternativo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let valor = e.target.value.trim();
    if (!valor || isNaN(Number(valor))) {
      alert("Digite apenas números");
      e.target.value = "";
      return;
    }
    criarLi(valor);
    e.target.value = "";
  }
});

valoresApostados.addEventListener("change", (e) => {
  const valor = e.target.value;
  let li = document.createElement("li");
  li.classList.add("li");
  li.innerHTML = `
    <p>${valor}</p>
    <div>
      <button class="dot-1" title="Mudar para ganho"></button>
      <button class="dot-2" title="Mudar para perda"></button>
      <button class="dot-3" title="Mudar para apostados"></button>
    </div>
  `;
  apostados.appendChild(li);
});

document.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("dot-1")) {
    const li = e.target.closest("li");
    if (ganhos.contains(li)) {
      alert("Não foi possível realizar a operação");
    }

    ganhos.appendChild(li);
  } else if (e.target.classList.contains("dot-2")) {
    const li = e.target.closest("li");
    if (perdas.contains(li)) {
      alert("Não foi possível realizar a operação");
    }
    perdas.appendChild(li);
  } else if (e.target.classList.contains("dot-3")) {
    const li = e.target.closest("li");
    if (apostados.contains(li)) {
      alert("Não foi possível realizar a operação");
    }
    apostados.appendChild(li);
  }
});

calcularBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const valoresGanhos = document.querySelectorAll(".ganhou li");
  const valoresPerdidos = document.querySelectorAll(".perdeu li");

  console.log("Ganhos encontrados:", valoresGanhos);
  console.log("Perdas encontradas:", valoresPerdidos);

  let soma = 0;

  valoresGanhos.forEach((element) => {
    const valor = parseFloat(element.textContent.trim());
    console.log("Ganho:", valor);
    if (!isNaN(valor)) {
      soma += valor;
    }
  });

  valoresPerdidos.forEach((element) => {
    const valor = parseFloat(element.textContent.trim());
    console.log("Perda:", valor);
    if (!isNaN(valor)) {
      soma -= valor;
    }
  });

  console.log("soma resetada", soma);

  // Atualiza o conteúdo do resultado
  resultado.innerHTML = `
  <p>Dinheiro bruto: <span class="valor">${soma.toFixed(2)}</span></p>
  <p>Lucro: <span class="valor lucro">${
    soma >= 0 ? (soma - 1.8).toFixed(2) : "TOMOU FOI NO CU"
  }</span></p>
  <p>Lucro ou dinheiro dividido para 2: <span class="valor">${(
    (soma - 1.8) /
    2
  ).toFixed(2)}</span></p>
  <p>Lucro ou dinheiro dividido para 3: <span class="valor">${(
    (soma - 1.8) /
    3
  ).toFixed(2)}</span></p>
  <p>Lucro ou dinheiro dividido para 4: <span class="valor">${(
    (soma - 1.8) /
    4
  ).toFixed(2)}</span></p>
`;

  // Verifica os valores e aplica a cor
  const spans = resultado.querySelectorAll(".valor");
  spans.forEach((span) => {
    const valor = parseFloat(span.textContent.trim());
    if (valor < 0) {
      span.style.color = "red"; // Define cor vermelha para valores negativos
    } else {
      span.style.color = "#21cf27";
    }
  });

  // Verifica se o lucro é negativo
  const lucroSpan = document.querySelector(".lucro");
  console.log("lucro: ", lucroSpan);
  if (lucroSpan < 0) {
    lucroSpan.style.color = "red";
  }

  soma = 0;
});
