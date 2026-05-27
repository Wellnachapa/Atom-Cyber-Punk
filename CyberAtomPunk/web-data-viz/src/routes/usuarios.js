var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");
const { cadastrar } = require("../models/usuarioModel");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.get("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;