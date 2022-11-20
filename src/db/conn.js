const mongoose = require("mongoose"); //import mongoose which will help in connecting our frontend and backend

mongoose.connect("mongodb://127.0.0.1:27017/userRegistration", {
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`connection failed`)
})


//"mongodb://localhost:27017/userRegistration"