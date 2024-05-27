document.addEventListener('DOMContentLoaded', function() {
    if (document.body.contains(document.getElementById('blogs-list'))) {
        fetchBlogs();
    }

    if (document.body.contains(document.getElementById('blog-title'))) {
        fetchBlogDetails();
    }
});

function fetchBlogs() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(blogs => {
            let blogsList = document.getElementById('blogs-list');
            blogsList.innerHTML = '';
            blogs.forEach(blog => {
                let blogElement = document.createElement('div');
                blogElement.innerHTML = `<h2>${blog.title}</h2><p>${blog.body.substring(0, 100)}...</p><a href="blogDetails.html?id=${blog.id}">Read more</a>`;
                blogsList.appendChild(blogElement);
            });
        });
}

function fetchBlogDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`)
        .then(response => response.json())
        .then(blog => {
            document.getElementById('blog-title').innerText = blog.title;
            document.getElementById('blog-body').innerText = blog.body;
        });
}