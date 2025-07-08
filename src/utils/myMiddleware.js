const { trimString } = require('../helpers/trimString')

function authMiddleware (req, res, next) {
  let name = 'ocean'
  if (name.toLowerCase() == 'ocean') {
    console.log('send next successfully')
    next()
  } else {
    res.send({ message: 'token invalid' })
  }
}

function userCreationMiddleware (req, res, next) {
  if (req.body == undefined) {
    return res.send({ messge: 'name or age or email is required' })
  }
  const { name, age, email } = req.body
  const newName = trimString(name)
  const newEmail = trimString(email, true)
  console.log(newName, newEmail)
  console.log('all are cleared')
  let user = { name: newName, email: newEmail, age }
  req.data = user
  next()
}

module.exports = {
  authMiddleware,
  userCreationMiddleware
}
