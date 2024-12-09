// test insert functions here
const { insertUser, insertPost } = require('./db_insert');

async function createSampleData() {
  const userId = await insertUser({
    user_id: 1,
    username: "test_user",
    email: "test_user@example.com",
    password: "password1"
  });
}

createSampleData().catch(console.error);
