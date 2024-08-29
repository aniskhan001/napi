const express = import('express')
const bodyParser = import('body-parser')
var morgan = import('morgan')

const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(morgan('combined'))

// Router definitions
app.get('/', (req, res) => {
  res.status(200).send('NAPI NAPI')
})
app.use('/users', import('./api/router'))

app.listen(PORT)
console.log('API working on PORT: ' + PORT)

module.exports = app
