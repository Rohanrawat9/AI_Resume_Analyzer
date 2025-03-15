const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 4001; // dot env ise phele implement kr

module.exports = {
    PORT
}