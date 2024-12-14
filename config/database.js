require('dotenv').config()
const {Sequelize}= require('sequelize')

const {DB_USERNAME,DB_PASSWORD,DB_DATABASE} = process.env
const sequelize = new Sequelize(DB_DATABASE,DB_USERNAME,DB_PASSWORD,{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;