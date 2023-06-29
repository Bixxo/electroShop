require('dotenv').config();

const config = {
    env:process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 8080,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    googleId: process.env.GOOGLE_ID,
    googleSecret: process.env.GOOGLE_SECRET,
    googlePass: process.env.GOOGLE_PASSWORD,
    jwtSecret: process.env.JWT_SECRET
}

module.exports = { config }