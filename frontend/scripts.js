const serverUrl = 'http://localhost:3000/blogs';
const blogform = document.getElementById('blogForm');
const blogsContainer = document.getElementById('blogsContainer');

blogform.addEventListener('submit', handleBlogAdd);

function handleBlogAdd(event) {
    event.preventDefault();

    const blogtitle = document.getElementById('blogtitle').value;
    const author = document.getElementById('author').value;
    const blogcontent = document.getElementById('blogcontent').value;

    const blogData = {
        blogtitle,
        blogauthor: author,
        blogcontent,
    };

    axios.post(`${serverUrl}`, blogData)
        .then(response => {
            const uniqueId = response.data.id;
            const blogElement = createBlogElement(blogData, uniqueId);
            blogsContainer.appendChild(blogElement);
            blogform.reset();
        })
        .catch(error => {
            console.error('Error creating blog:', error);
        });
}

function createBlogElement(blogData, uniqueId) {
    const blogElement = document.createElement('div');

    blogElement.className = 'list-group-item';
    blogElement.innerHTML = `
        <li id="blogname" class="list-group-item" data-toggle="collapse" data-target="#item${uniqueId}">${blogData.blogtitle}</li>
        <div id="item${uniqueId}" class="collapse">
            <div class="card card-body">
                <div class="blog-body">
                    <p><strong>Author:</strong> ${blogData.blogauthor}</p>
                    <p>${blogData.blogcontent}</p>
                    <div class="form-group mt-3">
                        <label for="comment">Add a Comment:</label>
                        <textarea class="form-control" id="comment" rows="3" placeholder="Write your comment here"></textarea>
                        <button class="btn btn-primary mt-2" type="button" onclick="postComment(${uniqueId})">Post Comment</button>
                    </div>
                    <ul id="commentList${uniqueId}" class="list-group mt-3"></ul>
                </div>
            </div>
        </div>
    `;

    // Fetch and render comments
    const commentListElement = blogElement.querySelector(`#commentList${uniqueId}`);
    fetchComments(uniqueId).then(comments => renderComments(commentListElement, comments));

    return blogElement;
}

async function fetchComments(blogId) {
    try {
        const response = await axios.get(`${serverUrl}/${blogId}/comment`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
}

function renderComments(commentListElement, comments) {
    commentListElement.innerHTML = '';

    if(comments){comments.forEach(comment => {
        const commentItem = document.createElement('li');
        commentItem.className = 'list-group-item';
        commentItem.textContent = comment.comment;
        commentListElement.appendChild(commentItem);
    });}
}

async function postComment(blogId) {
    const commentInput = document.getElementById('comment');
    const newComment = commentInput.value;

    await postCommentToServer(blogId, newComment);

    const commentListElement = document.getElementById(`commentList${blogId}`);
    const updatedComments = await fetchComments(blogId);
    renderComments(commentListElement, updatedComments);
}

async function postCommentToServer(blogId, comment) {
    try {
        const response = await axios.post(`${serverUrl}/comment`, { comment , blogId});
        console.log(response.comment); // Log the response to check for success messages or errors
    } catch (error) {
        console.error('Error posting comment:', error);
    }
}



async function showAllBlogs() {
    try {
        const response = await axios.get(`${serverUrl}`, { withCredentials: true });
        const blogs = response.data;

        for (const blog of blogs) {
            const blogElement = createBlogElement(blog, blog.id);
            blogsContainer.appendChild(blogElement);

            // Fetch and render comments for each blog
            const commentListElement = document.getElementById(`commentList${blog.id}`);
            const comments = await fetchComments(blog.id);
            renderComments(commentListElement, comments);
        }
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
}

showAllBlogs();
