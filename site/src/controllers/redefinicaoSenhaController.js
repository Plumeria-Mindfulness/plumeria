var redefinicaoSenhaModel = require("../models/redefinicaoSenhaModel");

function redefinirSenha(req, res) {
    var emailRedefinicao = req.body.emailRedefinicao;
    var novaSenha = req.body.novaSenha;

    if (emailRedefinicao == undefined) {
        res.status(400).send("O seu email está undefined!")
    } else if (novaSenha == undefined) {
        res.status(400).send("A nova senha está undefined!")
    } else {
        redefinicaoSenhaModel.redefinirSenha(emailRedefinicao, novaSenha)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

module.exports = {
    redefinirSenha
}