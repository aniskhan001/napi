// Dependencies
const express = import('express')
const router = express.Router()
const Model = import('./model')

// list users
router.get('/', function (req, res) {
  let taglist = req.query.tags
  if (taglist) {
    // get users by tag
    taglist = taglist.split(',')

    Model.find({ tags: { $in: taglist } }, function (err, data) {
      if (err) {
        res.status(404).json({ message: 'not found' })
      } else {
        const users = []
        for (const x in data) {
          users.push({
            id: data[x].id,
            name: data[x].firstName + ' ' + data[x].lastName,
            tags: data[x].tags
          })
        }
        res.status(200).json(users)
      }
    })
  } else {
    Model.find({}, function (err, data) {
      if (err) {
        res.status(500).json(err)
        return
      }
      res.status(200).json(data)
    })
  }
})

// save user info
router.post('/', function (req, res) {
  const db = new Model()
  const firstName = req.body.firstName
  const lastName = req.body.lastName

  if (!firstName && !lastName) {
    res.status(422).send({ message: 'please enter firstname and lastname' })
  } else {
    db.firstName = firstName
    db.lastName = lastName
    db.save(function (err, data) {
      if (err) {
        res.status(500).send({ message: 'error inserting to db' })
      } else {
        res.status(200).send({ message: data })
      }
    })
  }
})

// get single user
router.get('/:id', function (req, res) {
  Model.findById(req.params.id, function (err, data) {
    if (err) {
      res.status(404).json(err)
    } else {
      const message = data.firstName + ' ' + data.lastName
      res.status(200).json({ data: message })
    }
  })
})

// post tags
router.post('/:id/tags', function (req, res) {
  const tags = req.body.tags

  Model.findById(req.params.id, function (err, data) {
    if (err) {
      res.status(500).json({})
      return
    }
    data.tags = tags
    data.save(function (err, updatedData) {
      if (err) {
        res.status(500).json({})
      } else {
        res.status(200).send({})
      }
    })
  })
})

module.exports = router
