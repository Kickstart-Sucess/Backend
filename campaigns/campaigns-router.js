const router = require('express').Router();
const axios = require('axios');

const Campaigns = require('./campaigns-model');

router.post('/', async (req, res, next) => {
    try {
        const {name, user_id, imageURL, description} = req.body;
        const campaign = await Campaigns.findBy({name}).first()

        if(campaign) {
            return res.status(409).json({message: "The name for this campaign already exists"})
        }

        const newCampaign = await Campaigns.add({
            name, user_id, imageURL, description
        })

        await axios.post(`https://kickstartersuccess.herokuapp.com/predict?item=${description}`, {item: description})
            .then(response => {
                const predictions = {prediction: parseInt(response.data.success_failure)};
                const id = newCampaign.id;
                Campaigns.update(id, predictions)
                    .then(updated => {
                        if(updated) {
                            res.status(200).json({newCampaign, predictions})
                        } else {
                            console.log('couldnt find id for stupid campaign')
                            res.status(500).json({message: "flukdhakfd"})
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        next(error)
                    })
                
            })
            .catch(error => {
                res.status(400).json({message: 'Please input item: `description`'});
            })

            

    } catch(error) {
        res.status(400).json({message: "Please input name, user_id and imageURL"});
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

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const campaign = await Campaigns.findById(id);
        if(campaign) {
            res.status(200).json(campaign);
        } else {
            res.status(404).json({message: "could not find campaign by id"});
        }
    } catch (error) {
        next();
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

    console.log(id);
    console.log(req.body);

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