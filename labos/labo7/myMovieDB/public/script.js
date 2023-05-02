$(document).ready(function() {
    $('.hamburger-menu').click(function() {
        if ($('.sidebar').css('left') === '-250px') {
            $('.sidebar').css('left', '0');
        } else {
            $('.sidebar').css('left', '-250px');
        }
    });

    $('.nav-menu a').click(function() {
        if ($(window).width() <= 768) {
            $('.sidebar').css('left', '-250px');
        }
    });

    $(window).resize(function() {
        if ($(window).width() > 768) {
            $('.sidebar').css('left', '0');
        } else {
            $('.sidebar').css('left', '-250px');
        }
    });
});
