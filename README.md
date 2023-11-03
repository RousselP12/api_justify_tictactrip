# Tictactrip_api_justify

this repository provides an API for justifying an insert of type plain text. It also provides a jwt authentification.

### this is the public url link. you can use it yo access to the api directly in your application

[link to post the email and generate the token](https://api-justify-tictactrip.vercel.app/api/token "https://api-justify-tictactrip.vercel.app/api/token")

[Link to post the text plain](https://api-justify-tictactrip.vercel.app/api/justify "https://api-justify-tictactrip.vercel.app/api/justify")


## Dependencies

```
npm install express
npm install nodemon
npm install --save @types/body-parser
npm install json webtoken
```

## How to use?

## Justify

in the '/route/path' file which contains the raw text recovery endpoint. it contains the middleware which will count the maximum number of characters used by a token

```javascript
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
```

with this line you will import the middleware to format the text

```javascript
    const justifyText = require('../function/justify');
```

this is the middleware to justify the text

```javascript
    function justifyText(text="") {
    const maxLineLength = 80;
    let words = text.split(/\s+/);
    let currentLine = '';
    let justifiedLines = [];
  
    for (const word of words) {
      if (currentLine.length + word.length <= maxLineLength) {
        currentLine += word + ' ';
      } else {
        justifiedLines.push(justifyLine(currentLine.trim(), maxLineLength));
        currentLine = word + ' ';
      }
    }
  
    justifiedLines.push(justifyLine(currentLine.trim(), maxLineLength));
    return justifiedLines.join('\n');
  }
  
  function justifyLine(line, maxLength) {
    const words = line.split(' ');
  
    if (words.length === 1) {
      return line;
    }
  
    let espace = maxLength - line.length;
    let spacesToAdd = 0;
  
    while (espace > 0) {
      words[spacesToAdd % (words.length - 1)] += ' ';
      spacesToAdd++;
      espace--;
    }
    return words.join(' ');
  }

  module.exports = justifyText;
```

## Authentificate

to manage the authentification we will create a fisrt middleware that will generate a jwt when a valid email will passed. Notice for the example we use a mock-email "foo@bar.com"

```javascript
    const express = require('express')
const jwt = require('jsonwebtoken');

const router = express.Router();

const TestEmail = require('../mock-email.json')

const secretKey = 'signature'; 

router.post('/', (req, res) => {
    const { email } = req.body;
  
    if (!email || email != TestEmail.email) {
      return res.status(400).json({ error: 'Mauvais email' });
    }
  
    const token = jwt.sign({ email }, secretKey , { expiresIn: '24h' });

    res.status(200).json({ token });
  });

module.exports = router;
```

after the generation of the token it must be stored in order to be able to pass it in the header each time we make a post on the "api/justify" point

```javascript
    const jwt = require('jsonwebtoken');


function authenticate(req, res, next) {
 
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const secretKey = 'signature'; 

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err) => {
    if (err) {
      return res.status(403).json({erreur:"authentification requise mauvais token"});
    }
    next();
  });
}
module.exports = authenticate;

```

## Scripts

Run using npm.

    run start       - run the programm with nodemon, then program will stay awake and will reload itself eachtime when you'll save.
