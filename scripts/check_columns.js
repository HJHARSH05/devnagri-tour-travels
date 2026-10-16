const { Client } = require('pg');

async function run(){
  const conn = process.env.MIGRATE_DATABASE_URL;
  if(!conn){
    console.error('MIGRATE_DATABASE_URL not set');
    process.exit(1);
  }
  const client = new Client({ connectionString: conn });
  try{
    await client.connect();
    const res = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'taxi_bookings' ORDER BY ordinal_position;`);
    if(res.rows.length === 0){
      console.log('No columns found for taxi_bookings');
    } else {
      console.table(res.rows);
    }
  } catch(err){
    console.error('Query failed:', err.message || err);
    process.exit(1);
  } finally{
    await client.end();
  }
}

run();
