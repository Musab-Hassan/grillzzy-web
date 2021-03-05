var SERVER_HOST = window.location.host;

$(document).ready(function() {
	// Page navigation
	M.navigation("#page-render", [
	{
		id: "home",
		path: ["home"],
		src: SERVER_HOST + "/files/components/home.html",
		routers: [".n-link-home", ".brand-icon"],
		default: true,
		before: loader.in,
		success: function(e) {
			
			$("#page-loader").css("transition", "opacity 0.4s ease");
			loader.load(() => {
				slider();
				expandProduct();
				mobileNav();
				if (e) {
					if (e.target.classList.contains("menu")) {
						$([document.documentElement, document.body]).animate({
						scrollTop: $(".document-content .menu-container").offset().top
						}, 800);
					}
				}
			});
		}
	},
	{
		id: "about",
		path: ["about"],
		src: SERVER_HOST + "/files/components/about.html",
		routers: [".n-link-about"],
		before: loader.in,
		success: function(e) {

			loader.load(() => {
				mobileNav();
				if (e) {
					if (e.target.classList.contains("contact")) {
						$([document.documentElement, document.body]).animate({
						scrollTop: $(".document-content .contact-info").offset().top
						}, 800);
					} else if (e.target.classList.contains("distributer-scroll")) {
						$([document.documentElement, document.body]).animate({
						scrollTop: $(".document-content .distributers").offset().top
						}, 800);
					}
				}
			});
		}
	},
	{
		id: "availability",
		path: ["availability"],
		src: SERVER_HOST + "/files/components/availability.html",
		routers: [".n-link-availability"],
		before: loader.in,
		success: () => {
			loader.load(() => {
				mobileNav();
			})
		}
	}
	]);

	M.transitions.mntm_scroll("#page-container", [
	  {element: "#page-container", parent: true}
	], 1000, 0.08);
});

var loader = {
	in: function() {
		return new Promise((resolve) => {
			$("#page-loader").css("height", "100vh");
			$("#page-loader").addClass("show");
			$(".g-analytics").remove();
			setTimeout(resolve, 500);
		}
	)},
	load: function(func) {
		let promiseArray = [];
		
		$('img[data-src]').each( function(i, e) {
			let promise = new Promise((resolve, error) => {
				$(this).attr("loading", "eager");
				this.src = $(this).data('src');
				this.onload = () => {
					resolve(i);
				};
				this.onerror = (e) => {
					$(this).attr("alt", "Could not load Image");
					resolve(i);
				}
			});
			promiseArray.push(promise);
		});

		Promise.all(promiseArray).then(() => {
			let xhr = new XMLHttpRequest();
			xhr.open('GET', './files/components/analytics.html');
			xhr.onload = () => {
				func();
				$("head").append(xhr.response)
				$("#page-loader").removeClass("show");
				setTimeout(() => $("#page-loader").css("height", "0"), 500);
			};
			xhr.onerror = () => {
				func();
				$("head").appen(xhr.response)
				$("#page-loader").removeClass("show");
				console.log(xhr.response);
			}
			xhr.send();
		});
	}
}


// Hamburger button handler
function mobileNav() {
	$("#back-image-container .hb-button").off("click");
	$("#back-image-container .hb-button").on("click", function() {
		let active = $(this).hasClass("close");
		if (active) {
			$("#back-image-container .m-nav-container").removeClass("active");
			$(this).removeClass("close");
		} else {
			$(this).addClass("close");
			$("#back-image-container .m-nav-container").addClass("active");
		}
	});
}


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
function expandProduct() {
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