const router = require('express').Router();
const axios = require('axios');

const Metrics = require('./metrics-model');

router.post('/campaigns/:id/metrics', async (req, res, next) => {
    try {
        const {description} = req.body;
        const id = req.params.id;

        axios.post('https://kickstartersuccess.herokuapp.com/predict', {description: description})
            .then(response => {
                const predictions = response.data;
                res.status(200).json({description: description, prediction: predictions, campaign_id: id})
            })
            .catch(error => {
                res.status(400).json({message: 'Please input description'});
            })
    } catch(error) {
        next(error)
    }
})

module.exports = router;