var express = require('express');
var project = require('../services/project');
var router = express.Router();
/* GET register page. */
router.get('/', function(req, res, next) {
   res.render('register');
});
/* register register listing. */
router.post('/save', function(req, res, next) {
   project.save(req.body).then(function(data){res.send(data)});
});
module.exports = router;