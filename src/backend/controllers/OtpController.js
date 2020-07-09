const Nexmo = require('nexmo');
const db = require("../database/mongodb.js");
module.exports={
  request:request,
  validate: validate
 }

 const nexmo = new Nexmo({
  apiKey: '67ca084d',
  apiSecret: 'YGvS1teu1TU6pNf6',
});

function request(req , res, next){
  
  const mobile_number= req.body.number;
  console.log(mobile_number);
  db.collection('users').findOne({"number": mobile_number},'*',function(err, result){
    if(err)
    {
      console.log(err);
      throw(err);
    }
    if(result)
    {
      req.session.email= result.email;
      req.session.name= result.name;
      var mobile_number= "91"+result.number;
      nexmo.verify.request({
        number: mobile_number,
        brand: 'Vonage',
        code_length: '4'
      }, (err, result) => {
        if(err)
        {
          console.log(err);
          res.redirect("/otp-login");
        }
        else
        {
          console.log(result);
          req.session.request_id=result.request_id;
          req.session.mobile_number=mobile_number;
          next();
        }
      });
    }
    else{
      res.redirect("/login");
    }
  });
}

function validate(req,res, next){
  var code= req.body.code;
  nexmo.verify.check({
    request_id: req.session.request_id,
    code: code
  }, (err, result) => {
    if(err)
    {
      console.log(err);
      req.session.destroy();
      res.redirect("/otp-request")
    }
    else
    {
      if(result.status == 0)
      {
        console.log("otp verified")
        next();
      }
      else
      {
        req.session.destroy();
        res.redirect("/otp-request")
      }
    }
  });
}

/*const Nexmo = require('nexmo');
const dbConn = require("../database/sqlite.js");

const User= dbConn.Users;
const nexmo = new Nexmo({
  apiKey: '67ca084d',
  apiSecret: 'YGvS1teu1TU6pNf6',
});

function request(req , res, next){
  
  const mobile_number= req.body.number;
  console.log(mobile_number);
  User.findOne({
    where:({
      number: mobile_number
    })
  })
  .then(users=>{
    if(users){
      var user=users.dataValues;
      req.session.email= user.email;
      req.session.user_id= user.id;
      req.session.name=user.name;
      var mobile_number= users.dataValues.number;  
      nexmo.verify.request({
      number: mobile_number,
      brand: 'Vonage',
      code_length: '4'
    }, (err, result) => {
      if(err)
      {
        console.log(err);
        res.redirect("/otp-login");
      }
      else
      {
        console.log(result);
        req.session.request_id=result.request_id;
        req.session.mobile_number=mobile_number;
        next();
      }
    });
  }
  else
  {
    console.log("no such number found");
    res.redirect("/otp-login");
  }
})
.catch(err=>{
  console.log(err);
})
}

function validate(req,res, next){
  var code= req.body.code;
  nexmo.verify.check({
    request_id: req.session.request_id,
    code: code
  }, (err, result) => {
    if(err)
    {
      console.log(err);
      req.session.destroy();
      res.redirect("/otp-request")
    }
    else
    {
      if(result.status == 0)
      {
        console.log("otp verified")
        next();
      }
      else
      {
        req.session.destroy();
        res.redirect("/otp-request")
      }
    }
  });
}

module.exports={
 request:request,
 validate: validate
}
*/
  