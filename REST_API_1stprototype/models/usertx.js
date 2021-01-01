const mongoose = require('mongoose')

const usertxSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  orgName: {
      type: String,
      required: true
  },
  
  txids: [String]
})

module.exports = mongoose.model('usertx', usertxSchema)

