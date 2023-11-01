const express = require('express')
const bodyParser = require('body-parser');
const justifyRoute = require('./routes/path');
const authroute = require('./routes/auth')
const isLogg = require('./routes/auth');
const authenticateToken = ('./routes/auth')

const app = express()
const port = 3000


app.use(bodyParser.text({ type: 'text/plain' }));
app.use(express.json());

app.use('/api/justify',justifyRoute);
app.use('/api/token', authroute);



app.listen(port, () => console.log(`application works on: http://localhost:${port}`))


