const express = require('express');
const justifyText = require('../function/justify');
const checkAuth = require('../function/auth')


const router = express.Router();

const wordsPerDay = {}; // Stocke le nombre de mots justifiés par token
const maxWords = 80000; // Limite de 80 000 mots par jour

// Middleware pour le nombre de mot max
function rateLimitMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const input = req.body;

  const wordCount = input.split(/\s+/).length;
 

  // Vérification si le token existe dans l'objet wordsPerDay
  if (wordsPerDay[token] === undefined) {
    wordsPerDay[token] = wordCount; // Première requête avec ce token pour la journée
  } else {
    wordsPerDay[token] += wordCount; // Incrémentation le nombre de mots justifiés avec ce token
    
  }

  // Vérification si la limite de mots a été atteinte
  if (wordsPerDay[token] > maxWords) {
    return res.status(402).json({ error: 'Payment Required' });
  }
  console.log(wordsPerDay)

  next();
}

router.post('/', checkAuth, rateLimitMiddleware,  (req, res) => {

    const input = req.body;
  
    if (!input) {
      return res.status(400).json({ error: "Merci d'entrer un type de texte correct" });
    }
  
    const justifiedText = justifyText(input);
  
    res.status(200).send(justifiedText);
  });



  module.exports = router;