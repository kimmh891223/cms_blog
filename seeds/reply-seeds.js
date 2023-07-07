const { Reply } = require('../models');

const replyData = [
  {
    reply_content: 'Have Fun!!',
    user_id: 1,
    post_id: 1
  },
  {
    reply_content: 'It is fine! Trust me bro!',
    user_id: 2,
    post_id: 2
  },{
    reply_content: 'I am looking for a roommate! Call me at 333-333-3333.',
    user_id: 3,
    post_id: 3
  },{
    reply_content: 'What are you exactly looking for?',
    user_id: 3,
    post_id: 4
  },{
    reply_content: 'I hate him too!',
    user_id: 4,
    post_id: 5
  },{
    reply_content: 'What did he do?',
    user_id: 4,
    post_id: 6
  },
];

const seedReply = () => Reply.bulkCreate(replyData);

module.exports = seedReply;