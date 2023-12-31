const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogcontroller');



router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.post('/', blogController.createBlog);
// router.put('/:id', blogController.updateExpense);
router.delete('/:id', blogController.deleteBlog);
router.post('/comment', blogController.addComment);
router.get('/:id/comment', blogController.getCommentsById);


module.exports = router;