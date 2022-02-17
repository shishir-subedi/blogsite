/*======================================================
|   |   |   Preloader    |   |   |
=======================================================*/
$(window).on('load', function () { //make sure that whole site is loaded
    $('#status').fadeOut();
    $('#preloader').delay(250).fadeOut();
});

/*======================================================
|   |   |   Disqus ads removal    |   |   |
=======================================================*/
$(window).on('load', function () {
    $("iframe[id^='dsq-app']").each(function (i, el) {
        if(i===0 || i===2) {
          el.remove();
        };
    });
});

/*====================================================
                        Navigation
====================================================*/
$(window).scroll(function () {
    if ($(this).scrollTop() < 50) {
        // hide nav
        $("#home-header").removeClass("top-nav");
        $("#back-to-top").fadeOut('slow');
    } else {
        // show nav
        $("#home-header").addClass("top-nav");
        $("#back-to-top").fadeIn('slow');
    }
});

$(function () {

    $('#back-to-top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
        return false;
    });

    /*====================================================
                        Smooth Scroll
    ====================================================*/

    // Add smooth scrolling to all links
    $(".nav-link, #back-to-top").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            // Store hash
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (1000) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function () {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    /*======================================================
    |   |   |   |       Progress Bars     |     |     |    |
    =======================================================*/
    $("#progress-elements").waypoint(function () {
        $(".progress-bar").each(function () {
            $(this).animate({
                width: $(this).attr("aria-valuenow") + "%"
            }, 1000);
        });
        this.destroy();
    }, {
        offset: 'bottom-in-view'
    });

    /*======================================================
    |   |   |   |  Animate Techstack on hover    |     |   |
    =======================================================*/
    $(".techstack-image").hover( function (e) {
        $(this).attr("data-wow-duration", "0.2s")
        $(this).toggleClass('wow pulse animated', e.type === 'mouseenter');
    });
});