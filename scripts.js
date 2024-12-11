const valoresApostados = document.querySelector(".opcoes");
const valorApostadoAlternativo = document.querySelector(".valor-apostado");
const apostados = document.querySelector(".apostados ul");
const ganhos = document.querySelector(".ganhos ul");
const perdas = document.querySelector(".perdas ul");
const dividido2 = document.querySelector("#dividido-2");
const dividido3 = document.querySelector("#dividido-3");
const dividido4 = document.querySelector("#dividido-4");

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
function atualizarDivididos() {
  dividido2.innerHTML = (totalApostado / 2).toFixed(2);
  dividido3.innerHTML = (totalApostado / 3).toFixed(2);
  dividido4.innerHTML = (totalApostado / 4).toFixed(2);

  const cor = totalApostado < 0 ? "red" : "#21cf27";
  dividido2.style.color = cor;
  dividido3.style.color = cor;
  dividido4.style.color = cor;
}

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
      totalApostado = valor;
    }
    const valor = parseFloat(
      li.querySelector("p").textContent.replace("$", "")
    );
    totalApostado += parseFloat(valor) - 1.8;
    atualizarDivididos();
    ganhos.appendChild(li);
  } else if (e.target.classList.contains("dot-2")) {
    const li = e.target.closest("li");
    if (perdas.contains(li)) {
      alert("Não foi possível realizar a operação");
      totalApostado = valor;
    }
    const valor = parseFloat(
      li.querySelector("p").textContent.replace("$", "")
    );
    totalApostado -= valor - 1.8;
    atualizarDivididos();
    perdas.appendChild(li);
  } else if (e.target.classList.contains("dot-3")) {
    const li = e.target.closest("li");
    if (apostados.contains(li)) {
      alert("Não foi possível realizar a operação");
      totalApostado = valor;
    }
    totalApostado -= valor - 1.8;
    const valor = parseFloat(
      li.querySelector("p").textContent.replace("$", "")
    );
    atualizarDivididos();
    apostados.appendChild(li);
  }
});
