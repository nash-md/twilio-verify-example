const login = async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ name: name, password: password })
    });

    const payload = await response.json();

    window.location = payload.redirect;
  } catch (error) {
    document.getElementById('error').style.display = 'block';
  }
};

document.getElementById('login-button').addEventListener('click', login);
