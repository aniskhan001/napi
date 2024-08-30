import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import {Router} from './api/router.js'

export const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(morgan('combined'))

// Router definitions
app.get('/', (req, res) => {
  res.status(200).send('NAPI NAPI')
})
app.use('/users', Router)

app.listen(PORT)
console.log('API working on PORT: ' + PORT)
