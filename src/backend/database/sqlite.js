const Sequelize= require("sequelize"); 

const sequelize= new Sequelize({
    dialect: "sqlite",
    storage: "./src/backend/database/database.sqlite"
});

const users = sequelize.define("users",{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull:false
    },
    number:{
        type: Sequelize.STRING,
        allowNull:false
    },
    gender:{
        type: Sequelize.STRING,
        allowNull: false
    },
    DOB:{
        type: Sequelize.STRING,
        allowNull: false
    },
    city:{
        type: Sequelize.STRING,
        allowNull: false
    },
    state:{
        type: Sequelize.STRING,
        allowNull: false
    },

    country:{
        type: Sequelize.STRING,
        allowNull: false
    }
});



users
    .sync()
    .then(()=>
        console.log(
            "user table has been suuccessfully created, if one doesn't exist"
            )
        )
    .catch(error=>console.log(error));

module.exports = {
    Users: users
};