const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const userModal = require("../models//userModal");
const { use } = require("../routes/contactRoutes");
const jwt = require("jsonwebtoken");

//@desc create user
// @route Get /api/contacts/id
//access public
const registerUser = asyncHandler(async function(req,res, next){
    const { username,  email, password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("please add all fields");
    }

    const userAvailable = await userModal.findOne({email});
    if(userAvailable){
        res.status(400)
        throw new Error("User already exist");
    }

    //  hash password
    const hashPassword = await bcrypt.hash(password, 10)
    console.log("password", hashPassword);

    const user = await userModal.create({
        username,
        email,
        password:hashPassword
    })
    console.log("user create : ",user)
if(user){
    res.status(201).json({_id:user.id,email:user.email});
}else{
    res.status(400);
    throw new Error("User data us not valid");
}
    res.status(200).json({message:"register User"});
});


//@desc login user
// @route Get /api/contacts/id
//access public
const loginUser= asyncHandler( async function(req,res){
    const { email , password } = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory");
    }
    const user = await userModal.findOne({email});
    //compare password with hash password

    if(user && ( await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {user:{
                username : user.username,
                email:user.email,
                id:user.id
            }},
            process.env.ACCESS_TOKEN_SECERT,
            {expiresIn:"1600m"}

        );
        res.status(200).json({accessToken,username:user.username,email:user.email})
    }else{
        res.status(401)
        throw new Error("email or password is not valid")
    }
    res.status(200).json({message:"loin User"});
    }
)

//@desc Current user
// @route Get /api/contacts/id
//access protected(only registar)
const currentUser = asyncHandler( async function(req,res){
    // res.json(req.user)
    console.log("run2")
     res.status(200).json(req .user);
})

module.exports = {registerUser, loginUser, currentUser}