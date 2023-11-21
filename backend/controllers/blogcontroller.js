const Blog = require('../models/blog');


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
        const { id } = req.params;
        const { newcomment } = req.body;
    
        try {
            const blog = await Blog.findByPk(id);
    
            if (!blog) {
                res.status(404).json({ error: 'Blog not found' });
            } else {
                let comments;

                if (blog.blogcomment && blog.blogcomment.comArr) {
                    comments = blog.blogcomment;
                } else {
                    comments = { comArr: [] };
                }



                let arr = [comments.comArr];
                comments.comArr = arr.push(newcomment);

                
    
                blog.blogcomment = comments;
    
                await blog.save();
    
                res.status(200).json({ success: 'Comment added successfully' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
      
}


module.exports = blogController;