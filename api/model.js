import mongoose from 'mongoose'
import config from './config'

mongoose.connect(config.uri)

const userSchema = {
  firstName: String,
  lastName: String,
  tags: Array
}

module.exports = mongoose.model('users', userSchema)
