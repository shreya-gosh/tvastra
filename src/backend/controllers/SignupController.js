//const dbConn = require("../database/sqlite.js");
const db = require("../database/mongodb.js");

//const User= dbConn.Users;

module.exports={
    signup: signup
};

function signup(req, res){
    const {name, email, password,number,gender, DOB, city, state, country, doctor} = req.body;
    if(!(name && email && password))
        return res.render("signup",{
            msg: "Please enter all the required details"
        });
    else{
        var data = { 
            "name": name, 
            "email":email, 
            "password":password, 
            "number":number,
            "gender":gender,
            "DOB":DOB,
            "city":city,
            "state":state,
            "country":country
        } 
        db.collection('users').insertOne(data,function(err, collection){ 
            if (err){
                console.log(err);
                throw err;
            } 
            else{
                console.log("Record inserted Successfully"+collection); 
                req.session.email= email;
                //req.session.user_id= user.id;
                req.session.name=name;
                console.log(req.session.email,req.session.name);
                if(doctor == "yes")
                    return res.render("doctor_signup", {name: req.session.name})
                return res.redirect("/",);
            }
                  
        }); 
    }
}
/*function signup(req, res){
    const {name, email, password,number,gender, DOB, city, state, country, doctor} = req.body;
    if(!(name && email && password))
        return res.render("signup",{
            msg: "Please enter all the required details"
        });
    else{
        User.create({
            name,
            email,
            password,
            number,
            gender,
            DOB,
            city,
            state,
            country
        })
        .then(users=>{
            var user=users.dataValues;
            req.session.email= user.email;
            req.session.user_id= user.id;
            req.session.name=user.name;
            if(users){
                if(doctor == "yes")
                    return res.render("doctor_signup", {name: req.session.name})
                return res.redirect("/",);
            }            
        })
        .catch(err=>{
            console.log("user not created",err);
            return res.redirect("/");
        });
    }
}*/