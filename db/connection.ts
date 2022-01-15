import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(process.env.DBNAME!, process.env.DBUSER!, process.env.DBPASS!, {
    host: process.env.DBSERVER!,
    dialect: 'mysql',
    port: +process.env.DBPORT!,
    logging: console.log
});

export default db;