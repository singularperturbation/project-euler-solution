var express = require('express');
var router = express.Router();
var answers = require('../answers');

/* GET home page. */
router.post('/', function(req, res) {
  var id = req.body.ProblemId;
  var userAnswer = req.body.Answer;
  if (! (id in answers) ){
    res.render('noSuchQuestion');
    return next();
  }

  if (answers[id] === ''){
    res.render('dontHaveAnswer');
    return next();
  }
  
  if( answers[id] !== userAnswer){
    res.render('wrongAnswer', {problemId: id, answer: userAnswer});
    return next();
  }

  if ( answers[id] === userAnswer){
    res.render('rightAnswer', { title: 'Project Euler (unofficial)',problemId: id, answer: userAnswer});
    return next();
  }

  // Should never get here:
  var err = new Error('Undefined behavior');
  next(err);

});

module.exports = router;
