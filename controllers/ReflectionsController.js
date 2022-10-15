const ClientError = require('../exceptions/ClientError');
const NotFoundError = require('../exceptions/NotFoundError');
const { Pool } = require('pg');
const pool = new Pool();


class ReflectionsController {
    static async getReflections(req, res) {
        try {
            const id = req.params.id
            const query = {
                text: 'SELECT * FROM reflections WHERE id=$1 ',
                values: [id]
            }
            const result = await pool.query(query);
            if (!result.rowCount) {
                throw new NotFoundError('reflections data kosong');
            }
            res.status(200).json(result.rows);

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
}

module.exports = ReflectionsController;