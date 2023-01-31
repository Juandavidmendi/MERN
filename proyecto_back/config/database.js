const mongoose = require("mongoose");

const host = "127.0.0.1";
const port = "27017";
const db = "verduras";

exports.mongoConnect = () =>{
    const mongoStringConnection = `mongodb://${host}:${port}/${db}`;
    mongoose.set('strictQuery', true);
    mongoose.connect(mongoStringConnection);
    mongoose.Promise = global.Promise;
    const dbConnection = mongoose.connection;
    dbConnection.on("error", console.error.bind(console,"Mongodb connection error"))
}

