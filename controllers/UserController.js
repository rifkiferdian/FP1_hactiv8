const { Pool } = require('pg');
const ClientError = require('../exceptions/ClientError');
const NotFoundError = require('../exceptions/NotFoundError');
const TokenManager = require('../tokenize/TokenManager');

class UserController {
  static async login(req, res) {
    try {
      const pool = new Pool();

      const { email, password } = req.body;
      const query = {
        text: 'SELECT * FROM users WHERE email = $1 AND password = $2',
        values: [email, password]
      }
      const result = await pool.query(query);
      if (!result.rowCount) {
        throw new NotFoundError('Pengguna tidak ditemukan');
      }
      return res.status(200).json({
        token: TokenManager.generateAccessToken(email, password)
      })
    } catch (e) {
      if (e instanceof ClientError) {
        return res.status(e.statusCode).json({
          status: 'failed',
          message: e.message
        });
      }
      console.error(e);
      return res.status(500).json({
        status: 'failed',
        message: 'Terjadi kesalahan pada server'
      });
    }
  }
  static async register(req, res) {
    try {
      const pool = new Pool();

      const { email, password } = req.body;
      const query = {
        text: 'INSERT INTO users (email, password) VALUES($1, $2);',
        values: [email, password]
      }
      const result = await pool.query(query);

      return res.status(200).json(
        "Berhasil membuat user"
      )
    } catch (e) {
      if (e instanceof ClientError) {
        return res.status(e.statusCode).json({
          status: 'failed',
          message: e.message
        });
      }
      console.error(e);
      return res.status(500).json({
        status: 'failed',
        message: 'Terjadi kesalahan pada server'
      });
    }
  }
}

module.exports = UserController;