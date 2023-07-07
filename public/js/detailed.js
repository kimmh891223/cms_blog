document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    const resultId = sessionStorage.getItem('resultId');
    const resultUserName = sessionStorage.getItem('userInfoName');
    
    // GET PI call for blog post title and content
    fetch(`/api/post/${resultId}`, {
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

        // Rendering Content including Title, Content, Author and the Time
        renderContent();
        function renderContent () {
            const detailedTitle = document.getElementsByClassName("detailed-title")[0];
            const detailedContent = document.getElementsByClassName("detailed-content")[0];
            const detailedAuthor = document.getElementsByClassName("detailed-author")[0];
            const detailedTime = document.getElementsByClassName("detailed-time")[0];

            detailedTitle.innerHTML = results.post_title;
            detailedContent.innerHTML = results.post_content;
            detailedAuthor.innerHTML = "Posted By: "+ results.user.username;
            detailedTime.innerHTML = "Updated On: " + results.updatedAt;

            // Rendering Update Button (Only if session user matches the author)
            const contentContainer = document.getElementsByClassName('content-container')[0];
            const updateBtn = document.createElement("button");
            updateBtn.innerHTML = "UPDATE"
            updateBtn.setAttribute('class', 'update-btn primary-btn');
            updateBtn.setAttribute('id', 'update-btn');            
            updateBtn.setAttribute('style',"display: none");
            contentContainer.appendChild(updateBtn);

            if (results.user.username === resultUserName) {
                updateBtn.setAttribute('style',"display: inline")
            }

            // Rendering Delete Button (Only if session user matches the author)
            
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "DELETE"
            deleteBtn.setAttribute('class', 'delete-btn primary-btn');
            deleteBtn.setAttribute('id', 'delete-btn');            
            deleteBtn.setAttribute('style',"display: none");
            contentContainer.appendChild(deleteBtn);

            if (results.user.username === resultUserName) {
                deleteBtn.setAttribute('style',"display: inline")
            }

            // Event Listener for DELETE API call
            const post_id = results.id;
            deleteBtn.addEventListener("click", (event) => {
                event.preventDefault();
                fetch (`/api/post/${post_id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    if (!response.ok) {
                    throw new Error('API request failed');
                    }
                    else if (response.ok) {
                        document.location.replace('/success');
                      }
                      

                })
            })
            // Event Listener for PUT API call
           
            updateBtn.addEventListener("click", (event) => {
                event.preventDefault();

                // Creating Input fields for Update Body (Leaving old contents though)
                const detailedTitleInput = document.createElement("textarea");
                detailedTitleInput.setAttribute("style","font-size: 40px; font-weight: 700");
                detailedTitleInput.setAttribute("rows", 1)
                detailedTitleInput.setAttribute("cols", 27);
                detailedTitleInput.innerHTML = results.post_title;
                contentContainer.replaceChild(detailedTitleInput, detailedTitle);

                const detailedContentInput = document.createElement("textarea");
                detailedContentInput.setAttribute("style","font-size: 20px");
                detailedContentInput.setAttribute("rows", 3);
                detailedContentInput.setAttribute("cols", 70);
                detailedContentInput.innerHTML = results.post_content;
                contentContainer.replaceChild(detailedContentInput, detailedContent);

                // Replacing Buttons from update/delete to submit/cancel duing an update
                const updateSubmitBtn = document.createElement("button");
                updateSubmitBtn.setAttribute("class","update-submit-btn");
                updateSubmitBtn.innerHTML = "SUBMIT";
                contentContainer.replaceChild(updateSubmitBtn, updateBtn);

                const updateCancelBtn = document.createElement("button");
                updateCancelBtn.setAttribute("class","update-cancel-btn");
                updateCancelBtn.innerHTML = "CANCEL";
                contentContainer.replaceChild(updateCancelBtn, deleteBtn);

                // Cancel to update
                updateCancelBtn.addEventListener("click", () => {
                    if (results.user.username === resultUserName) {
                        contentContainer.replaceChild(updateBtn, updateSubmitBtn);
                        contentContainer.replaceChild(deleteBtn, updateCancelBtn);
                        contentContainer.replaceChild(detailedTitle, detailedTitleInput);
                        contentContainer.replaceChild(detailedContent, detailedContentInput);
                    }
                    
                })

                // PUT API call
                updateSubmitBtn.addEventListener("click", () => {
                    const post_title = detailedTitleInput.value;
                    const post_content = detailedContentInput.value;
                    fetch (`/api/post/${post_id}`, {
                        method: 'PUT',
                        body: JSON.stringify(
                            {
                            post_title,
                            post_content
                            }
                        ),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(response => {
                        if (!response.ok) {
                        throw new Error('API request failed');
                        }
                        else if (response.ok) {
                            document.location.replace('/detailed');
                          }
                    })

                })              
            })
        };

        // Rendering all replies for the specific post ID by GET call
        renderReply();       
        function renderReply () {
            const post_id = results.id;
            fetch(`/api/reply/post_id/${post_id}`, {
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
                const replyListEl = document.getElementById("reply-list");
                replyListEl.innerHTML = '';

                for (var i = 0; i < results.length; i++) {
                    const replyCard = document.createElement('ul');
                    replyCard.setAttribute("id","reply-card");
                    replyListEl.appendChild(replyCard);

                    const replyDeleteBtn = document.createElement('button');
                    replyDeleteBtn.innerHTML = "X"
                    replyDeleteBtn.setAttribute("style", "font-size:8px; float: right; display: none")
                    replyCard.appendChild(replyDeleteBtn);
                    if (results[i].user.username === resultUserName) {
                        replyDeleteBtn.setAttribute("style", "font-size:8px; float: right; display: block")
                    }

                    const replyContentEl = document.createElement('li');
                    replyContentEl.setAttribute("id", "reply-content-el");
                    replyCard.appendChild(replyContentEl);

                    const replyAuthorEl = document.createElement('li');
                    replyAuthorEl.setAttribute("id", "reply-author-el");
                    replyCard.appendChild(replyAuthorEl);

                    const replyTimeEl = document.createElement('li');
                    replyTimeEl.setAttribute("id", "reply-time-el");
                    replyCard.appendChild(replyTimeEl);

                    replyContentEl.innerHTML = results[i].reply_content + "<br>";
                    replyAuthorEl.innerHTML = "Commented by: " + results[i].user.username;
                    replyTimeEl.innerHTML = "Updated on: " + results[i].updatedAt;

                    // Reply Delete API call
                    const replyDeleteId = results[i].id;
                    replyDeleteBtn.addEventListener("click", (event) => {
                        event.preventDefault();
                        fetch (`/api/reply/${replyDeleteId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                        .then(response => {
                            if (!response.ok) {
                            throw new Error('API request failed');
                            }
                            else if (response.ok) {
                                document.location.replace('/detailed');
                              }
                              
        
                        })
                    })
                };           
            })

        }

        // Reply API POST call
        saveReply();
        function saveReply () {
            const replyBtnEl = document.getElementsByClassName('reply-btn')[0];

            replyBtnEl.addEventListener("click", (event) => {
                event.preventDefault();              
                let reply_clear = document.getElementById('reply-input');
                const reply_content = document.getElementById('reply-input').value.trim();
                const user_id = sessionStorage.getItem('userInfoId');
                const post_id = results.id;

                reply_clear.value = '';

                console.log(user_id)

                fetch (`/api/reply/`, {
                    method: 'POST',
                    body: JSON.stringify({
                        reply_content,
                        user_id,
                        post_id
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    if (!response.ok) {
                    throw new Error('API request failed');
                    }
                    else if (response.ok) {
                        document.location.replace('/detailed');
                    }
                })
            })
        }   
        
    })
    .catch(error => {
        console.error(error);
    });   
})




