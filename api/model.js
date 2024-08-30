import mongoose from 'mongoose'
import {Config} from './config.js'

mongoose.connect(Config.uri)

const userSchema = {
  firstName: String,
  lastName: String,
  tags: Array
}

export const Model = mongoose.model('users', userSchema)
