// //  data source

// const users = [
//   { id: 1, name: 'farhana', email: 'farhana@gmail.com' },
//   { id: 2, name: 'pavithra', email: 'pavithra@gmail.com' }
// ]

// function makeUser (user) {
//   const {name, email, age}  = user
//   if (!name || !email || !age) {
//     throw Error('name or age or email is not given')
//   }
//   users.find(us => {
//     if (us.name == name || us.email == email) {
//       throw Error('name  or email is already present')
//     }
//   })

//   return { name, email, age }
// }

// module.exports = {
//   makeUser
// }

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
