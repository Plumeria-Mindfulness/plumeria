var express = require("express");
var router = express.Router();

var minhaPlumeriaController = require("../controllers/minhaPlumeriaController");

router.post("/publicarDuracaoData/:idUsuario", function (req, res) {
    minhaPlumeriaController.publicarDuracaoData(req, res);
});

router.post("/publicarDuracaoDataTemp/:idUsuario", function (req, res) {
    minhaPlumeriaController.publicarDuracaoDataTemp(req, res);
});


module.exports = router;