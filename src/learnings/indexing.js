const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const { getData } = require('../utils/checkFile')

const app = express()

app.use(bodyParser.json())

app.listen(3000, () => {
  console.log(`http://localhost:3000`)
})

//  query params
app.get('/', (req, res) => {
  const { id, token } = req.query
  console.log({ id, token })
  res.send({ data: 'hi' })
})
// params
app.get('/:id', (req, res) => {
  const { id } = req.params
  res.send({ id })
})

app.post('/make-user', async (req, res) => {
  const user = req.body
  try {
    const data = await getData()
    if (data.length > 0) {
      let isPresent = data.find(u => u.id == user.id)
      if (isPresent) {
        return res.send({ mesage: 'user id already exists' })
      }
      data.push(user)
      fs.writeFile('users.json', JSON.stringify(data), err => {
        if (err) {
          res.send({ message: err })
        }
        res.send({ mesage: 'user created successfully' })
      })
    }
    else{
        data.push(user)
        fs.writeFile('users.json', JSON.stringify(data), err => {
        if (err) {
          res.send({ message: err })
        }
        res.send({ mesage: 'user created successfully' })
      })
    }
  } catch (error) {
    res.send({ message: error })
  }
})
