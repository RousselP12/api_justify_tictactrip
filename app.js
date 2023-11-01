const express = require('express')
const bodyParser = require('body-parser');
const justifyRoute = require('./routes/path');
const authroute = require('./routes/auth')
const isLogg = require('./routes/auth');
const router = require('./routes/path');
const authenticateToken = ('./routes/auth')

const app = express()
const port = 3000

app.get('/',  (req, res) => {

    res.send(" <p>Bienvenue sur Tictactrip Justify</p> \n cette api vous fourni un service de justification de votre texte \n et un service de gestion de l'authentification avec un eamil, et un token jwt \n \r \n \r Lien vers la documentation: <p> https://github.com/RousselP12/api_justify_tictactrip/tree/feat/auth#readme</p>")

})
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(express.json());

app.use('/api/justify',justifyRoute);
app.use('/api/token', authroute);




app.listen(port, () => console.log(`application works on: http://localhost:${port}`))


