let users = {};

// Fetch users from the JSON file
fetch('users.json')
  .then(response => response.json())
  .then(data => {
    users = data;
  })
  .catch(error => {
    console.error('Error loading user data:', error);
  });

var current = null;

document.querySelector('#userid').addEventListener('focus', function(e) {
  if (current) current.pause();
  current = anime({
    targets: 'path',
    strokeDashoffset: {
      value: 0,
      duration: 700,
      easing: 'easeOutQuart'
    },
    strokeDasharray: {
      value: '240 1386',
      duration: 700,
      easing: 'easeOutQuart'
    }
  });
});

document.querySelector('#password').addEventListener('focus', function(e) {
  if (current) current.pause();
  current = anime({
    targets: 'path',
    strokeDashoffset: {
      value: -336,
      duration: 700,
      easing: 'easeOutQuart'
    },
    strokeDasharray: {
      value: '240 1386',
      duration: 700,
      easing: 'easeOutQuart'
    }
  });
});

// Event listener for the "Submit" button
document.querySelector('#submit').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent form submission
  handleLogin();
});

// Event listener for Enter key press specifically in input fields
document.querySelector('#userid').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent default form submission
    handleLogin();
  }
});

document.querySelector('#password').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent default form submission
    handleLogin();
  }
});

function handleLogin() {
  const userid = document.querySelector('#userid').value;
  const password = document.querySelector('#password').value;

  if (users[userid] && users[userid] === password) {
    console.log('Login successful, redirecting to game.html');
    localStorage.setItem('loggedIn', 'true'); // Store the login status in localStorage
    localStorage.setItem('currentUser', userid); // Store the current user ID
    window.location.href = 'game.html'; // Redirect to the game page
  } else {
    alert('Invalid User ID or Password');
  }
}
