const router = require('express').Router();
const axios = require('axios');

const Campaigns = require('./campaigns-model');

router.post('/', async (req, res, next) => {
    try {
        const {name, user_id} = req.body;
        const campaign = await Campaigns.findBy({name}).first()

        if(campaign) {
            return res.status(409).json({message: "The name for this campaign already exists"})
        }

        const newCampaign = await Campaigns.add({
            name, user_id
        })

        res.status(201).json(newCampaign);

    } catch(error) {
        next(error);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const campaigns = await Campaigns.find();
        res.status(200).json(campaigns);
    } catch(error) {
        res.status(404).json({message: "could not find any campaigns"});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const campaign = await Campaigns.findById(id);
        res.status(200).json(campaign);
    } catch (error) {
        res.status(404).json({message: "could not find that campaign by id"});
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Campaigns.remove(id) 
        .then(campaign => {
            if(campaign) {
                res.status(200).json({deleted: campaign});
            } else {
                res.status(404).json({message: "could not find campaign by id"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Error deleting campaign"});
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Campaigns.update(id, changes)
        .then(campaign => {
            if(campaign) {
                res.status(200).json({updated: campaign});
            } else {
                res.status(404).json({message: "could not find campaign by id"});
            }
        })
        .catch(error => {
            res.status(500).json({message: "error updating campaign"});
        })
})

module.exports = router;