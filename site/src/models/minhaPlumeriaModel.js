var database = require("../database/config");

function publicarDuracaoData(totMinFinal, dataString, idUsuario) {
    console.log("ACESSEI O MINHA PLUMERIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", totMinFinal, dataString, idUsuario);

    var instrucao = `
        INSERT INTO sessao (dtSessao, duracao, fkUsuario) VALUES ('${dataString}', '${totMinFinal}', '${idUsuario}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    publicarDuracaoData
}