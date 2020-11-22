var SERVER_HOST = window.location.hostname;

$(document).ready(function() {
  M.navigation("#page-render", [
    {
      id: "home",
      path: ["home"],
      src: SERVER_HOST + "/files/components/home.html",
      routers: [".n-link-home"],
      default: true,
      success: function(e) {
        slider();
        if (e) {
          if (e.target.classList.contains("menu")) {
            $([document.documentElement, document.body]).animate({
              scrollTop: $(".document-content .menu-container").offset().top
            }, 800);
          } else if (e.target.classList.contains("av")) {
            $([document.documentElement, document.body]).animate({
              scrollTop: $(".document-content .location-container").offset().top
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