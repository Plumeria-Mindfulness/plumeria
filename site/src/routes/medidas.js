var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idUsuarioDash", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/ultimas2/:idUsuarioDash", function (req, res) {
    medidaController.buscarUltimasMedidas2(req, res);
});

router.get("/tempo-real/:idUsuarioDash", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;