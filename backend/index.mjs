
import mongoose  from "mongoose";
import config  from "./config.mjs";
import express from "express";
import  cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";
import {router} from "./routers/api.mjs";

const PORT = config.port;
console.log(config);
const app = express();
app.use(logger('dev'));
app.use(cors({
    
}));
const dbRoute =`mongodb+srv://${config.dbUser}:${config.dbPass}@filmsstorage-rfyly.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);
app.use((err, _req, res, _next) => {
    res.status(404).send({err});
    
});
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));