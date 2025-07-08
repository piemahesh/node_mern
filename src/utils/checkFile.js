const fsPromise = require('fs/promises')

async function getData () {
  const data = await fsPromise.readFile(
    'F:\\mernStack\\backend-ecommerce\\users.json',
    'utf-8'
  )
  
  return JSON.parse(data)
}

module.exports = { getData }
