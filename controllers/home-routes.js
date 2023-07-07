const router = require('express').Router();
const { Post, User } = require('../models');

 // get all products, including its associated Category
 router.get('/', async (req, res) => {
    res.render('homepage', {
      loggedIn: req.session.loggedIn 
    });
});

router.get('/create-post', async (req,res) =>{
  res.render('create-post', {
    loggedIn: req.session.loggedIn 
  });
})

router.get('/post-list', async (req,res) =>{
  res.render('post-list', {
    loggedIn: req.session.loggedIn 
  });
})

router.get('/login', async (req,res) =>{
  res.render('login', {
  });
})

router.get('/success', async (req,res) =>{
  res.render('success', {
    loggedIn: req.session.loggedIn
  });
})

router.get('/fail', async (req,res) =>{
  res.render('fail', {
    loggedIn: req.session.loggedIn
  });
})

router.get('/detailed', async (req,res) =>{
  res.render('detailed', {
    loggedIn: req.session.loggedIn 
  });
})

router.get('/detailed/:id', async (req,res) =>{
  try {
    const postInfo = await Post.findByPk(req.params.id);
    if (!postInfo) {
      res.status(404).json({message: 'Post ID Not Found! Please Enter Valid ID#'});
      return;
    }
    res.status(200).json(postInfo);
  } catch (err) {
    res.status(500).json(err);
  }
  res.render('detailed', {
    loggedIn: req.session.loggedIn 
  });
})

module.exports = router;