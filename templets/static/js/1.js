document.addEventListener('DOMContentLoaded', function () {
    
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    (function() {
        var posY;
        var image = document.getElementById('parallax');
        function paralax() {
            posY = window.pageYOffset;
            image.style.top = posY * 0.9 + 'px';
        }
        window.addEventListener('scroll', paralax);
    })();
});


