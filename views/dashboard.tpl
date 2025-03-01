<html>
  <style>
    .divide-y{
      background-color: red;
    }
  </style>
  <body>
  </body>
  </html>

<script>
  window.onload = function() {
    console.log('hello')
    fetch('./userinfo').then(response => response.json())
        .then(data => {
        console.log(data.data);
        Object.keys(data.data).forEach(key => {
          console.log(key + ": " + data.data[key]);
          sessionStorage.setItem(key,data.data[key])
        });
        sessionStorage.setItem("data",data.data)
        }).catch(error => {
            console.error('Error:', error);
        });
    console.log(sessionStorage.getItem('tools'))
  }
</script>