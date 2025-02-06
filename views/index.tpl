<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <header>
        <h1>Welcome to My Portfolio</h1>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/skills">Skills</a></li>
            </ul>
        </nav>
    </header>

    <section>
        <h2>Skills</h2>
        <ul>
            {% for skill in skills %}
                <li>{{ skill }}</li>
            {% endfor %}
        </ul>
    </section>

    <section>
        <h2>Projects</h2>
        {% for project in projects %}
            <div>
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
            </div>
        {% endfor %}
    </section>
</body>
</html>
