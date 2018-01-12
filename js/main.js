$(document).ready(function () {
	var index = 0;

	var $controller = $('.main-corousel').find('.controller');
	var $corousel = $('.main-corousel').find('.corousel');
	var $images = $corousel
		.find('.gallery')
		.find('img');

	var $thumbnails = $corousel
		.find('.preview')
		.find('.image');

	var $left = $controller.find('.left-arrow').first();
	var $right = $controller.find('.right-arrow').first();

	var $active = $images.eq(0);

	var isDone = true;

	// When the right arrow is clicked
	$right.click(function () {
		if (isDone && index < $images.length) {
			var $image = $images.eq(index);

			// Hide the right arrow when the index is
			// at maximum
			if (index + 1 == $images.length - 1) {
				$(this).hide();
			} else {
				// Show left arrow
				$left.show();
			}

			isDone = false;
			$image.fadeOut(function () {
				
				$(this).removeClass('active');
				index = index + 1;

				var $next = $images.eq(index);
				$next.fadeIn(function () {
					// thumbnail
					var $curr = $thumbnails.eq(index);
					var $before = $thumbnails.eq(index - 1);

					$curr.addClass('active');
					$before.removeClass('active');


					$(this).addClass('active');
					$active = $(this);

					isDone = true;
				});
			});
		}
	});

	// When the left arrow is clicked
	$left.click(function () {
		if (isDone && index > 0) {
			var $image = $images.eq(index);

			// Hide the left arrow when the index
			// is at the beginning (0)
			if (index - 1 == 0) {
				$(this).hide()
			} else {
				// Show right arrow
				$right.show();
			}

			isDone = false;
			$image.fadeOut(function () {
				
				$(this).removeClass('active');
				index = index - 1;

				var $previous = $images.eq(index);
				$previous.fadeIn(function () {
					var $curr = $thumbnails.eq(index);
					var $before = $thumbnails.eq(index + 1);

					$curr.addClass('active');
					$before.removeClass('active');

					$(this).addClass('active');
					$active = $(this);

					isDone = true;

				});
			});
		}
	});

	// When the preview image is clicked
	$.each($thumbnails, function (i, thumbnail) {
		var $thumbnail = $(thumbnail);

		// When the individual thumbnail is clicked
		$thumbnail.click(function () {

			var i = $(this).find('img').data('index');

			if (isDone && i !== index) {
				
				if (i > 0) {
					$left.show();
				}

				if (i !== $images.length - 1) {
					$right.show();
				}

				if (i == 0) {
					$left.hide();
				}

				if (i === $images.length - 1) {
					$right.hide();
				}

				// current thumbnail
				var $curr = $(this);

				// previous thumbnail
				var $prev = $thumbnails.eq(index);
		
				// main images
				$active.stop().fadeOut(function () {
					isDone = false;

					$(this).removeClass('active');
					$prev.removeClass('active');

					var $new = $images.eq(i);
					$new.stop().fadeIn(function () {
						$(this).addClass('active');
						$curr.addClass('active');

						$active = $(this);
						index = i;

						isDone = true;
					});
				});
			}
		});
	})



});