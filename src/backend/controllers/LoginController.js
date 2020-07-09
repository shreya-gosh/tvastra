const db = require("../database/mongodb.js");

module.exports={
    login: login
};


function login(req, res){
    const {email, password} = req.body;
    if(!(email && password))
        return res.render("login",{
            err: "Please enter all the required details"
        });
    else{
        db.collection('users').findOne({"email": email, "password":password},'*',function(err, result){ 
            if (err){
                console.log(err);
                throw err;
            } 
            else{
                if(result){
                    console.log("user found");
                    req.session.email= result.email;
                    req.session.name=result.name;
                    return res.redirect("/");
                }          
                else
                {
                    res.render("login",{err:"Incorrect email or password"})
                }
            }
        });
    }
}

/*const dbConn = require("../database/sqlite.js");
const User= dbConn.Users;
const Sequelize= require("sequelize");
module.exports={
    login: login
};

function login(req, res){
    const {email, password} = req.body;
    if(!(email && password))
        return res.render("sign-in",{
            msg: "Please enter all the required details"
        });
    else{
        User.findOne({
            where:Sequelize.and({
                email: email,
                password: password
            })
        })
        .then(users=>{
            var user=users.dataValues;
            console.log("user found");
            req.session.email= user.email;
            req.session.user_id= user.id;
            req.session.name=user.name;
            if(users){
                return res.redirect("/");
            }            
        })
        .catch(err=>{
            console.log("user not found");
            console.log(err);
            return res.render("login", {err : "Incorrect email or password"});
        });
    }
}*/