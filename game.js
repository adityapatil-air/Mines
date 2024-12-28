<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login with Google</title>
  <link rel="stylesheet" href="styles.css">
  <!-- Google Identity Services -->
  <script src="https://accounts.google.com/gsi/client" async defer></script>
  <!-- JWT Decode Library -->
  <script src="https://cdn.jsdelivr.net/npm/jwt-decode/build/jwt-decode.min.js"></script>
  <meta name="google-signin-client_id" content="725141051905-4pt2sa2ktvbap337gl2jerfjfvo07co1.apps.googleusercontent.com">
</head>
<body>
  <div class="header">
    <h1>Mines</h1>
  </div>
  
  <div class="page">
    <div class="container">
      <div class="left">
        <div class="login">Login</div>
        <div class="eula">Sign in with Google to start playing the game.   adityapatil-air</div>
      </div>
      <div class="right">
        <div class="form">
          <div id="g_id_onload"
               data-client_id="725141051905-4pt2sa2ktvbap337gl2jerfjfvo07co1.apps.googleusercontent.com"
               data-context="signin"
               data-ux_mode="popup"
               data-callback="onSignIn"
               data-auto_prompt="false">
          </div>
          <div class="g_id_signin" data-type="standard"></div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="footer">
    <p>Copyright © 2024 adityapatil-air</p>
  </div>

  <script src="scripts.js"></script>
</body>
</html>
