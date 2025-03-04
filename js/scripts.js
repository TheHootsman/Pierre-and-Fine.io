    $(document).ready(function () {

        /***************** Waypoints ******************/

        $('.wp1').waypoint(function () {
            $('.wp1').addClass('animated fadeInLeft');
        }, {
            offset: '75%'
        });
        $('.wp2').waypoint(function () {
            $('.wp2').addClass('animated fadeInRight');
        }, {
            offset: '75%'
        });
        $('.wp3').waypoint(function () {
            $('.wp3').addClass('animated fadeInRight');
        }, {
            offset: '75%'
        });
        $('.wp4').waypoint(function () {
            $('.wp4').addClass('animated fadeInLeft');
        }, {
            offset: '75%'
        });
        $('.wp5').waypoint(function () {
            $('.wp5').addClass('animated fadeInRight');
        }, {
            offset: '75%'
        });
        $('.wp6').waypoint(function () {
            $('.wp6').addClass('animated fadeInLeft');
        }, {
            offset: '75%'
        });
        $('.wp7').waypoint(function () {
            $('.wp7').addClass('animated fadeInDown');
        }, {
            offset: '75%'
        });
        $('.wp8').waypoint(function () {
            $('.wp8').addClass('animated fadeInRight');
        }, {
            offset: '75%'
        });
        $('.wp9').waypoint(function () {
            $('.wp9').addClass('animated fadeInRight');
        }, {
            offset: '75%'
        });

        /***************** Initiate Flexslider ******************/
        $('.flexslider').flexslider({
            animation: "slide"
        });

        /***************** Initiate Fancybox ******************/

        $('.single_image').fancybox({
            padding: 4
        });

        $('.fancybox').fancybox({
            padding: 4,
            width: 1000,
            height: 800
        });

        /***************** Tooltips ******************/
        $('[data-toggle="tooltip"]').tooltip();

        /***************** Nav Transformicon ******************/

        /* When user clicks the Icon */
        $('.nav-toggle').click(function () {
            $(this).toggleClass('active');
            $('.header-nav').toggleClass('open');
            event.preventDefault();
        });
        /* When user clicks a link */
        $('.header-nav li a').click(function () {
            $('.nav-toggle').toggleClass('active');
            $('.header-nav').toggleClass('open');

        });

        /***************** Header BG Scroll ******************/

        $(function () {
            $(window).scroll(function () {
                var scroll = $(window).scrollTop();

                if (scroll >= 20) {
                    $('section.navigation').addClass('fixed');
                    $('header').css({
                        "border-bottom": "none",
                        "padding": "35px 0"
                    });
                    $('header .member-actions').css({
                        "top": "26px",
                    });
                    $('header .navicon').css({
                        "top": "34px",
                    });
                } else {
                    $('section.navigation').removeClass('fixed');
                    $('header').css({
                        "border-bottom": "solid 1px rgba(255, 255, 255, 0.2)",
                        "padding": "50px 0"
                    });
                    $('header .member-actions').css({
                        "top": "41px",
                    });
                    $('header .navicon').css({
                        "top": "48px",
                    });
                }
            });
        });
        /***************** Smooth Scrolling ******************/

        $(function () {

            $('a[href*=#]:not([href=#])').click(function () {
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - 90
                        }, 2000);
                        return false;
                    }
                }
            });

        });


        
        /********************** Embed youtube video *********************/
        $('.player').YTPlayer();


        /********************** Toggle Map Content **********************/
        $('#btn-show-map').click(function () {
            $('#map-content').toggleClass('toggle-map-content');
            $('#btn-show-content').toggleClass('toggle-map-content');
        });
        $('#btn-show-content').click(function () {
            $('#map-content').toggleClass('toggle-map-content');
            $('#btn-show-content').toggleClass('toggle-map-content');
        });

        /********************** Add to Calendar **********************/
        var myCalendar = createCalendar({
            options: {
                class: '',
                // You can pass an ID. If you don't, one will be generated for you
                id: ''
            },
            data: {
                // Event title
                title: "Pierre and Fine's Wedding",

                // Event start date
                start: new Date('Aug 23, 2025 14:00'),
                end: new Date('Aug 24, 2025 02:30'),

                // Event Address
                address: 'Kellerskopf, Wiesbaden',

                // Event Description
                description: "We can't wait to see you on our big day!"
            }
        });

        $('#add-to-cal').html(myCalendar);


        /********************** RSVP **********************/
        $('#rsvp-form').on('submit', function (e) {
            e.preventDefault();
            var data = $(this).serialize();

            $('#alert-wrapper').html(alert_markup('info', '<strong>Just a sec!</strong> We are saving your details.'));

            if (MD5($('#invite_code').val()) !== 'b0e53b10c1f55ede516b240036b88f40'
                && MD5($('#invite_code').val()) !== '2ac7f43695eb0479d5846bb38eec59cc') {
                $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> Your invite code is incorrect.'));
            } else {
                $.post('https://script.google.com/macros/s/AKfycbyo0rEknln8LedEP3bkONsfOh776IR5lFidLhJFQ6jdvRiH4dKvHZmtoIybvnxpxYr2cA/exec', data)
                    .done(function (data) {
                        console.log(data);
                        if (data.result === "error") {
                            $('#alert-wrapper').html(alert_markup('danger', data.message));
                        } else {
                            $('#alert-wrapper').html('');
                            $('#rsvp-modal').modal('show');
                        }
                    })
                    .fail(function (data) {
                        console.log(data);
                        $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> There is some issue with the server. '));
                    });
            }
        });

    });

    /********************** Extras **********************/

    // Google map
    function initMap() {
        var location = {lat: 50.137896, lng: 8.283092};
        var map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 13,
            center: location,
            scrollwheel: false
        });

        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }

    function initBBSRMap() {
        var la_fiesta = {lat: 50.137896, lng: 8.2830972};
        var map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 13,
            center: la_fiesta,
            scrollwheel: false
        });

        var marker = new google.maps.Marker({
            position: la_fiesta,
            map: map
        });
    }

    // alert_markup
    function alert_markup(alert_type, msg) {
        return '<div class="alert alert-' + alert_type + '" role="alert">' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>';
    }
