const AuthenticationError = require('../exceptions/AuthenticationError');
const ClientError = require('../exceptions/ClientError');
const { Pool } = require('pg')
const pool = new Pool();

const authorization  = async (req, res, next) => {
    try {
        const owner_id = res.locals.user.id
        const id = req.params.id
        const query = {
            text: 'SELECT id, owner_id FROM reflections WHERE id = $1 AND owner_id = $2',
            values: [id, owner_id]
        }
        const result = await pool.query(query);
        if(!result.rowCount) {
            throw new AuthenticationError('Anda tidak punya Akses di data ini...!')
        }
        res.locals.reflections = result.rows[0]
        next();
    } catch (error) {
        if(error instanceof ClientError) {
            return res.status(error.statusCode).json({
               status: 'failed',
               message: error.message
            });
        }
        return res.status(500).json(error)
    }
}

module.exports = authorization;