// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

// --- CURSOR DUPLO ANIMADO ---
const cursorL   = document.getElementById('cursorL');
const cursorR   = document.getElementById('cursorR');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let lx = 0, ly = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

function animCursors() {
  lx += (mouseX - lx) * 0.12;
  ly += (mouseY - ly) * 0.12;
  rx += (mouseX - rx) * 0.08;
  ry += (mouseY - ry) * 0.08;

  cursorL.style.left = lx + 'px';
  cursorL.style.top  = ly + 'px';
  cursorR.style.left = rx + 'px';
  cursorR.style.top  = ry + 'px';

  requestAnimationFrame(animCursors);
}
animCursors();

// --- EFEITO FLICKER NO TÍTULO ATOMPUNK ---
const atomTitle = document.querySelector('.atom-side .side-title');

setInterval(() => {
  if (Math.random() < 0.05) {
    atomTitle.style.opacity = '0.6';
    setTimeout(() => atomTitle.style.opacity = '1', 80);
  }
}, 200);
