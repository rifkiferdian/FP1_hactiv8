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

    static async inputReflections(req, res) {
        try {
            const owner_id = res.locals.user.id
            const dateNow = new Date()
            const { success, low_point, take_away } = req.body;
            const query = {
                text: 'INSERT INTO reflections (success, low_point, take_away, owner_id, created_date, modified_date) VALUES($1, $2, $3, $4, $5, $6);',
                values: [success, low_point, take_away, owner_id, dateNow, dateNow]
            }
            const result = await pool.query(query);
            return res.status(200).json({
                status: 'success',
                message:"Berhasil membuat reflections"
            })
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: error.message
            });
        }
    } 


    static async editReflections(req, res) {
        try {
            const id = req.params.id
            const dateNow = new Date()
            const { success, low_point, take_away } = req.body;
            const query = {
                text: 'UPDATE reflections SET success = $1, low_point = $2, take_away = $3, modified_date = $4 WHERE id = $5 ;',
                values: [success, low_point, take_away, dateNow, id]
            }
            const result = await pool.query(query);
            return res.status(200).json({
                status: 'success',
                message:"Berhasil Merubah data reflections"
            })
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: error.message
            });
        }
    } 
}

module.exports = ReflectionsController;