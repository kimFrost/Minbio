/**
 * Minbio Bootstrap
 */
var Minbio = new namespace("Minbio");

Minbio.Bootstrap = {
	init: function() {
		// On Ready

	},

	load: function(){
		// On Window load
		setupFrameSlider();
		setupAnalytics();
	},

	resize: function() {
		// On Resize

	},

	scroll: function() {
		// On Scroll

	}

};

// when all javascript resources has been loaded and the dom is ready.
$(document).ready(function() {

	Minbio.Bootstrap.init();

	$(window).load(function () {
		Minbio.Bootstrap.load();
	});

	$(window).on('scroll',function() {
		Minbio.Bootstrap.scroll();
	});

	$(window).resize(function() {
		Minbio.Bootstrap.resize();
	});

});


// Function archive
var setupFrameSlider = function() {
	$('.bulbframe-innerContent').each(function(){
		var $this = $(this);
		if ($this.find('li').length > 1) {
			$this.flexslider({
				animation: "fade"
			});
		}
	});
}

var setupAnalytics = function() {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	var url = window.location.href;

	try {
		ga('create', 'UA-42918512-1', 'minbio.dk');
		ga('send', 'pageview');
	} catch(err) {}

	$('a').each(function(){
		var $this = $(this);
		$this.on('click',function(event){
			var $this = $(this);
			var href = $this.attr('href');
			if (href.indexOf("http") != -1) {
				try {
					ga('send', 'event', href, 'click');
				} catch(err) {}
			}
			else {
				if (href == '#appApple') {
					event.preventDefault();
					try {
						ga('send', 'event', 'appApple', 'click');
					} catch(err) {}
				}
				else if (href == '#appAndroid') {
					event.preventDefault();
					try {
						ga('send', 'event', 'appAndroidBtn', 'click');
					} catch(err) {}
				}
				else if (href == '#desktopPlay') {
					event.preventDefault();
					try {
						ga('send', 'event', 'desktopPlayBtn', 'click');
					} catch(err) {}
				}
				else if ($this.hasClass('btn')) {


					event.preventDefault();
					var linkText = $this.text();
					try {
						ga('send', 'event', linkText, 'click');
					} catch(err) {}
				}
			}
		});
	});

	/*
	ms.data.view.element.on('page.activate',function(event,obj){
		try {
			var url = url+'?page#'+obj.id;
			ga('send', 'event', '$page#'+obj.id, 'activate');
		} catch(err) {}
	});
	*/
}