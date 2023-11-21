const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogcontroller');



router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.post('/', blogController.createBlog);
// router.put('/:id', blogController.updateExpense);
router.delete('/:id', blogController.deleteBlog);
router.post('/:id/comment', blogController.addComment);


module.exports = router;