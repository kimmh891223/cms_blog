const loginFormHandler = async(event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {    
      const userInfoResponse = await fetch(`/api/user/email/${email}`, {
        method: 'GET',
      })
      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json();
        const userInfoName = userInfo[0].username;
        const userInfoId = userInfo[0].id;
        sessionStorage.setItem('userInfoName', userInfoName);
        sessionStorage.setItem('userInfoId',userInfoId);
      } else {
        alert('Failed to API call.');
      }
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/user/', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const userInfoResponse = await fetch(`/api/user/email/${email}`, {
        method: 'GET',
      })
      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json();
        const userInfoName = userInfo[0].username;
        const userInfoId = userInfo[0].id;
        sessionStorage.setItem('userInfoName', userInfoName);
        sessionStorage.setItem('userInfoId',userInfoId);
      } else {
        alert('Failed to API call.');
      }
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);


