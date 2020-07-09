
module.exports={
    login: login,
    otp_login:otp_login,
    otp: otp,
    index: index,
    signup: signup,
    doctor_signup: doctor_signup,
    otp_password_number:otp_password_number,
    password_otp_validate:password_otp_validate,
    password_reset: password_reset,
    about: about,
    about_hospital: about_hospital,
    booking: booking,
    contact: contact,
    doctor_profile: doctor_profile,
    doctors: doctors,
    faq: faq,
    hospitals: hospitals,
    submit_your_query: submit_your_query,
    treatment: treatment,
    tvastra_plus: tvastra_plus,
    logout: logout,
    doc_post: doc_post
};

function signup(req, res){
    res.render("signup");
}

function doctor_signup(req,res){
    res.render("doctor_signup");
}
function login(req, res){
    res.render("login.ejs", {err:""});
}

function otp_login(req, res){
    res.render("otp-login");
}

function otp(req, res){
    res.render("otp-verification")
}

function otp_password_number(req, res){
    res.render("otp-password-number")
}

function password_otp_validate(req, res){
    res.render("password_otp_validate")
}

function index(req, res){
    if (req.session.email) {
        res.render("index");
      } else {
        res.redirect("/login")
      }
}

function password_reset(req, res)
{
    res.render("password-reset")
}
function about(req, res){
    res.render("about");
}

function about_hospital(req, res){
    res.render("about-hospital");
}

function booking(req, res){
    res.render("booking");
}

function contact(req, res){
    res.render("contact");
}

function doctor_profile(req, res){
    res.render("doctor-profile");
}

function doctors(req, res){
    res.render("doctors");
}

function faq(req, res){
    res.render("faq");
}
function hospitals(req, res){
    res.render("hospitals");
}
function submit_your_query(req, res){
    res.render("submit-your-query");
}
function treatment(req, res){
    res.render("treatment");
}
function tvastra_plus(req, res){
    res.render("tvastra-plus");
}

function logout(req, res){
    console.log("logout reached")
    req.session.destroy();
    res.redirect("/login");
}

function doc_post(req, res){
    console.log("doctor signup post reached");
    var obj= JSON.parse(req.body.speciality);
    obj.forEach(element => {
        console.log(element.value);
    });
    console.log(typeof(JSON.parse(req.body.speciality)))
    res.redirect("/login");
}


