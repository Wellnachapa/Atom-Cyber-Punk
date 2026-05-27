// perfilSpecialController.js
// Este arquivo gerencia o SPECIAL do usuário - recebe os 33 pontos distribuídos

var perfilSpecialModel = require("../models/perfilSpecialModel");

// FUNÇÃO 1: CRIAR UM NOVO PERFIL SPECIAL (quando o usuário responde o formulário SPECIAL)
function criarPerfilSpecial(req, res) {
    // Explicação:
    // req.body = dados enviados do frontend
    // O frontend manda um JSON tipo:
    // {
    //     "idUsuario": 1,
    //     "strength": 5,
    //     "perception": 4,
    //     ... etc
    // }

    var idUsuario = req.body.idUsuario;
    var strength = req.body.strength;
    var perception = req.body.perception;
    var endurance = req.body.endurance;
    var charisma = req.body.charisma;
    var intelligence = req.body.intelligence;
    var agility = req.body.agility;
    var luck = req.body.luck;

    console.log("Criando perfil SPECIAL para usuário: " + idUsuario);
    console.log("Atributos: S=" + strength + " P=" + perception + " E=" + endurance + 
                " C=" + charisma + " I=" + intelligence + " A=" + agility + " L=" + luck);

    // Validação - verificar se todos os dados foram enviados
    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está undefined!");
        return;
    }
    if (strength == undefined || perception == undefined || endurance == undefined ||
        charisma == undefined || intelligence == undefined || agility == undefined || luck == undefined) {
        res.status(400).send("Um dos atributos SPECIAL está undefined!");
        return;
    }

    // Validação - verificar se o total é 33 pontos
    var totalPontos = parseInt(strength) + parseInt(perception) + parseInt(endurance) + 
                      parseInt(charisma) + parseInt(intelligence) + parseInt(agility) + parseInt(luck);

    console.log("Total de pontos distribuídos: " + totalPontos);

    if (totalPontos !== 33) {
        res.status(400).send("Total de pontos deve ser 33! Você tem " + totalPontos);
        return;
    }

    // Se tudo passou, CRIAR o perfil no banco
    perfilSpecialModel.criarPerfil(idUsuario, strength, perception, endurance, charisma, intelligence, agility, luck)
        .then(function (resultado) {
            console.log("Perfil SPECIAL criado com sucesso!");
            res.status(201).json({
                mensagem: "Perfil SPECIAL criado!",
                id: resultado.insertId
            });
        })
        .catch(function (erro) {
            console.log("ERRO ao criar perfil: " + erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// FUNÇÃO 2: BUSCAR O PERFIL SPECIAL DE UM USUÁRIO
function buscarPerfil(req, res) {
    // Explicação:
    // req.params.idUsuario = pega o ID da URL

    var idUsuario = req.params.idUsuario;

    console.log("Buscando perfil SPECIAL do usuário: " + idUsuario);

    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está undefined!");
        return;
    }

    perfilSpecialModel.buscarPerfilPorUsuario(idUsuario)
        .then(function (resultado) {
            console.log("Resultado: " + JSON.stringify(resultado));

            if (resultado.length > 0) {
                res.status(200).json(resultado[0]); // Retorna o primeiro (e único) perfil
            } else {
                res.status(204).send("Perfil SPECIAL não encontrado!");
            }
        })
        .catch(function (erro) {
            console.log("ERRO ao buscar perfil: " + erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// FUNÇÃO 3: ATUALIZAR UM PERFIL SPECIAL (se o usuário quiser mudar depois)
function atualizarPerfil(req, res) {
    // Explicação:
    // Similar ao criar, mas aqui ATUALIZA ao invés de inserir

    var idUsuario = req.body.idUsuario;
    var strength = req.body.strength;
    var perception = req.body.perception;
    var endurance = req.body.endurance;
    var charisma = req.body.charisma;
    var intelligence = req.body.intelligence;
    var agility = req.body.agility;
    var luck = req.body.luck;

    console.log("Atualizando perfil SPECIAL para usuário: " + idUsuario);

    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está undefined!");
        return;
    }

    // Validação - total de pontos
    var totalPontos = parseInt(strength) + parseInt(perception) + parseInt(endurance) + 
                      parseInt(charisma) + parseInt(intelligence) + parseInt(agility) + parseInt(luck);

    if (totalPontos !== 33) {
        res.status(400).send("Total de pontos deve ser 33! Você tem " + totalPontos);
        return;
    }

    perfilSpecialModel.atualizarPerfil(idUsuario, strength, perception, endurance, charisma, intelligence, agility, luck)
        .then(function (resultado) {
            console.log("Perfil SPECIAL atualizado com sucesso!");
            res.status(200).json({
                mensagem: "Perfil SPECIAL atualizado!"
            });
        })
        .catch(function (erro) {
            console.log("ERRO ao atualizar perfil: " + erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// Exportar as funções
module.exports = {
    criarPerfilSpecial,
    buscarPerfil,
    atualizarPerfil
};
