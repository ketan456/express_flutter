const mongoose =  require("mongoose")   
const userSchema =  mongoose.Schema({

    username:{
        type:String,
        required:[true, "please add the use name"],
    },
    email:{
        type:String,
        required:[true, "please add the user email address"],
        unique:[true, "Email address already taken"]
    },
    password:{
        type:String,
        required:[true, "please add the user password"],
    }
},
    {
        timestamps:true
    }
)

module.exports = mongoose.model("User",userSchema);