const interval = setInterval(async () => {
  try {
    const response = await fetch('/api/challenges/status', {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status !== 200) {
      clearInterval(interval);

      window.redirect = '/';
    }

    const payload = await response.json();

    if (payload.status === 'denied') {
      window.location = '/reject';
    }

    if (payload.status === 'approved') {
      window.location = '/profile';
    }
  } catch (error) {
    console.error(error);
  }
}, 5000);
