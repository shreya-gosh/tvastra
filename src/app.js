//importing section
const express= require("express");
const router= express.Router();
const app= express();
const session= require("express-session");
const cookieParser=require("cookie-parser");
const cors= require("cors");
const compression= require("compression");
const bodyParser= require("body-parser");
const logger= require("morgan");
const  path= require("path");
const mainRoutes= require("./backend/routes/MainRoutes");

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.set("views", __dirname+"/client/views");

//for rendering ejs in html format.
app.engine("html", require("ejs").renderFile);

//setting view engine as ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "client/assets")));
app.use(express.static(path.join(__dirname, "client/css")));
app.use(express.static(path.join(__dirname, "client/javascript")));

//for logging purposes.
app.use(logger("dev"));

app.use(session({
    secret: "KonfinitySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: null
    }
}));

app.use("/", mainRoutes);

function index(req, res)
{
    res.render("index");
}

router.route("/").get(index);
app.use("/", index);
app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), ()=>{
    console.log("Application running in port:"+app.get("port"));
})

module.exports = app;