import pool from '../../../../db';

export async function GET(req, res) {
  try {
    const [rows, fields] = await pool.execute('SELECT * FROM messages');
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}