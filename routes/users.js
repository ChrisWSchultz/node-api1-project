const express = require('express')
const nanoid = require('nanoid')

const router = express.Router()

let users = []

router.get('/users', async (request, response, next) => {
    try {
        response.status(200).json(users)
    } catch (error) {
        response.status(500).json({"message": "an error occured"})
    }
})

router.get('/users/:id', async (request, response, next) => {
    try {
        let id = request.params.id
        let result = users.filter((user) => {return user.id === id})

        response.status(200).json(result)
    } catch (error) {
        response.status(500).json({"message": "an error occured"})
    }

})

router.post('/users', async (request, response, next) => {
    try {
        let user = {
            id: nanoid.nanoid(6),
            name: request.body.name,
            bio: request.body.bio
        }

        if (user.name && user.bio) {
            users.push(user)
            response.status(200).json(users)
        } else {
            response.status(400).json({"message": "name and bio are required"})
        }
    } catch (error) {
        response.status(500).json({"message": "an error occured"})
    }
})

router.put('/users/:id', async (request, response, next) => {
    try {
        let id = request.params.id

        if (request.body.name && request.body.bio) {
            let result = users.filter((user) => {return user.id === id})[0]

            if (result) {
                users = users.filter((user) => {return user.id !== id})
                result = {id: result.id, name: request.body.name, bio: request.body.bio}
                users.push(result)
                response.status(200).json(users)
            } else {
                response.status(404).json({"message": "user not found"})
            }
        } else {
            response.status(400).json({"message": "name and bio are required"})
        }
    } catch (error) {
        response.status(500).json({"message": "an error occured"})
    }
})

router.delete('/users/:id', async (request, response, next) => {
    try {
        let id = request.params.id

        let result = users.filter((user) => {return user.id === id})[0]
        if (result) {
            users = users.filter((user) => {return user.id !== id})
            response.status(200).json(users)
        } else {
            response.status(404).json({"message": "user not found"})
        }
    } catch (error) {
        response.status(500).json({"message": "an error occured"})
    }
})


module.exports = router
