const express = require("express")  
const router = express.Router();
const {
    registerUser,
    loginUser,
    currentUser
} =  require("../controllers/userController");
router.get("/",function(req,res){
    res.send("Hello World");
})


const validateToken = require("../middleware/validateTokenHandler");


router.post("/register",registerUser)

router.post("/login",loginUser)

router.get("/current",validateToken, currentUser)

module.exports = router;