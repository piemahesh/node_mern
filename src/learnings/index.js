const express = require('express')
require('dotenv').config()

// app or server is create
const app = express()

console.log(process.env.PORT_NO)

const port = process.env.PORT_NO || 3300

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

app.get('/', (_, res) => {
  console.log('request hited')
  res.send({ success: true, message: 'server is successfully runned' })
})

app.get('/user/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  const users = [
    {
      id: 1,
      name: 'farhana'
    },
    {
      id: 2,
      name: 'vignesh'
    },
    {
      id: 3,
      name: 'naveen'
    }
  ]

  let myuser = users.find(user => user.id == id)
  res.json(myuser).status(200)
})
