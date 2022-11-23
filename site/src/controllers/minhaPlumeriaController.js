var minhaPlumeriaModel = require("../models/minhaPlumeriaModel");

function publicarDuracaoData(req, res) {
    var totMinFinal = req.body.totMinFinal;
    var dataString = req.body.dataString;
    var idUsuario = req.params.idUsuario;
    
    if (totMinFinal == undefined) {
        res.status(400).send("A duração da sessão está indefinida!");
    } else if (dataString == undefined) {
        res.status(400).send("A data da sessão está indefinida!");
    } else {
        minhaPlumeriaModel.publicarDuracaoData(totMinFinal, dataString, idUsuario)
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
    publicarDuracaoData
}