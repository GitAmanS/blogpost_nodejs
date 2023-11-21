const Blog = require('../models/blog');
const Comment = require('../models/comment');


const blogController = {
    getAllBlogs :async (req, res) => {
        try {
          const blogs = await Blog.findAll();
          res.json(blogs);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    },

    getBlogById: async (req, res) => {
        const { id } = req.params;
        try {
            const blog = await Blog.findByPk(id);
            if (!blog) {
              res.status(404).json({ error: 'Blog not found' });
            } else {
              res.json(blog);
            }
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },

    createBlog: async (req, res) => {
        const {  blogtitle, blogauthor, blogcontent } = req.body;
        try {
          const newBlog = await Blog.create({
            blogtitle,
            blogauthor,
            blogcontent,
          });
          res.status(201).json(newBlog);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },

    deleteBlog: async (req, res) => {
        const { id } = req.params;
        try {
          const blog = await Blog.findByPk(id);
          if (!blog) {
            res.status(404).json({ error: 'Blog not found' });
          } else {
            await blog.destroy();
            res.json({ message: 'Blog deleted successfully' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },

      addComment: async (req, res) => {
        const { comment, blogId } = req.body;
    
        try {
            const createdComment = await Comment.create({
                blogid: blogId,
                comment: comment,
            });
            console.log(blogId, comment);
            res.status(200).json({createdComment });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
    
    getCommentsById: async (req, res) => {
        const { id } = req.params;
    
        try {
            const comments = await Comment.findAll({
                where: { blogid: id },
            });
    
            if (comments.length === 0) {
                res.json({ message: 'No comments found.' });
            } else {
                res.json(comments);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
      
}


module.exports = blogController;