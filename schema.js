const mongoose=require('mongoose')

const UserSchema= new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    cuisine:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        require:true
    },
    menu:[{
        name:{
            type:String,
            require:true
        },
        description:{
            type:String
        },
        price:{
            type:Number,
            require:true
        }
    }]

})

module.exports = mongoose.model("User", UserSchema);
