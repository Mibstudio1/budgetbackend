const { Client } = require('pg');

async function testConnection() {
  const client = new Client({
    connectionString: "postgresql://postgres.dwnkbropmczpyxtzcymh:Yg7!wzQp@39LmXv%@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
  });

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully!');

    // Check tables
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'BG_%'
      ORDER BY table_name;
    `);

    console.log('\n📋 Tables found:');
    if (result.rows.length === 0) {
      console.log('❌ No BG_* tables found');
    } else {
      result.rows.forEach(row => {
        console.log(`✅ ${row.table_name}`);
      });
    }

    // Check all tables
    const allTables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log('\n📋 All tables in database:');
    allTables.rows.forEach(row => {
      console.log(`- ${row.table_name}`);
    });

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await client.end();
  }
}

testConnection();
