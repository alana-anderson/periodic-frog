const pool = require('./db.js');

async function main() {
  let conn;

  try {
    conn = await pool.getConnection();
    if (conn) {
      console.log('Successfully connected to the database.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    if (conn) conn.release();  // release the connection back to the pool
  }
}

main();
