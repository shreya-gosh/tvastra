const db = require("../database/mongodb.js");

module.exports={
    reset: reset
};


function reset(req, res){
    const email = req.session.email;
    const query = {email : req.session.email};
    const newValues = {$set: {password: req.body.password}}
        db.collection('users').updateOne(query, newValues ,function(err, result){ 
            if (err){
                console.log(err);
                throw err;
            } 
            else{
                res.redirect("/login")
            }
        });
    
}





/*const dbConn = require("../database/sqlite.js");

const User= dbConn.Users;

module.exports={
    reset: reset
};

function reset(req, res){
    User.findOne({
        where:({
            id: req.session.user_id
        })
    })
        .then(users=>{
            var user=users.dataValues;
            var password= req.body.password;
            if(users){
                users.update({
                    password: password
                })
                .then(users=>{
                    res.redirect("/login")
                })
                .catch(err=>{
                    console.log(err, "password not updated");
                    res.redirect("/login");
                })
            }
        })
        .catch(err=>{
            console.log(err, "user not found after otp verification");
            res.redirect("/login");
        })
    
}*/