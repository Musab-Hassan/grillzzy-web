var SERVER_HOST = ""; //window.location.hostname

$(document).ready(function() {
    M.navigation("#page-render", [
    {
      id: "home",
      path: ["home"],
      src: SERVER_HOST + "/files/components/home.html",
      routers: [".n-link-home"],
      default: true,
      success: function(e) {
        console.log(e.classList);
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