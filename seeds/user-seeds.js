const { User } = require('../models');

const userData = [
  {
    username: 'Abe Abrahams',
    email: "a_abe123@hotmail.com",
    password: "$2b$10$ylpDlwCzXiPSIodpxahDe.x9ZRvLH3NTnCZ49advr5LEylK/HsW4C",
  },
  {
    username: 'Betty Braum',
    email: "b_braum123@hotmail.com",
    password: "$2b$10$ylpDlwCzXiPSIodpxahDe.x9ZRvLH3NTnCZ49advr5LEylK/HsW4C",
  },
  {
    username: 'Cait Carson',
    email: "c_cait123@hotmail.com",
    password: "$2b$10$ylpDlwCzXiPSIodpxahDe.x9ZRvLH3NTnCZ49advr5LEylK/HsW4C",
  },
  {
    username: 'Daniel Dunkin',
    email: "d_dunkin123@hotmail.com",
    password: "$2b$10$ylpDlwCzXiPSIodpxahDe.x9ZRvLH3NTnCZ49advr5LEylK/HsW4C",
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
