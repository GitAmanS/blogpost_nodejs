
const serverUrl = 'http://localhost:3000/blogs';

const blogform = document.getElementById('blogForm');
const blogsContainer = document.getElementById('blogsContainer');

blogform.addEventListener('submit', handleBlogAdd);
const blogtitle = document.getElementById('blogtitle');
const author = document.getElementById('author');
const blogcontent = document.getElementById('blogcontent');

function handleBlogAdd(event) {
    event.preventDefault();

    const blogData = {
        blogtitle: blogtitle.value,
        blogauthor: author.value,
        blogcontent: blogcontent.value,
    };

    axios.post(`${serverUrl}`, blogData) 
        .then(response => {
            const uniqueId = response.id; 
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
    const buttonDelete = document.createElement('button');
    // const buttonEdit = document.createElement('button');

    // buttonDelete.textContent = 'Delete';
    // buttonEdit.textContent = 'Edit';
    // buttonDelete.className = 'btn btn-danger mr-2';
    // buttonEdit.className = 'btn btn-primary';

    // buttonDelete.addEventListener('click', function () {
    //     blogElement.remove();
    //     handleBlogDelete(uniqueId);
    // });

    // buttonEdit.addEventListener('click', function () {
    //     axios.get(`${serverUrl}/expenses/${uniqueId}`, { withCredentials: true })
    //     .then((response) => {
    //         console.log(response);
    //         const storedData = response.data;
    //         amountInput.value = storedData.amount;
    //         descriptionInput.value = storedData.description;
    //         categorySelect.value = storedData.category;
    //         expenseElement.remove();
    //         handleExpenseDelete(uniqueId);
    //     });
    // });

    blogElement.className = 'list-group-item';
    blogElement.innerHTML = `
        <li id="blogname" class="list-group-item" data-toggle="collapse" data-target="#item${uniqueId}">${blogData.blogtitle}</li>
        <div id="item${uniqueId}" class="collapse">
            <div class="card card-body">
                <div class="blog-body">
                    <p><strong>Author:</strong> ${blogData.blogauthor}</p>
                    <p>
                    ${blogData.blogcontent}
                    </p>
                    <div class="form-group mt-3">
                        <label for="comment">Add a Comment:</label>
                        <textarea class="form-control" id="comment" rows="3" placeholder="Write your comment here"></textarea>
                    </div>
                    <button class="btn btn-primary" type="submit">Post Comment</button>
                </div>
                <ul class="list-group mt-3">
                    <li class="list-group-item">Comment 1</li>
                    <li class="list-group-item">Comment 2</li>
                </ul>
            </div>
        </div>
    `;
    // expenseElement.appendChild(buttonDelete);
    // expenseElement.appendChild(buttonEdit);

    return blogElement;
}

function showAllBlogs() {
    axios.get(`${serverUrl}`, { withCredentials: true }) 
        .then(response => {
            const blogs = response.data;
            console.log(blogs);
            blogs.forEach(blog => {
                const blogElement = createBlogElement(blog, blog.id); 
                blogsContainer.appendChild(blogElement);
            });
        })
        .catch(error => {
            console.error('Error fetching expenses:', error);
        });
}


showAllBlogs();