// --- [ SCROLL TO TOP ]
// init controller
var controller = new ScrollMagic.Controller();
// build tween
var tween = TweenMax.from("#animate", 0.5, {autoAlpha: 0, scale: 0.7});
// build scene
var scene = new ScrollMagic.Scene({
	triggerElement: "a#top",
	duration: 200,
	triggerHook: "onLeave"
})
.setTween(tween)
// .addIndicators() // add indicators (requires plugin)
.addTo(controller);

// change behaviour of controller to animate scroll instead of jump
// controller.scrollTo(function (newpos) {
// 	TweenMax.to(window, 0.5, {
// 		scrollTo: {
// 			y: newpos
// 		}
// 	});
// });

controller.scrollTo(function(target) {

  TweenMax.to(window, 0.5, {
    scrollTo : {
      y : target, // scroll position of the target along y axis
      autoKill : true // allows user to kill scroll action smoothly
    },
    ease : Cubic.easeInOut
  });

});

// bind scroll to anchor links
$(document).on("click", ".scroll-to[href^='#']", function (e) {
	var id = $(this).attr("href");
	if ($(id).length > 0) {
		e.preventDefault();
		// trigger scroll
		controller.scrollTo(id);
		// if supported by the browser we can even update the URL.
		if (window.history && window.history.pushState) {
			history.pushState("", document.title, id);
		}
	}
});



// --- [ SCROLLSPY ]
// Set duration to screen height
var durationValueCache;
function getDuration () {
	return durationValueCache;
}
function updateDuration (e) {
	durationValueCache = window.innerHeight;
}
$(window).on("resize", updateDuration); // update the duration when the window size changes
$(window).triggerHandler("resize"); // set to initial value
scene.duration(getDuration); // supply duration method

// build scenes
new ScrollMagic.Scene({triggerElement: "#aboutme", duration: $("#aboutme").height()})
	.setClassToggle("#nav-aboutme", "active") // add class toggle
	.addTo(controller);
new ScrollMagic.Scene({triggerElement: "#resume", duration: $("#resume").height()})
	.setClassToggle("#nav-resume", "active") // add class toggle
	.addTo(controller);
new ScrollMagic.Scene({triggerElement: "#clients", duration: $("#clients").height()})
	.setClassToggle("#nav-clients", "active") // add class toggle
	.addTo(controller);
new ScrollMagic.Scene({triggerElement: "#contact", duration: $("#contact").height()})
	.setClassToggle("#nav-contact", "active") // add class toggle
	.addTo(controller);

