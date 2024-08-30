// Dependencies
import express from 'express'
export const Router = express.Router()
import { Model } from './model.js'

// list users
Router.get('/', function (req, res) {
  let taglist = req.query.tags
  if (taglist) {
    // get users by tag
    taglist = taglist.split(',')

    Model.find({ tags: { $in: taglist } })
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(404).json({ message: 'not found' })
    })
  } else {
    Model.find({})
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
})

// save user info
Router.post('/', function (req, res) {
  const db = new Model()
  const firstName = req.body.firstName
  const lastName = req.body.lastName

  if (!firstName && !lastName) {
    res.status(422).send({ message: 'please enter firstname and lastname' })
  } else {
    db.firstName = firstName
    db.lastName = lastName
    db.save()
    .then(data => {
      res.status(200).send({ message: data })
    })
    .catch(err => {
      res.status(500).send({ message: 'error inserting to db' })
    })
  }
})

// get single user
Router.get('/:id', function (req, res) {
  Model.findById(req.params.id)
  .then(data => {
    const message = data.firstName + ' ' + data.lastName
    res.status(200).json({ data: message })
  })
  .catch(err => {
    res.status(404).json(err)
  })
})

// post tags
Router.post('/:id/tags', function (req, res) {
  const tags = req.body.tags

  Model.findById(req.params.id)
  .then(data => {
    data.tags = tags
    data.save()
    .then(updatedData => {
      res.status(200).json({})
    })
    .catch(err => {
      res.status(500).json({})
    })
  })
  .catch(err => {
    res.status(500).json({})
  })
})
