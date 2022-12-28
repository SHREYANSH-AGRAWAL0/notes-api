const router = require('express').Router();
const user = require('../models/User');
const bcrypt = require('bcrypt')

router.get('/allUsers', async (req, res) => {
    var users = await user.find();
    console.log('all users')
    res.json(users);
})

router.get('/:email', async (req, res) => {
    var email = req.params.email; 
    var founduser = await user.findOne({ email: email })
    if (!founduser) {
        res.json({ success: false, error: "user not found" }); 
        return; 
    }
    res.json({ success: true, founduser })
    return; 
})

router.post('/addUser', async (req, res) => {
    await user.deleteOne({ userid: req.body.userid })
    await user.deleteOne({ email: req.body.email })
    await user.deleteOne({ phone: req.body.phone })
    const userdata = req.body; 

    //Encrypted the password
    const password = userdata.password
    const salt = await bcrypt.genSalt(7)
    const encryptpassword = await bcrypt.hash(password, salt); 
    userdata.password = encryptpassword; 

    // adding to the database
    const newUser = new user(userdata)
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

router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const founduser = await user.findOne({ email: email })
    if (!founduser) {
        res.json({ success: false, error: "user not found" }); 
        return; 
    }

    const correctpassword = await bcrypt.compare(password, founduser.password); 
    
    if (!correctpassword) {
        res.json({ success: false, error: "password not matched" })
        return 
    }
    res.json({success: true,data:founduser})

})

module.exports = router; 