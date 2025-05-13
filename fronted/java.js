document.addEventListener("DOMContentLoaded", function () {
  const api = 'http://127.0.0.1:8000/api/posts/';
  const form = document.getElementById('postForm');
  const title = document.getElementById('title');
  const content = document.getElementById('content');
  const author = document.getElementById('author');
  const postId = document.getElementById('postId');

  window.showCreateForm = function () {
    form.reset();
    postId.value = '';
    form.style.display = 'flex';
  }

  window.hideForm = function () {
    form.reset();
    form.style.display = 'none';
  }

  window.submitPost = function (e) {
    e.preventDefault();
    const method = postId.value ? 'PUT' : 'POST';
    const url = postId.value ? api + postId.value + '/' : api;
    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
        author_name: author.value
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Xatolik!");
      return res.json();
    })
    .then(() => {
      hideForm();
      loadPosts();
    })
    .catch(err => alert("Xatolik yuz berdi: " + err));
  }

  function loadPosts() {
    fetch(api)
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('posts');
        container.innerHTML = '';
        data.forEach(p => {
          const div = document.createElement('div');
          div.className = 'post';
          div.innerHTML = `
            <h2>${p.title}</h2>
            <p>${p.content}</p>
            <small><b>Muallif:</b> ${p.author_name}</small>
            <div class="actions">
              <button onclick="editPost(${p.id})">✏️ Tahrirlash</button>
              <button onclick="deletePost(${p.id})">🗑️ O‘chirish</button>
            </div>
          `;
          container.appendChild(div);
        });
      });
  }

  
  window.editPost = function (id) {
    fetch(api + id + '/')
      .then(res => res.json())
      .then(p => {
        title.value = p.title;
        content.value = p.content;
        author.value = p.author_name;
        postId.value = p.id;
        form.style.display = 'flex';
      });
  }

  window.deletePost = function (id) {
    if (confirm("Ochirmoqchimisiz shu postni hurmatli foydalanuvchi.")) {
      fetch(api + id + '/', {
        method: 'DELETE'
      }).then(() => loadPosts());
    }
  }

  loadPosts();
});
