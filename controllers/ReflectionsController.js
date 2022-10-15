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
                throw new NotFoundError('reflections data tidak ditemukan');
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

    static async delReflections(req, res) {
        try {
            const id = req.params.id
            const query = {
                text: 'DELETE FROM reflections WHERE id = $1 ',
                values: [id]
            }
            await pool.query(query);

            res.status(200).json({message:'Data berhasil di hapus !'});
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