const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require('./auth-model');

router.post('/register', async (req, res, next) => {
  try {
		const { username, password, age, email } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await Users.add({
			username,
            password: await bcrypt.hash(password, 15),
            age,
            email
		})

		res.status(201).json(newUser)
	} catch(err) {
		res.status(400).json({message: "must input username, password, age (integer), and email"})
	}
});

router.post('/login', async (req, res, next) => {
  try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()

		if (!user) {
			return res.status(401).json({
				message: "Username not found",
			})
		}

		const passwordValid = await bcrypt.compare(password, user.password)

		if(!passwordValid){
			return res.status(401).json({
				message: "Invalid Password",
			})
        } 

        const token = jwt.sign({
            userId: user.id,
        }, process.env.JWT_SECRET)


		res.json({
            message: `Welcome ${user.username}!`,
            token: token,
		})
	} catch(err) {
		next(err);
	}
});

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(error => {
            if(error) {
                res.status(400).json({message: "could not log out: ", why: error})
            } else {
                res.status(200).json({message: 'successfully logged out'});
            }
        })
    } else {
        res.end();
    }
})

module.exports = router;
