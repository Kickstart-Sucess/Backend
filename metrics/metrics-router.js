const router = require('express').Router();
const axios = require('axios');

const Metrics = require('./metrics-model');

router.post('/metrics', async (req, res, next) => {
    try {
        const {campaign_id, monetary_goal, description, campaign_length, category} = req.body;

        axios.post('DS API url', campaign_id, monetary_goal, description, campaign_length, category)
            .then(response => {
                const predictions = response.data;
                res.status(200).json({prediction: predictions})
            })
            .catch(error => {
                res.status(500).json({message: 'Error submitting form'});
            })
    } catch(error) {
        next(error)
    }
})