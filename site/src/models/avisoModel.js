var database = require("../database/config");

function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = `
        SELECT 
            m.idMensagem AS idAviso,
            m.titulo,
            m.descricao,
            m.avaliacao,
            m.fkUsuario,
            u.idUsuario AS idUsuario,
            u.nome,
            u.email,
            u.senha
                FROM mensagem AS m
                INNER JOIN usuario AS u ON m.fkUsuario = u.idUsuario`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");

    var instrucao = `
    SELECT 
        m.idMensagem AS idAviso,
        m.titulo,
        m.descricao,
        m.avaliacao,
        m.fkUsuario,
        u.idUsuario AS idUsuario,
        u.nome,
        u.email,
        u.senha
            FROM mensagem AS m
                INNER JOIN usuario AS u ON m.fkUsuario = u.idUsuario
                    WHERE u.idUsuario = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function publicar(titulo, descricao, avaliacao, idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", titulo, descricao, avaliacao, idUsuario);

    var instrucao = `
        INSERT INTO mensagem (titulo, descricao, avaliacao, fkUsuario, fkSessao) VALUES ('${titulo}', '${descricao}', '${avaliacao}', ${idUsuario}, (SELECT MAX(idSessao) id FROM sessao where fkUsuario = ${idUsuario}));
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(novaDescricao, novaAvaliacao, idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, novaAvaliacao, idAviso);

    var instrucao = `
        UPDATE mensagem SET descricao = '${novaDescricao}', avaliacao = '${novaAvaliacao}' WHERE idMensagem = ${idAviso};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    listarPorUsuario,
    publicar,
    editar
}
