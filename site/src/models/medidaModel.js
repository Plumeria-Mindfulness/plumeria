var database = require("../database/config");

function buscarUltimasMedidas(idSessao, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select top ${limite_linhas}
            dtSessao as momento_grafico,
            duracao
                from sessao
                    join usuario on fkUsuario = idUsuario
                        where idUsuario = ${idSessao}
                            order by idSessao desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        // TALVEZ O JOIN FEITO NESSA INSTRUÇÃO DÊ PROBLEMA
        // QUALQUER COISA, SUBSTITUIR A LINHA DO JOIN POR 'where fkUsuario = ${idSessao}'
        // TALVEZ ESSE 'idSessao' TENHA QUE SER, NA VERDADE, O 'idCliente' REGISTRADO NO SESSION.STORAGE
        instrucaoSql = `
            select
                dtSessao as momento_grafico,
                duracao
                    from sessao
                        join usuario on fkUsuario = idUsuario
                            where idUsuario = ${idSessao}
                                order by idSessao desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idSessao) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select top 1
        dtSessao as momento_grafico,
        duracao
            from sessao
                join usuario on fkUsuario = idUsuario
                    where idUsuario = ${idSessao}
                        order by idSessao desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select
        dtSessao as momento_grafico,
        duracao
            from sessao
                join usuario on fkUsuario = idUsuario
                    where idUsuario = ${idSessao}
                        order by idSessao desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
