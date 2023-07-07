const router = require('express').Router();
const { Post, User } = require('../../models');

// The `/api/post` endpoint

 // get all Posts, including its associated Category
 router.get('/', async (req, res) => {
  const postInfo = await Post.findAll({
    include: [{
    model: User, attributes: ["username"]
    }],
  }).catch((err) => {
    
    res.json(err);
  });
  res.json(postInfo);
});

 // Get One Post by ID, including its associate Category
router.get('/:id', async (req, res) => {
  try {
    const postInfo = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] }
      ]
    });
    if (!postInfo) {
      res.status(404).json({message: 'Post ID Not Found! Please Enter Valid ID#'});
      return;
    }
    res.status(200).json(postInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/user_id/:user_id', async (req, res) => {
  try {
    const postInfo = await Post.findAll({
      where: {
        user_id: req.params.user_id
      },
      include: [{
        model: User, attributes: ["username"]
      }],
    });
    if (!postInfo) {
      res.status(404).json({message: 'Product Name Not Found! Please Enter Valid Product'});
      return;
    }
    res.status(200).json(postInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new post
router.post('/', async (req, res) => {
  try { 
    const createdPost = await Post.create({
      post_title: req.body.post_title,
      post_content: req.body.post_content,
      user_id: req.body.user_id
    }
  );
  res.status(200).json(createdPost);
  } catch (err) {
  res.status(500).json({ message: "Unable to Create New Post" });
  }
  });

// Update post by ID
router.put('/:id', (req, res) => {
  Post.update({
    post_title: req.body.post_title,
    post_content: req.body.post_content,
    },
    {
      where: { id: req.params.id },
    }
    ).then((updatedPostInfo) => {
        if(!updatedPostInfo) {
            res.status(404).json({ message: "ID# for Post To Be Updated Cannot Be Found!" });
            return;
          }
        res.status(200).json(updatedPostInfo);
      }
    ).catch((err) => {
        res.status(500).json({ message: err + "- Failed to Update Post by ID#" });
    })
  
  });

// Delete Post by ID
router.delete('/:id', (req, res) => {
  Post.destroy(
      {where: {id: req.params.id}})
      .then((deletedPost) => {
        if(!deletedPost) {
          res.status(404).json({ message: "ID # for Post To Be Deleted Cannot Be Found!" });
          return;
        }
        res.status(200).json(deletedPost);
  
      })
      .catch((err) => {
        res.status(400).json({ message: err + "- Failed to Delete Post by ID#" });
        });
    });

module.exports = router;