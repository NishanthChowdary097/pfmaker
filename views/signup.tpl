<html>
    <head>
        <title>Signup</title>
        <link rel="stylesheet" href="/static/css/log.css">
    </head>
    <body>
        <div class="card" >
        <h2>Create a New Account</h2>
        <form action="/signup" method="post">
            <input type="text" id="username" name="username" placeholder="Username" required><br>
            <input type="password" id="password" name="password" placeholder="Password" required><br>
            <input type="submit" value="Sign Up">
        </form>
        
        <p>Already have an account?</p>
        <a href="/login">Login here</a>
        </div>
    </body>
</html>
