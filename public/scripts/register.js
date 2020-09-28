const login = async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ name: name, password: password })
    });

    window.location = '/';
  } catch (error) {
    document.getElementById('error').style.display = 'block';
  }
};

document.getElementById('register-button').addEventListener('click', login);
