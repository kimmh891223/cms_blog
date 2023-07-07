const seedUser = require('./user-seeds');
const seedPost = require('./post-seeds');
const seedReply = require('./reply-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUser();
  console.log('\n----- USER SEEDED -----\n');
  await seedPost();
  console.log('\n----- POST SEEDED -----\n');
  await seedReply();
  console.log('\n----- REPLY SEEDED -----\n');

  process.exit(0);
};

seedAll();
