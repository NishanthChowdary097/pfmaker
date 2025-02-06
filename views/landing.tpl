<html>
<head>
</head>
<style>
/* Start Global Rules */
* {
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
}
body {
  font-family: 'Open Sans', sans-serif;
}
a {
  text-decoration: none;
  color:#5d5d5d;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.container {
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
}
/* Small */
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
/* Medium */
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
/* Large */
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
/* End Global Rules */

/* Start Landing Page */
.landing-page header {
  min-height: 80px;
  display: flex;
}
@media (max-width: 767px) {
  .landing-page header {
    min-height: auto;
    display: initial;
  }
}
.landing-page header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
@media (max-width: 767px) {
  .landing-page header .container {
    flex-direction: column;
    justify-content: center;
  }
}
.landing-page header .logo {
  color: #5d5d5d;
  font-style: italic;
  text-transform: uppercase;
  font-size: 20px;
}
@media (max-width: 767px) {
  .landing-page header .logo {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
.landing-page header .links {
  display: flex;
  align-items: center;
}
@media (max-width: 767px) {
  .landing-page header .links {
    text-align: center;
    gap: 10px;
  }
}
.landing-page header .links li {
  margin-left: 30px;
  color: #5d5d5d;
  cursor: pointer;
  transition: .3s;
}
@media (max-width: 767px) {
  .landing-page header .links li {
    margin-left: auto;
  }
}
.landing-page header .links li:last-child {
  border-radius: 20px;
  padding: 10px 20px;
  color: #FFF;
  background-color: #6c63ff;
}
.landing-page header .links li:not(:last-child):hover {
  color: #6c63ff;
}
.landing-page .content .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 140px;
  min-height: calc(100vh - 80px);
}
@media (max-width: 767px) {
  .landing-page .content .container {
    gap: 0;
    min-height: calc(100vh - 101px);
    justify-content: center;
    flex-direction: column-reverse;
  }
}
@media (max-width: 767px) {
  .landing-page .content .info {
    text-align: center;
    margin-bottom: 15px 
  }
}
.landing-page .content .info h1 {
  color: #5d5d5d;
  font-size: 44px;
}
.landing-page .content .info p {
  margin: 0;
  line-height: 1.6;
  font-size: 15px;
  color: #5d5d5d;
}
.landing-page .content .info button {
  border: 0;
  border-radius: 20px;
  padding: 12px 30px;
  margin-top: 30px;
  cursor: pointer;
  color: #FFF;
  background-color: #6c63ff;
}
.landing-page .content .image img {
  max-width: 100%;
}
.aboutus{
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;
  overflow:scroll;
}

.person-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 20px;
  width: 250px;
  transition: transform 0.3s ease;
}

.person-card:hover {
  transform: translateY(-10px);
}

.person-image {
  width: 120px;
  height: 120px;
  border-radius: 50%; /* Make the image circular */
  object-fit: cover;
  margin-bottom: 15px;
}

.person-name {
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
}
.person-card p {
  font-size: 1rem;
  color: #666;
  font-style: italic;
  margin-top: 10px;
}


/* End Landing Page */

</style>
<body>
      <div class="landing-page">
        <header>
          <div class="container">
            <a href="#" class="logo">Portfolio <b>MAKEROMA</b></a>
            <ul class="links">
              <li><a href="#Home">Home</a></li>
              <li><a href="#About_Us">About Us</a></li>
              <li>Work</li>
              <li>Search</li>
              <li>Contact Us</li>
              <li><a href='/login' style="color:white;">Login</a></li>
            </ul>
          </div>
        </header>
        <section id="home">
        <div class="content">
          <div class="container">
            <div class="info">
              <h1>Looking For Inspiration</h1>
              <p>If you want to make a portfolio </p>
              <button onclick="location.href='/signup'">Get started For Free</button>
            </div>
            <div class="image">
              <img src="https://i.postimg.cc/65QxYYzh/001234.png">
            </div>
          </div>
        </div>
        </section>
    </div>
    <section id="About_Us">
        <div class="aboutus">
            <div class="person-card">
                <img src="http://teleuniv.net.in/sanjaya/student-images/245322733097.jpg" alt="Person Image" class="person-image">
                <h2 class="person-name">Nishanth Chowdary</h2>
                <p>BackEnd Developer</p>
            </div>
            <div class="person-card">
                <img src="http://teleuniv.net.in/sanjaya/student-images/245322733098.jpg" alt="Person Image" class="person-image">
                <h2 class="person-name">FahadAMD</h2>
                <p>FrontEnd Developer</p>
            </div>
            <div class="person-card">
                <img src="https://cdn-icons-png.flaticon.com/512/11865/11865338.png" alt="Person Image" class="person-image">
                <h2 class="person-name">ChatGPT</h2>
                <p>Code Writer</p>
            </div>
        </div>
    </section>

      <!-- End Landing Page -->
      </body>
      <script>
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      });
    });
      </script>
      </html>