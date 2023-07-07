async function newFormHandler(event) {
  event.preventDefault();
  const post_title = document.getElementById('title').value.trim();
  const post_content = document.getElementById('content').value;
  const user_id = sessionStorage.getItem('userInfoId');

  const payload = {
    post_title,
    post_content,
    user_id
  };
  console.log(payload)
  try {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/post-list');
    } else {
      document.location.replace('/fail');
    }
  } catch (error) {
    console.error(error);
  }
}

document.getElementById('submitButton').addEventListener('click', newFormHandler);