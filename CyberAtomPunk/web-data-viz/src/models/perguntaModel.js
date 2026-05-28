// perguntaModel.js
// Este arquivo se conecta ao banco de dados e busca as perguntas

var db = require("../database/config");

// Função para BUSCAR TODAS AS PERGUNTAS com suas OPÇÕES
function buscarTodasPerguntas() {
    // Explicação:
    // SELECT * FROM pergunta = "Me traga TODOS os dados de TODAS as linhas da tabela pergunta"
    
    var sql = "SELECT * FROM pergunta";

    console.log("Executando SQL para buscar perguntas:\n" + sql);

    // db.executar() conecta no banco de dados e executa o SQL
    return db.executar(sql);
}

// Função para BUSCAR UMA PERGUNTA ESPECÍFICA COM SUAS OPÇÕES
function buscarPerguntaComOpcoes(idPergunta) {
    // Explicação:
    // Esta query busca uma pergunta E todas as opções dela
    // LEFT JOIN = "uma pergunta pode ter VÁRIAS opções"
    // WHERE pergunta.id = ? = "mas só a pergunta com ID tal"

    var sql = `
        SELECT 
            pergunta.id as pergunta_id,
            pergunta.titulo,
            pergunta.descricao,
            opcao.id as opcao_id,
            opcao.descricao as opcao_descricao,
            opcao.atributo_requerido,
            opcao.pontos_necessarios
        FROM pergunta
        LEFT JOIN opcao ON pergunta.id = opcao.fk_pergunta
        WHERE pergunta.id = ${idPergunta}
    `;

    console.log("Executando SQL para buscar pergunta com opções:\n" + sql);

    return db.executar(sql);
}

// Função para SALVAR RESPOSTA do usuário
function salvarResposta(idUsuario, idPergunta, idOpcao, passou) {
    // Explicação:
    // INSERT INTO = "adicione uma nova linha"
    // VALUES = "com esses valores"

    var sql = `
        INSERT INTO resultado_quiz 
        (fk_usuario, fk_pergunta, fk_opcao, passou)
        VALUES (${idUsuario}, ${idPergunta}, ${idOpcao}, ${passou})
    `;

    console.log("Salvando resposta no banco:\n" + sql);

    return db.executar(sql);
}

// Função para PEGAR RESULTADO FINAL DO QUIZ
function buscarResultadoQuiz(idUsuario) {
    // Explicação:
    // COUNT(*) = "conte quantas linhas tem"
    // COALESCE(SUM(passou), 0) = "some todos os valores de passou, mas se for NULL retorna 0"
    // GROUP BY fk_usuario = "agrupe por usuário"

    var sql = `
        SELECT 
            COUNT(*) as total_opcoes,
            COALESCE(SUM(passou), 0) as opcoes_certas,
            COUNT(DISTINCT fk_pergunta) as total_perguntas
        FROM resultado_quiz
        WHERE fk_usuario = ${idUsuario}
    `;

    console.log("Buscando resultado do quiz:\n" + sql);

    return db.executar(sql);
}

// Função para LIMPAR RESPOSTAS ANTERIORES DO QUIZ
function limparRespostasUsuario(idUsuario) {
    // Explicação:
    // DELETE FROM = remove linhas do banco
    // WHERE fk_usuario = ? = somente as respostas desse usuário

    var sql = `
        DELETE FROM resultado_quiz
        WHERE fk_usuario = ${idUsuario}
    `;

    console.log("Limpando respostas anteriores do usuário " + idUsuario + ":\n" + sql);

    return db.executar(sql);
}

// Exportar as funções
module.exports = {
    buscarTodasPerguntas,
    buscarPerguntaComOpcoes,
    salvarResposta,
    buscarResultadoQuiz,
    limparRespostasUsuario
};
