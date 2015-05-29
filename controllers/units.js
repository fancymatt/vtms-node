var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
  res.render('units/unit', {title: "Units"});
});

module.exports = router;