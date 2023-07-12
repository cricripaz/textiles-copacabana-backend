import {createPool} from "mysql2/promise";
import dotEnv from 'dotenv';

dotEnv.config();

export const pool = createPool({

    user: process.env.USERDB,
    password: process.env.PASSWORD,
    host: process.env.MYSQLHOST,
    port: process.env.PORT,
    database: process.env.DATABASE

})