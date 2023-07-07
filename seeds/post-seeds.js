const { Post } = require('../models');

const postData = [
  {
    post_title: 'Having an Amazing Day in France',
    post_content: 'I have arrived in Paris last night, and I am going to see the Eiffel tower today!',
    user_id: 1,
  },
  {
    post_title: 'Is it okay to eat 1 meal per day?',
    post_content: 'Just askin.',
    user_id: 2,
  },{
    post_title: 'Looking for a room rental for a college student',
    post_content: 'I am looking for a room under $500/month',
    user_id: 3,
  },{
    post_title: 'Anyone selling some kitchen wares?',
    post_content: 'I need them, reply plz!',
    user_id: 3,
  },{
    post_title: 'I hate my boss',
    post_content: 'He yelled at me today. I hate him!',
    user_id: 4,
  },{
    post_title: 'I hate my boss 2',
    post_content: 'He yelled at me again. I hate him!',
    user_id: 4,
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
