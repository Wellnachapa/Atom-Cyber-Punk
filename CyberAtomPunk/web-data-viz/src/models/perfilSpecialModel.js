// perfilSpecialModel.js
// Este arquivo gerencia o perfil SPECIAL do usuário (os 7 atributos)

var db = require("../database/config");

// Função para CRIAR UM NOVO PERFIL SPECIAL
function criarPerfil(idUsuario, strength, perception, endurance, charisma, intelligence, agility, luck) {
    // Explicação:
    // INSERT INTO = "adicione uma nova linha"
    // ${idUsuario} = coloca o valor da variável dentro da string
    
    var sql = `
        INSERT INTO perfil_special 
        (fk_usuario, strength, perception, endurance, charisma, intelligence, agility, luck, pontos_usados)
        VALUES (${idUsuario}, ${strength}, ${perception}, ${endurance}, ${charisma}, ${intelligence}, ${agility}, ${luck}, 40)
    `;

    console.log("Criando novo perfil SPECIAL:\n" + sql);

    return db.executar(sql);
}

// Função para BUSCAR O PERFIL SPECIAL DE UM USUÁRIO
function buscarPerfilPorUsuario(idUsuario) {
    // Explicação:
    // SELECT * = "traga TODOS os dados"
    // WHERE fk_usuario = ${idUsuario} = "onde o ID do usuário seja este"

    var sql = `
        SELECT * FROM perfil_special
        WHERE fk_usuario = ${idUsuario}
    `;

    console.log("Buscando perfil SPECIAL:\n" + sql);

    return db.executar(sql);
}

// Função para ATUALIZAR UM PERFIL SPECIAL
function atualizarPerfil(idUsuario, strength, perception, endurance, charisma, intelligence, agility, luck) {
    // Explicação:
    // UPDATE = "atualize"
    // SET = "defina esses valores"
    // WHERE = "onde essa condição for verdadeira"

    var sql = `
        UPDATE perfil_special 
        SET 
            strength = ${strength},
            perception = ${perception},
            endurance = ${endurance},
            charisma = ${charisma},
            intelligence = ${intelligence},
            agility = ${agility},
            luck = ${luck}
        WHERE fk_usuario = ${idUsuario}
    `;

    console.log("Atualizando perfil SPECIAL:\n" + sql);

    return db.executar(sql);
}

// Exportar as funções
module.exports = {
    criarPerfil,
    buscarPerfilPorUsuario,
    atualizarPerfil
};
