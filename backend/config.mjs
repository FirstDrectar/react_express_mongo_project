import dotenv from "dotenv";
dotenv.config();
export default {
    port : process.env.PORT || 3030,
    dbUser : process.env.DB_USER,
    dbPass : process.env.DB_PASS,
    sold : process.env.SOLD,

};