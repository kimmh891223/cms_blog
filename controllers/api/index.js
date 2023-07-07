const router = require('express').Router();
const postRoutes = require('./post-routes');
const userRoutes = require('./user-routes');
const replyRoutes = require('./reply-routes');

router.use('/post', postRoutes);
router.use('/user', userRoutes);
router.use('/reply', replyRoutes)

module.exports = router;