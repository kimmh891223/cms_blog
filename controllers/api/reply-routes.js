const router = require('express').Router();
const { Reply, User } = require('../../models');

// The `/api/reply` endpoint

 // get all replies
 router.get('/', async (req, res) => {
  const replyInfo = await Reply.findAll().catch((err) => {
    res.json(err);
  });
  res.json(replyInfo);
});

 // Get One reply by ID
router.get('/:id', async (req, res) => {
  try {
    const replyInfo = await Reply.findByPk(req.params.id);
    if (!replyInfo) {
      res.status(404).json({message: 'Reply ID Not Found! Please Enter Valid ID#'});
      return;
    }
    res.status(200).json(replyInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

 // Get all reply by postID
 router.get('/post_id/:post_id', async (req, res) => {
  try {
    const replyInfo = await Reply.findAll({
      where: {
        post_id: req.params.post_id
      },
      include: [{
        model: User, attributes: ["username"]
      }],
    });;
    if (!replyInfo) {
      res.status(404).json({message: 'Reply ID Not Found! Please Enter Valid ID#'});
      return;
    }
    res.status(200).json(replyInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new Reply
router.post('/', async (req, res) => {
  try { 
    const createdReply = await Reply.create({
      reply_content: req.body.reply_content,
      post_id: req.body.post_id,
      user_id: req.body.user_id
    }
  );
  res.status(200).json(createdReply);
  } catch (err) {
  res.status(500).json({ message: "Unable to Create New reply" });
  }
  });

// Update reply by ID
router.put('/:id', (req, res) => {
    Reply.update(req.body, {
      where: { id: req.params.id },
      }
    ).then((updatedReplyInfo) => {
        if(!updatedReplyInfo) {
            res.status(404).json({ message: "ID# for Reply To Be Updated Cannot Be Found!" });
            return;
          }
        res.status(200).json(updatedReplyInfo);
      }
    ).catch((err) => {
        res.status(500).json({ message: err + "- Failed to Update Reply by ID#" });
    })
  
  });

// Delete reply by ID
router.delete('/:id', (req, res) => {
    Reply.destroy(
      {where: {id: req.params.id}})
      .then((deletedReply) => {
        if(!deletedReply) {
          res.status(404).json({ message: "ID # for Reply To Be Deleted Cannot Be Found!" });
          return;
        }
        res.status(200).json(deletedReply);
  
      })
      .catch((err) => {
        res.status(400).json({ message: err + "- Failed to Delete Reply by ID#" });
        });
    });

module.exports = router;