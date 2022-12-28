const router = require('express').Router();
const user = require('../models/User');

router.get('/allUsers', async (req, res) => {
    var users = await user.find();
    console.log('all users')
    res.json(users);
})

router.post('/addUser', async (req, res) => {
    await user.deleteOne({ userid: req.body.userid })
    await user.deleteOne({ email: req.body.email })
    await user.deleteOne({ phone: req.body.phone })
    const newUser = new user(req.body)
    await newUser.save(function (err) {
        if (err) {
            const response = { success: false, error: err };
            res.json(response)
            return;
        }
        const response = { success: "true", newUser }
        console.log('new User added')
        res.json(response);
    });
})






module.exports = router; 