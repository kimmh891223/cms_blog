// import all models
const Post = require('./Post');
const User = require('./User');
const Reply = require('./Reply');

// User has many Posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });

// Post belongs To User
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });

User.hasMany(Reply, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Reply.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

Post.hasMany(Reply, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Reply.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})



//export all models
module.exports = { Post, User, Reply } ;