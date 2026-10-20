// ===== 1. Menu que abre e fecha =====
const botaoMenu = document.getElementById("botaoMenu");
const menu = document.getElementById("menu");

botaoMenu.addEventListener("click", function () {
  const estaAberto = menu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", estaAberto);
  botaoMenu.textContent = estaAberto ? "Fechar" : "Menu";
});

// fecha o menu ao clicar em um link (no celular)
menu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", false);
    botaoMenu.textContent = "Menu";
  });
});

// ===== 2. Cálculo de frete com if/else =====
const formFrete = document.getElementById("formFrete");
const resultadoFrete = document.getElementById("resultadoFrete");

formFrete.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const cep = document.getElementById("cep").value.trim();
  const valor = parseFloat(document.getElementById("valor").value);

  resultadoFrete.className = "resultado";

  // valida o CEP: precisa ter 8 números
  if (cep.length !== 8 || isNaN(Number(cep))) {
    resultadoFrete.textContent = "Digite um CEP com 8 números.";
    resultadoFrete.classList.add("erro");
    return;
  }
  if (isNaN(valor) || valor <= 0) {
    resultadoFrete.textContent = "Digite o valor da compra.";
    resultadoFrete.classList.add("erro");
    return;
  }

  // o primeiro número do CEP indica a região do país
  const regiao = Number(cep.charAt(0));
  let frete;

  if (valor >= 200) {
    frete = 0; // frete grátis
  } else if (regiao <= 3) {
    frete = 15;
  } else if (regiao <= 6) {
    frete = 25;
  } else {
    frete = 35;
  }

  if (frete === 0) {
    resultadoFrete.textContent = "Frete grátis! Compras a partir de R$ 200,00.";
  } else {
    const total = valor + frete;
    resultadoFrete.textContent =
      "Frete: R$ " + frete.toFixed(2).replace(".", ",") +
      " | Total: R$ " + total.toFixed(2).replace(".", ",");
  }
  resultadoFrete.classList.add("ok");
});

// ===== 3. Validação do formulário de contato =====
const formContato = document.getElementById("formContato");
const resultadoContato = document.getElementById("resultadoContato");

formContato.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const campos = formContato.querySelectorAll("input, textarea");
  let tudoCerto = true;

  campos.forEach(function (campo) {
    // checkValidity() usa as regras do HTML (required, minlength, type=email)
    if (campo.checkValidity()) {
      campo.classList.remove("invalido");
    } else {
      campo.classList.add("invalido");
      tudoCerto = false;
    }
  });

  resultadoContato.className = "resultado";

  if (tudoCerto) {
    const nome = document.getElementById("nome").value.trim();
    resultadoContato.textContent = "Obrigado, " + nome + "! Recebemos sua mensagem.";
    resultadoContato.classList.add("ok");
    formContato.reset();
  } else {
    resultadoContato.textContent =
      "Confira os campos em vermelho: nome (mín. 3 letras), e-mail válido e mensagem (mín. 10 letras).";
    resultadoContato.classList.add("erro");
  }
});
