$(document).ready(function() {

	//Toggle Nav Bar:
		$('.iconmenu, .iconx').click(function() {
			$('.navi').toggleClass('open',500);
			$('.iconmenu').toggle();
			$('.iconx').toggle();
		});

	//Navigate through views:
		$(function(){

			//Variables
				var pagePositon = 0,
					sectionsSelector = '.-container',
					$scrollItems = $(sectionsSelector),
					offsetTolorence = 5,
					pageMaxPosition = $scrollItems.length - 1;

			//Map the sections:
				$scrollItems.each(function(index,ele) { $(ele).attr("debog",index).data("pos",index); });

			//Track current view on scroll
				$(window).bind('scroll',upPos);

			//Move on click:
				$('.mdown,.mup').click(function(e){
					if ($(this).hasClass('mdown') && pagePositon+1 <= pageMaxPosition) {
						pagePositon++;
						$('html, body').stop().animate({
							scrollTop: $scrollItems.eq(pagePositon).offset().top
							}, 500);
					}
					if ($(this).hasClass('mup') && pagePositon-1 >= 0) {
						pagePositon--;
						$('html, body').stop().animate({
							scrollTop: $scrollItems.eq(pagePositon).offset().top
							}, 500);
						return false;
						}
					});

			//Update position function:
				function upPos(){
					var fromTop = $(this).scrollTop();
					var $cur = null;

					$scrollItems.each(function(index,ele){
						//If next or previous element isn't with the offset tolerance, set $cur equal to the current element
						if ($(ele).offset().top < fromTop + offsetTolorence) $cur = $(ele);
						});
						//If the next or previous element isn't within the offset tolerance and position isn't set to the current element, update the position
						if ($cur != null && pagePositon != $cur.data('pos')) {
							pagePositon = $cur.data('pos');
						}
				}

			//Move on Mouse-wheel Scroll
				$(window).bind('mousewheel DOMMouseScroll', function(event){
					if (event.originalEvent.wheelDelta < 0 || event.originalEvent.detail < 0) {
						//Scroll up
							if (pagePositon+1 <=pageMaxPosition) {
								pagePositon++;
								$('html, body').stop().animate({
									scrollTop: $scrollItems.eq(pagePositon).offset().top
									},500);
							}
					}
					else {
						//Scroll down
							if (pagePositon-1 >= 0) {
								pagePositon--;
								$('html, body').stop().animate({
									scrollTop: $scrollItems.eq(pagePositon).offset().top
									}, 500);
								return false;
							}
					};
				});

			//Move on press arrow keys
				// $('.mdown,.mup').click(function(e){
				// 	if ($(this).hasClass('mdown') && pagePositon+1 <= pageMaxPosition) {
				// 		pagePositon++;
				// 		$('html, body').stop().animate({
				// 			scrollTop: $scrollItems.eq(pagePositon).offset().top
				// 			}, 500);
				// 	}
				// 	if ($(this).hasClass('mup') && pagePositon-1 >= 0) {
				// 		pagePositon--;
				// 		$('html, body').stop().animate({
				// 			scrollTop: $scrollItems.eq(pagePositon).offset().top
				// 			}, 500);
				// 		return false;
				// 		}
				// 	});

			//Hide Arrows at Top and Bottom Views
				$(window).scroll(function(){
					switch (pagePositon) {
						case 0:
							$('.mup').stop().fadeOut(200);
							break;

						case pageMaxPosition:
							$('.mdown').stop().fadeOut(200);
							break;

						default:
							$('.mdown,.mup').stop().fadeIn(200);

					};
				});

			//Cycle numbers to show location
				// $(window).scroll(function(){
				// 	switch (pagePositon) {
				// 		case 0:
				// 			$('.mup').slideUp(300);
				// 			break;

				// 		case pageMaxPosition:
				// 			$('.mdown').slideUp(300);
				// 			break;

				// 		default:
				// 			$('.mdown,.mup').slideDown(300);

				// 	};
				// });
		});

	//Next Function...
});