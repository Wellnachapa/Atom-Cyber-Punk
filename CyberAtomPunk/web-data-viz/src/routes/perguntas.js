// perguntas.js
// Este arquivo define TODAS AS ROTAS do quiz

var express = require("express");
var router = express.Router();

var perguntaController = require("../controllers/perguntaController");
var perfilSpecialController = require("../controllers/perfilSpecialController");

// ========== ROTAS DE PERGUNTAS ==========

// Rota 1: GET /perguntas/listar
// O que faz: Busca TODAS as perguntas do banco
// Chamada do frontend: fetch("/perguntas/listar")
router.get("/listar", function (req, res) {
    perguntaController.listarPerguntas(req, res);
});

// Rota 2: GET /perguntas/:idPergunta
// O que faz: Busca UMA pergunta específica COM SUAS OPÇÕES
// Exemplo: /perguntas/1 → Busca pergunta 1 e todas suas opções
// Chamada do frontend: fetch("/perguntas/1")
router.get("/:idPergunta", function (req, res) {
    perguntaController.buscarPergunta(req, res);
});

// Rota 3: POST /perguntas/responder
// O que faz: O usuário marca uma resposta e verifica se PASSOU ou NÃO
// O backend compara os pontos SPECIAL do usuário com os pontos necessários
// Chamada do frontend: fetch("/perguntas/responder", { method: "POST", ... })
router.post("/responder", function (req, res) {
    perguntaController.responderPergunta(req, res);
});

// Rota 4: GET /perguntas/resultado/:idUsuario
// O que faz: Busca o resultado final do quiz (quantas opções acertou)
// Exemplo: /perguntas/resultado/1 → Mostra resultado do usuário 1
// Chamada do frontend: fetch("/perguntas/resultado/1")
router.get("/resultado/:idUsuario", function (req, res) {
    perguntaController.buscarResultado(req, res);
});

// ========== ROTAS DE PERFIL SPECIAL ==========

// Rota 5: POST /perguntas/perfil/criar
// O que faz: CRIA um novo perfil SPECIAL para o usuário
// É chamada quando o usuário termina de distribuir os 33 pontos
// Chamada do frontend: fetch("/perguntas/perfil/criar", { method: "POST", ... })
router.post("/perfil/criar", function (req, res) {
    perfilSpecialController.criarPerfilSpecial(req, res);
});

// Rota 6: GET /perguntas/perfil/:idUsuario
// O que faz: Busca o perfil SPECIAL de um usuário
// Exemplo: /perguntas/perfil/1 → Mostra os atributos SPECIAL do usuário 1
// Chamada do frontend: fetch("/perguntas/perfil/1")
router.get("/perfil/:idUsuario", function (req, res) {
    perfilSpecialController.buscarPerfil(req, res);
});

// Rota 7: PUT /perguntas/perfil/atualizar
// O que faz: ATUALIZA o perfil SPECIAL de um usuário
// É chamada se o usuário quiser mudar seus atributos depois
// Chamada do frontend: fetch("/perguntas/perfil/atualizar", { method: "PUT", ... })
router.put("/perfil/atualizar", function (req, res) {
    perfilSpecialController.atualizarPerfil(req, res);
});

module.exports = router;
