require('dotenv').config();

const session = require('express-session');

const knexSessionStore = require('connect-session-knex')(session);

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router.js');
const campaignRouter = require('../campaigns/campaigns-router.js');
const authMiddleware = require('../auth/restricted-middleware.js');

const server = express();

const sessionConfig = {
    name: 'auth1session', 
    secret: 'nicopico',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore({
        knex: require('../database/config.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/campaigns', authMiddleware.restrict(), campaignRouter);

server.get('/', (req, res) => {
    res.json({api: 'up and running!'});
})

module.exports = server;
