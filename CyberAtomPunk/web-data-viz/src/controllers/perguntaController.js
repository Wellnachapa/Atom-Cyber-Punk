// perguntaController.js
// Este arquivo contém a LÓGICA do quiz - ela recebe os dados e processa tudo

var perguntaModel = require("../models/perguntaModel");
var perfilSpecialModel = require("../models/perfilSpecialModel");

// FUNÇÃO 1: BUSCAR TODAS AS PERGUNTAS
function listarPerguntas(req, res) {
    // Explicação:
    // Esta função é chamada quando alguém faz uma requisição para /perguntas/listar
    // Ela busca todas as perguntas no banco e manda de volta

    perguntaModel.buscarTodasPerguntas()
        .then(function (resultado) {
            console.log("Perguntas encontradas: " + resultado.length);
            
            if (resultado.length > 0) {
                // Status 200 = sucesso
                res.status(200).json(resultado);
            } else {
                // Status 204 = nenhum conteúdo encontrado
                res.status(204).send("Nenhuma pergunta encontrada!");
            }
        })
        .catch(function (erro) {
            console.log("ERRO ao buscar perguntas: " + erro.sqlMessage);
            // Status 500 = erro no servidor
            res.status(500).json(erro.sqlMessage);
        });
}

// FUNÇÃO 2: BUSCAR UMA PERGUNTA COM SUAS OPÇÕES
function buscarPergunta(req, res) {
    // Explicação:
    // req.params.idPergunta = pega o ID da URL (exemplo: /perguntas/1 → idPergunta = 1)

    var idPergunta = req.params.idPergunta;

    console.log("Buscando pergunta ID: " + idPergunta);

    if (idPergunta == undefined) {
        res.status(400).send("ID da pergunta está undefined!");
        return;
    }

    perguntaModel.buscarPerguntaComOpcoes(idPergunta)
        .then(function (resultado) {
            console.log("Resultado da pergunta: " + JSON.stringify(resultado));

            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Pergunta não encontrada!");
            }
        })
        .catch(function (erro) {
            console.log("ERRO ao buscar pergunta: " + erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// FUNÇÃO 3: RESPONDER UMA PERGUNTA (VALIDAR SE PASSOU OU NÃO)
function responderPergunta(req, res) {
    // Explicação:
    // Esta função recebe:
    // - idUsuario = quem respondeu
    // - idPergunta = qual pergunta foi respondida
    // - idOpcao = qual opção foi escolhida
    // - atributo_requerido = qual atributo SPECIAL é necessário
    // - pontos_necessarios = quantos pontos daquele atributo são necessários
    // 
    // Ela verifica se o usuário tem SUFICIENTES pontos naquele atributo
    // Se sim, marca como "passou" (1)
    // Se não, marca como "não passou" (0)

    var idUsuario = req.body.idUsuario;
    var idPergunta = req.body.idPergunta;
    var idOpcao = req.body.idOpcao;
    var atributoRequerido = req.body.atributoRequerido;
    var pontosNecessarios = req.body.pontosNecessarios;

    console.log("Usuário: " + idUsuario);
    console.log("Pergunta: " + idPergunta);
    console.log("Opção: " + idOpcao);
    console.log("Atributo: " + atributoRequerido);
    console.log("Pontos necessários: " + pontosNecessarios);

    // Validação
    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está undefined!");
        return;
    }
    if (idPergunta == undefined) {
        res.status(400).send("ID da pergunta está undefined!");
        return;
    }
    if (idOpcao == undefined) {
        res.status(400).send("ID da opção está undefined!");
        return;
    }

    // PASSO 1: Buscar o perfil SPECIAL do usuário
    perfilSpecialModel.buscarPerfilPorUsuario(idUsuario)
        .then(function (perfilDoUsuario) {
            console.log("Perfil do usuário encontrado: " + JSON.stringify(perfilDoUsuario));

            if (perfilDoUsuario.length === 0) {
                res.status(404).send("Perfil SPECIAL não encontrado!");
                return;
            }

            var perfil = perfilDoUsuario[0]; // Pega o primeiro (e único) resultado

            // PASSO 2: Verificar se o usuário tem SUFICIENTES pontos
            var passou = 0; // Começa com 0 (não passou)

            // Se o atributo requerido não é nulo, verifica os pontos
            if (atributoRequerido != null && atributoRequerido != undefined && atributoRequerido != "") {
                var pontosDoUsuario = perfil[atributoRequerido];
                console.log("Pontos do usuário em " + atributoRequerido + ": " + pontosDoUsuario);

                if (pontosDoUsuario >= pontosNecessarios) {
                    passou = 1; // PASSOU! Tem pontos suficientes
                    console.log("✓ PASSOU - Usuário tem " + pontosDoUsuario + " pontos (precisa de " + pontosNecessarios + ")");
                } else {
                    passou = 0; // NÃO PASSOU - Faltam pontos
                    console.log("✗ NÃO PASSOU - Usuário tem " + pontosDoUsuario + " pontos (precisa de " + pontosNecessarios + ")");
                }
            }

            // PASSO 3: Salvar a resposta no banco de dados
            perguntaModel.salvarResposta(idUsuario, idPergunta, idOpcao, passou)
                .then(function (resultado) {
                    console.log("Resposta salva com sucesso!");
                    res.status(201).json({
                        passou: passou,
                        mensagem: passou === 1 ? "Você passou!" : "Você não conseguiu passar!"
                    });
                })
                .catch(function (erro) {
                    console.log("ERRO ao salvar resposta: " + erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                });
        })
        .catch(function (erro) {
            console.log("ERRO ao buscar perfil: " + erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// FUNÇÃO 4: BUSCAR RESULTADO FINAL DO QUIZ
function buscarResultado(req, res) {
    // Explicação:
    // Esta função busca quantas respostas o usuário acertou no total

    var idUsuario = req.params.idUsuario;

    console.log("Buscando resultado para usuário: " + idUsuario);

    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está undefined!");
        return;
    }

    perguntaModel.buscarResultadoQuiz(idUsuario)
        .then(function (resultado) {
            console.log("Resultado encontrado: " + JSON.stringify(resultado));

            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log("ERRO ao buscar resultado: " + erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// FUNÇÃO 5: LIMPAR RESPOSTAS ANTERIORES DO QUIZ
function limparRespostasQuiz(req, res) {
    var idUsuario = req.params.idUsuario;

    console.log("Solicitação para limpar respostas do usuário: " + idUsuario);

    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está undefined!");
        return;
    }

    perguntaModel.limparRespostasUsuario(idUsuario)
        .then(function (resultado) {
            console.log("Respostas anteriores removidas com sucesso:", resultado);
            res.status(200).json({
                mensagem: "Respostas antigas removidas. Você pode refazer o quiz agora.",
                linhasRemovidas: resultado.affectedRows
            });
        })
        .catch(function (erro) {
            console.log("ERRO ao limpar respostas: " + erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// Exportar as funções
module.exports = {
    listarPerguntas,
    buscarPergunta,
    responderPergunta,
    buscarResultado,
    limparRespostasQuiz
};
