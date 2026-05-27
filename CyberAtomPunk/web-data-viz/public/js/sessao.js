// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email == null || nome == null) {
        window.location = "../login.html";
        return;
    }

    var b_usuario = document.getElementById("b_usuario");
    if (b_usuario != null) {
        b_usuario.innerHTML = nome;
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

// Efeito flicker CyberPunk
const atomTitle = document.querySelector('.atom-side .side-title');

if (atomTitle) {
    setInterval(() => {
        if (Math.random() < 0.05) {
            atomTitle.style.opacity = '0.6';
            setTimeout(() => atomTitle.style.opacity = '1', 80);
        }
    }, 200);
}
