

var typed3 = new Typed('#welcome', {
    strings: ['welcome'],
    typeSpeed: 120,
    backSpeed: 100,
    cursorChar: '_',
    smartBackspace: true,
    loop: true
  });
var typed3 = new Typed('#type-skill', {
    strings: ['web designer', 'web developer', 'Freelancer', 'Graphic designer'],
    typeSpeed: 70,
    backSpeed: 80,
    cursorChar: '|',
    smartBackspace: true,
    loop: true
  });
var typed3 = new Typed('#about-type', {
    strings: ['web designer', 'web developer', 'Freelancer', 'Graphic designer'],
    typeSpeed: 70,
    backSpeed: 30,
    cursorChar: '|',
    smartBackspace: true,
    loop: true
  });


$(document).ready(function(){


  // menu scrolled

  $(window).scroll(function(){
    if(this.scrollY >200){
      $('.menubar').addClass('scrollmenu');
      $('.gototop').fadeIn('slow');
    }else{
      $('.menubar').removeClass('scrollmenu');
      $('.gototop').fadeOut('slow');
    }
  })

    // Scroll top
    $('.gotop').click(function(){
      $('html, body').animate({scrollTop:0}, 1500)
  })


     // Smooth scroll for the navigation menu and links with .scrollto classes
    // Select all links with hashes
        $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && 
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1600, function() {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) { // Checking if the target was focused
                return false;
                } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
                };
            });
            }
        }
        });


        // portfolio filter
        $(".btn-portfolio").click(function(){
          var value = $(this).attr('data-filter');
  
          if( value == "all"){
              $('.filter').fadeIn(1000);
          }else{
              $('.filter').not('.'+value).hide(700);
              $('.filter').filter('.'+value).show(700);
          }
      });
  
      $('.btn-portfolio').on('click', function() {
          $(".btn-portfolio").removeClass('portfolio-active');
          $(this).addClass('portfolio-active');
        });


        // skills circular proggrass bar
     
        $(function() {
          $('.chart').easyPieChart({
              //your options goes here
          });
      });


      // Init AOS
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

  // skills bar animation
  $('.skill-per').each(function(){
    var $this = $(this);
    var per = $this.attr('per');
    $this.css("width",per+'%');
    $({animatedValue: 0}).animate({animatedValue: per},{
      duration: 1500,
      step: function(){
        $this.attr('per', Math.floor(this.animatedValue) + '%');
      },
      complete: function(){
        $this.attr('per', Math.floor(this.animatedValue) + '%');
      }
    });
  });


});


function myGhori(){
  const dates = new Date();
  const my_year = dates.getFullYear();
  document.querySelector("#copyYear").innerHTML = my_year;
};
myGhori();



// form submition

window.addEventListener("DOMContentLoaded", function() {

  // get the form elements defined in your form HTML above
  
  var form = document.getElementById("portfolio-form");
  var button = document.getElementById("submit-button");
  var status = document.getElementById("submition-status");

  // Success and Error functions for after the form is submitted
  
  function success() {
    form.reset();
    status.classList.add("success");
    button.style = "display: none ";
    status.innerHTML = "Thank You!  Submited successfully!";
  }

  function error() {
    status.classList.add("error");
    status.innerHTML = "Oops! There was a problem.";
  }

  // handle the form submission event

  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}