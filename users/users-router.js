const router = require('express').Router();
const axios = require('axios');

const Users = require('./users-model');

router.get('/', async (req, res, next) => {
    // Users.find()
    //     .then(users => {
    //         if(users) {
    //             res.status(200).json(users);
    //         } else {
    //             res.status(404).json({message: "could not find any users"})
    //         }
    //     })
    //     .catch(error => {
    //         next(error);
    //     })
    try {
        const users = await Users.find();
        if(users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({message: "could not find any users"});
        }   
    } catch(error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    // Users.findById(id)
    //     .then(user => {
    //         if(user) {
    //             res.status(200).json(user);
    //         } else {
    //             res.status(404).json({message: "could not find user by id"});
    //         }
    //     })
    //     .catch(error => {
    //         next(error);
    //     })
    try {
        const user = await Users.findById(id);
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: "could not find user by id"});
        }
    } catch (error) {
        next();
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Users.remove(id) 
        .then(user => {
            if(user) {
                res.status(200).json({deleted: user});
            } else {
                res.status(404).json({message: "could not find user by id"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Error deleting user"});
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Users.update(id, changes)
        .then(user => {
            if(user) {
                res.status(200).json({updated: user});
            } else {
                res.status(404).json({message: "could not find user by id"});
            }
        })
        .catch(error => {
            res.status(500).json({message: "error updating user"});
        })
})

module.exports = router;