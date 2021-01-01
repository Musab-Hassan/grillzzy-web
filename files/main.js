var SERVER_HOST = window.location.hostname;

$(document).ready(function() {
  M.navigation("#page-render", [
    {
      id: "home",
      path: ["home"],
      src: SERVER_HOST + "/files/components/home.html",
      routers: [".n-link-home", ".brand-icon"],
      default: true,
      success: function(e) {
        slider();
        expandMenu();
        if (e) {
          if (e.target.classList.contains("menu")) {
            $([document.documentElement, document.body]).animate({
              scrollTop: $(".document-content .menu-container").offset().top
            }, 800);
          }
        }
      }
    },
    {
      id: "about",
      path: ["about"],
      src: SERVER_HOST + "/files/components/about.html",
      routers: [".n-link-about"],
      success: function(e) {
        if (e) {
          if (e.target.classList.contains("contact")) {
            $([document.documentElement, document.body]).animate({
              scrollTop: $(".document-content .contact-info").offset().top
            }, 800);
          }
        }
      }
    },
    {
      id: "availability",
      path: ["availability"],
      src: SERVER_HOST + "/files/components/availability.html",
      routers: [".n-link-availability"]
    }
  ]);
});


function slider() {
  let sliderContainer = $("#product-slider .slider");
  sliderContainer.data("activeSlide", "1");
  let children = sliderContainer.children("img");
  let width = 0;

  setInterval(moveSlider, 6000);

  function moveSlider() {
    let currentSlide = parseInt(sliderContainer.data("activeSlide"));
    
    if (currentSlide == children.length) {
      sliderContainer.css("transform", `translateX(0px)`);
      sliderContainer.data("activeSlide", "1");
      width = 0;
    } else {
      width = width + $(children[(currentSlide-1)]).outerWidth(true) * -1;
      sliderContainer.css("transform", `translateX(${width}px)`);
      sliderContainer.data("activeSlide", (currentSlide+1).toString());
    }
    /*$("#product-slider .slider").css("transform", "translate: ")
    console.log("Calling moveSlider");*/
  }
}

function expandMenu() {
  $(".menu-container .menu-list .expand-btn").click(function() {
    
    let listHeight = 0;
    let expandList = $(this).closest('.menu-section-wrapper').children('.expandable-list')

    $(expandList).children().each(function(){
        listHeight = listHeight + $(this).outerHeight(true);
    });

    
    if (expandList.hasClass("contract")) {
      $(this).html("View All Varients and Details &uarr;");
      expandList.removeClass("contract").addClass("expand");
      expandList.css("height", listHeight + "px");
    } else {
      $(this).html("View All Varients and Details &darr;");
      expandList.removeClass("expand").addClass("contract");
      expandList.css("height", "0px");
    }
  })
}