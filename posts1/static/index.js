// Start with first post
let counter = 1;
const quantity = 20;

// When DOM load, render the first 20 posts.
document.addEventListener("DOMContentLoaded", load);

// If scrolled to bottom, load the next 20 posts.
window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight)
        load();
}

// Load next set of posts
function load() {
    // Set start and end post
    const start = counter;
    const end = start + quantity -1;
    counter = end +1;

    // Open new request to get new posts.
    const request = new XMLHttpRequest();
    request.open('POST', '/posts');
    request.onload = () => {
        const data = JSON.parse(request.responseText);
        data.forEach(add_post);
    }

    // Add start and end points to request data.
    const data = new FormData();
    data.append('start', start);
    data.append('end', end);

    request.send(data);

}

function add_post(contents) {
    // Create new post
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = contents;

    // Add button to hide posts.
    const hide = document.createElement('button');
    hide.className = 'hide';
    hide.innerHTML = 'Hide';
    post.append(hide);

    hide.onclick = function() {
        this.parentElement.remove();
    }
    // Add post to DOM.
    document.querySelector('#posts').append(post);
}

