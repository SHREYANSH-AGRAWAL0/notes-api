const User = require('../models/User');

module.exports.createUser = async (req, res) => {

    const currentUser = await User.findOne({ email: req.body.email })

    if (!currentUser) {
        const newUser = User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name 
        }); 
        await newUser.save();
        console.log("Created new User");
        const response = "Account Created Successfully!" ; 
        res.json(response); 
        return;
    }

    console.log("User already exists");
    const response = "User already exists"; 
    res.json(response); 
    return;

};

module.exports.signIn = (async (req, res) => {
    
    const currentUser = await User.findOne({ email: req.body.email }); 

    if (!currentUser) {
        console.log("User does not exist")
        res.json("User does not exist"); 
        return; 
    }

    if (currentUser.password != req.body.password) {
        console.log("Password does not match")
        res.json("Password does not match"); 
        return; 
    }

    console.log("User Logged in"); 
    res.json(currentUser); 
    return; 
        
        
    // const currentUser = await User.findOne({ email: req.body.email, password: req.body.password })
    // if (currentUser) {
    //     console.log("User Logged in");
    //     res.json(currentUser);
    //     return;
    // }
    // console.log("User not logged in");
    //     res.json("Email or Password Invalid");
    //     return;
})

