const fs = require('fs');
const dotenv = require('dotenv');

//Use environnement variables
const getEnvFile = () => {
    try {
        const envConfig = dotenv.parse(fs.readFileSync('.env'));
        for (var k in envConfig) {
            process.env[k] = envConfig[k];
        }
    }
    catch (e) {
        console.log('[Error] Please copy .env.dist into .env')
        process.exit()
    }
}

getEnvFile()

