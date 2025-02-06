<html>
    <head>
        <title>Login</title>
        <link rel="stylesheet" href="/static/css/log.css">
    </head>
    <body>
    <div class="card" >
        <h2>Login to Your Account</h2>
        <form action="/login" method="post">
            <input type="text" id="username" placeholder="Username" name="username" required><br>
            <input type="password" placeholder="Password" id="password" name="password" required><br>
            <input type="submit" value="Login">
        </form>
        
        <p>Don't have an account? </p>
        <a href="/signup">Sign up here</a>
        </div>
    </body>
</html>
