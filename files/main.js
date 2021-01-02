var SERVER_HOST = window.location.hostname;

$(document).ready(function() {
  // Page navigation
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


// Product image slider
function slider() {

  let sliderContainer = $("#product-slider .slider");
  sliderContainer.data("activeSlide", "1");
  let children = sliderContainer.children("img");

  setInterval(moveSlider, 5000);

  function moveSlider() {
    let currentSlide = parseInt(sliderContainer.data("activeSlide"));
    let width = $(children[(currentSlide-1)]).outerWidth(true) * -1;
    
    sliderContainer.css("transition", `transform 1s cubic-bezier(0.65, 0, 0.35, 1)`);
    sliderContainer.css("transform", `translateX(${width}px)`);

    setTimeout(() => {
      
      sliderContainer.css("transition", '');

      if (currentSlide < children.length) {
        sliderContainer.data("activeSlide", (currentSlide+1)).toString();
      } else {
        sliderContainer.data("activeSlide", 1).toString();
      }
      
      if (currentSlide > 1) {
        sliderContainer.find(`img[data-id=${currentSlide-1}]`).appendTo(sliderContainer);
      } else {
        sliderContainer.find(`img[data-id=${children.length}]`).appendTo(sliderContainer);
      }

      sliderContainer.css("transform", '');

    }, 1000);
  }
}


// Product details expanding
function expandMenu() {
  $(".menu-container .menu-list .expand-container").off();
  $(".menu-container .menu-list .expand-container").click(function() {
    
    let listHeight = 0;
    let arrowElement = this.querySelector(".inline-container.text .expand-btn p");
    let expandList = $(this).closest('.menu-section-wrapper').children('.expandable-list')

    $(expandList).children().each(function(){
        listHeight = listHeight + $(this).outerHeight(true);
    });

    
    if (expandList.hasClass("contract")) {
      $(arrowElement).html("&uarr;");
      expandList.removeClass("contract").addClass("expand");
      expandList.css("height", listHeight + "px");
    } else {
      $(arrowElement).html("&darr;");
      expandList.removeClass("expand").addClass("contract");
      expandList.css("height", "0px");
    }
  })
}