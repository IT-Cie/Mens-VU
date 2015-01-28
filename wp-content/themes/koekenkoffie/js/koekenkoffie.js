$(function() {


	// Slider in the background of header
	$(".rslides").responsiveSlides({
    timeout: 10000
    });

	// Animate scroll to target when the target is an id 
	//$('a[href^="#"]').on('click',function (e) {
	//    e.preventDefault();

	//    var target = this.hash,
	//    $target = $(target);

	//    $('html, body').stop().animate({
	//        'scrollTop': $target.offset().top
	//    }, 900, 'swing', function () {
	//        window.location.hash = target;
	//    });
	//});

	// Hide to top-button when in the top
	$(window).scroll(function() {
		if($(this).scrollTop() > 370) {
			$('#toTop').fadeIn();	
		} else {
			$('#toTop').fadeOut();
		}
	});

	// Animate scroll to top
	$('#toTop').click(function() {
		$('body,html').animate({scrollTop:0},800);
	});	

	// DropDown divs on tentamenbundel
    $('a.tentamenbundel').click(function() {
	    var target = this.hash + "div",
	    $target = $(target);
            $target.slideToggle('slow');
            return false;
    });
    
    // Smooth scroll
    $('a[href*=#]:not([href=#])').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 30
                }, {duration: 1000, queue: false});
            return false;
          }
        }
    });

    
    // Alert on opening Parameter Estimation exams
    $('a#JdM').click(function() {
	    alert("Let op, Het is nooit toegestaan om het Parameter Estimation tentamen mee te nemen, omdat Jan de Munck tentamenvragen graag hergebruikt.\nJan de Munck weet dus niet dat de studenten in het bezit zijn van deze vragen.\nZorg er dus voor dat Jan hier ook niet achter komt, want dat zou hoogstwaarschijnlijk betekenen dat hij een compleet nieuw tentamen gaat maken en deze vragen dus niet meer zo waardevol zijn.\nStel in college dus geen vragen over dit tentamen, maar zoek samen de antwoorden en doe daar je voordeel mee.");
    });      
    
    
    
    });