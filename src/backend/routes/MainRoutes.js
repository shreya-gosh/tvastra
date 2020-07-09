const express= require("express");
const mainController = require("../controllers/MainController");
const signupController= require("../controllers/SignupController");
const loginController= require("../controllers/LoginController");
const otpController= require("../controllers/OtpController");
const passwordController= require("../controllers/PasswordController");
const middle= require("../controllers/middle");
const router= express.Router();
const session= require("express-session");
const app=express();

router.route("/").get(mainController.index);

router.route("/about").get(mainController.about);
router.route("/about_hospital").get(mainController.about_hospital);
router.route("/booking").get(mainController.booking);
router.route("/contact").get(mainController.contact);
router.route("/doctor_profile").get(mainController.doctor_profile);
router.route("/doctors").get(mainController.doctors);
router.route("/faq").get(mainController.faq);
router.route("/hospitals").get(mainController.hospitals);
router.route("/submit_your_query").get(mainController.submit_your_query);
router.route("/treatment").get(mainController.treatment);
router.route("/tvastra_plus").get(mainController.tvastra_plus);
router.route("/otp_password_number").get(mainController.otp_password_number);
router.route("/doctor_signup").get(mainController.doctor_signup);

router.route("/login").get(middle.redirectprofile, mainController.login);

router.route("/login").post(loginController.login);

router.route("/signup").get(middle.redirectprofile, mainController.signup);

router.route("/signup").post(signupController.signup);

router.route("/otp-login").get(mainController.otp_login);
router.route("/otp-request").post(otpController.request, mainController.otp);
router.route("/otp-validation").post(otpController.validate, mainController.index);
router.route("/otp-password").post(otpController.request, mainController.password_otp_validate);

router.route("/password-reset-entry").post(otpController.validate, mainController.password_reset);

router.route("/password-reset").post(passwordController.reset);

router.route("/logout").get(mainController.logout);


router.route("/doc_post").post(mainController.doc_post);

module.exports = router;
