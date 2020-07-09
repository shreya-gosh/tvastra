const mongoose = require('mongoose');

var UserSchema= new mongoose.Schema({
    name:{
        type: String,
        required: "Required"
    },
    email:{
        type: String,
        unique: true,
        required: "Required"
    },
    password:{
        type: String,
        allowNull:false
    },
    number:{
        type: String,
        allowNull:false
    },
    gender:{
        type: String,
        required: "Required"
    },
    DOB:{
        type: String,
        required: "Required"
    },
    city:{
        type: String,
        required: "Required"
    },
    state:{
        type: String,
        required: "Required"
    },

    country:{
        type: String,
        required: "Required"
    }
});

mongoose.model("User", UserSchema)