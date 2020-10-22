const router = require('express').Router();
const axios = require('axios');

const Metrics = require('./metrics-model');

router.post('/metrics', async (req, res, next) => {
    try {
        const {description, campaign_id} = req.body;

        axios.post('https://kickstartersuccess.herokuapp.com/predict', {description: description, campaign_id: campaign_id})
            .then(response => {
                const predictions = response.data;
                res.status(200).json({description: description, prediction: predictions})
            })
            .catch(error => {
                res.status(400).json({message: 'Please input description and campaign_id'});
            })
    } catch(error) {
        next(error)
    }
})