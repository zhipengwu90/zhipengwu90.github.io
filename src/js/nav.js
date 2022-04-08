/*

TemplateMo 560 Astro Motion

https://templatemo.com/tm-560-astro-motion

*/

function closeMenu() {
	$(".navbar-collapse").removeClass("show"); 
  }
  
  function highlightMenu(no) {
	$(".navbar .navbar-nav > .nav-item").removeClass('selected');
	$(".navbar .navbar-nav > .nav-item > .nav-link[data-no='" + no + "']").parent().addClass('selected');
  }
  
  
  
  function openPage(no) {
  
  
	$('.cd-hero-slider li').hide();
	$('.cd-hero-slider li[data-page-no="' + no + '"]')
	  .fadeIn();
  }
  
  $(window).on('load', function() {
	setTimeout(function(){
		$('body').addClass('loaded');
	}, 400);
	openPage(1);
  });
  
  jQuery(function() {
	  $('.tm-page-link').on('click', function(){
		var pageNo = $(this).data('page-no');
		openPage(pageNo);
		highlightMenu(pageNo);
	  });
  
	  $(".navbar .navbar-nav > .nav-item > a.nav-link").on('click', function(e){
		var pageNo = $(this).data('no');
  
		openPage(pageNo);
		highlightMenu(pageNo);
		closeMenu();     
	  });
  
	  $("html").click(function(e) {
		closeMenu();
	  });
  });


