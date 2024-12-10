// test insert functions here
const { insertUser, insertPost } = require('./db_insert');

async function createSampleData() {
  const userId = await insertUser({
    user_id: 2,
    username: "test_user2",
    email: "test_user2@example.com",
    password: "password2"
  });
}

createSampleData().catch(console.error);
