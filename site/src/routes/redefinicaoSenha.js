var express = require("express");
var router = express.Router();

var redefinicaoSenhaController = require("../controllers/redefinicaoSenhaController");

router.post("/redefinirSenha/:idUsuario", function (req, res) {
    redefinicaoSenhaController.redefinirSenha(req, res);
});

module.exports = router;