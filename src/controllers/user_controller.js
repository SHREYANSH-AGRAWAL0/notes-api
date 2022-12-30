const User = require('../models/User');

module.exports.createUser = async (req, res) => {
    //create user;

    const currentUser = await User.findOne({ email: req.body.email })

    if (!currentUser) {
        const newUser = User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name 
        }); 
        await newUser.save();
        console.log("Created new User");
        const response = { message: "New User Created Successfully" }; 
        res.json(response); 
        return;
    }

    console.log("User already exists");
    const response = { message: "User Already Exists" }; 
    res.json(response); 
    return;

};

module.exports.signIn = ( async (req, res) => {

    const currentUser = await User.findOne({ email: req.body.email, password: req.body.password })
    
    if (currentUser) {
        console.log("User Logged in");
        res.json(currentUser);
        return;
    }

    console.log("User not logged in");
        res.json({ message: "Incorrect Email and password" });
        return;

})

