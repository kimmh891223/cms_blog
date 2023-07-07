fetch("api/post", {
    method: 'GET',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('API request failed');
      }
      return response.json();
    })
    .then(results => {
      console.log(results);
      listRender(results.reverse());
    })
    .catch(error => {
      console.error(error);
    });
  
  function listRender(results) {
    const postListEl = document.getElementById('post-list');
  
    postListEl.innerHTML = '';
  
    for (var i = 0; i < results.length; i++) {
      const listContainer = document.createElement('ul');
      listContainer.setAttribute("class", "container text-left justify-content-center");
      listContainer.setAttribute("id", "list-container");
      
      let resultId = results[i].id
      
      listContainer.addEventListener('click', () => {
        navigateToDetailPage(resultId);
      });
  
      const postTitle = document.createElement('li');
      postTitle.setAttribute("id", "post-title-list");
      listContainer.appendChild(postTitle);
  
      const postAuthor = document.createElement('li');
      postAuthor.setAttribute("id", "post-author-list");
      listContainer.appendChild(postAuthor);
  
      const postDate = document.createElement('li');
      postDate.setAttribute("id", "post-date-list");
      listContainer.appendChild(postDate);
  
      postTitle.innerHTML = results[i].post_title + "<br>";
      postDate.innerHTML = "Last updated on: " + results[i].updatedAt;
      if (results[i].user && results[i].user.username) {
        postAuthor.innerHTML = "Posted by: " + results[i].user.username + "<br>";
      }
  
      postListEl.appendChild(listContainer);
    }
  }
  
  function navigateToDetailPage(resultId) {
    sessionStorage.setItem('resultId', resultId);
    window.location.href = "/detailed";
  }
  