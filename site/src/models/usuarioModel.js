var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    
    var instrucao = `
        SELECT * FROM usuario;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    
    var instrucao = `
    SELECT * FROM usuario WHERE email = '${email}' AND senha = sha2('${senha}', 256);            
    `;

    /*
    O select abaixo seria para pegar capturar o último idSessao do usuário que acabou de logar 
    SELECT usuario.*, MAX(sessao.idSessao) as idSessao FROM usuario JOIN sessao ON idUsuario = fkUsuario WHERE email = '${email}' AND senha = sha2('${senha}', 256)
    */
    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, sobrenome, dtNascimento, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    var instrucao = `
        INSERT INTO usuario (nome, sobrenome, dtNascimento, email, senha) VALUES ('${nome}', '${sobrenome}', '${dtNascimento}', '${email}', sha2('${senha}', 256));
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
};