const InvariantError = require('../exceptions/InvariantError');
const AuthenticationError = require('../exceptions/AuthenticationError');
const TokenManager = require('../tokenize/TokenManager');
const ClientError = require('../exceptions/ClientError');
const { Pool } = require('pg')

const authentication = async (req, res, next) => {
   try {
      const token = req.headers['x-access-token'];
      const pool = new Pool();
      if(!token) {
         throw new InvariantError('Membutuhkan header x-access-token');
      }else{
         const data = TokenManager.verifyAccessToken(token);
         if(data) {
            const query = {
              text: 'SELECT email, password FROM users WHERE email = $1 AND password = $2',
              values: [data.email, data.password]
            }
            const result = await pool.query(query);
            if(!result.rowCount) {
              throw new AuthenticationError('Token tidak valid')
            }
            res.locals.user = result.rows[0]
            next();
         } else {
            throw new AuthenticationError('Token tidak valid');
         }
      }
   } catch (error) {
      if(error instanceof ClientError) {
         return res.status(error.statusCode).json({
            status: 'failed',
            message: error.message
         });
      }
      console.error(error);
      return res.status(500).json(error)
   }
}

module.exports = authentication;