var database = require("../database/config");

function buscarUltimasMedidas(idUsuarioDash, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            select top ${limite_linhas}
                dtSessao as momento_grafico,
                duracao
                    from sessao
                        join usuario on fkUsuario = idUsuario
                            where idUsuario = ${idUsuarioDash}
                                order by dtSessao;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
            select
                dtSessao as momento_grafico,
                sum(duracao) as duracao
                    from sessao
                        join usuario on fkUsuario = idUsuario
                            where idUsuario = ${idUsuarioDash}
                                group by dtSessao    
                                    order by dtSessao limit ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidas2(idUsuarioDash, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select count(idSessao),
        dtsessao as momento_grafico
            from sessao
                join usuario on fkUsuario = idUsuario
                    where idUsuario = ${idUsuarioDash}
                        group by dtSessao
                            order by dtSessao limit ${limite_linhas};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
            select count(idSessao) as totalSessao,
            dtsessao as momento_grafico
                from sessao
                    join usuario on fkUsuario = idUsuario
                        where idUsuario = ${idUsuarioDash}
                            group by dtSessao
                                order by dtSessao limit ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarUltimasMedidas2
}
