var database = require("../database/config");

function redefinirSenha(emailRedefinicao, novaSenha) {
    console.log("ACESSEI O REDEFINIÇÃO SENHA MODEL \n\n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n\t\t >> verifique suas credenciais de acesso ao banco\n\t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", emailRedefinicao, novaSenha);

    var instrucao = `
        UPDATE usuario SET sennha = sha2('${novaSenha}', 256) WHERE email = '${emailRedefinicao}';
    `

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    redefinirSenha
}