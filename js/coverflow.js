/**
 * Creates OS X style coverflow effect using CSS3 styles and transforms
 * @author Tomek Augustyn (@blog2t)
 *
 * Inspired by Hakim's demo: http://lab.hakim.se/scroll-effects/
 */
var coverflow = {

	scrWrapper: null,

	imageClickHandler: function(event) {
		console.log(event.target.dataset.id);

		// scrWrapper.scrollLeft = event.target.dataset.id * 49;
		//TODO implement auto scrolling to the clicked image
	},


	bind: function(coverflowDOM) {

		var list = coverflowDOM.querySelector('ul');

		// Create separate div for a scroller bar
		var scrollerWrapper = document.createElement('div');
		scrollerWrapper.classList.add('scroller-wrapper');

		scrWrapper = scrollerWrapper;

		// And add the scroller content
		var scroller = document.createElement('div');
		scroller.classList.add('scroller');
		// Scroller width has to be the same as the width of the list
		scroller.style.width = list.scrollWidth + 'px';

		scrollerWrapper.appendChild(scroller);
		coverflowDOM.appendChild(scrollerWrapper);

		var scrollTarget = 1;
		var scrollSnapped = 0;
		var item = null;
		var itemOffset = null;
		var normOffset = null;
		var opacity = null;
		var itemClass = null;
		var scrollLeft = null;
		var currentId = null;
		var delta = 1;

		var items = Array.prototype.slice.apply(list.children);
		var viewWidth = list.offsetWidth;
		var halfViewWidth = Math.floor(list.offsetWidth / 2);
		var numItems = items.length;

		for (var i = 0; i < numItems; i++) {
			items[i]._offsetLeft = items[i].offsetLeft;
			items[i].addEventListener('click', this.imageClickHandler, false);
		}

		var leftMargin = items[0]._offsetLeft;

		return (function() {

			(function animloop() {
				requestAnimFrame(animloop);
				update();
			})();

			function update() {
				scrollLeft = scrollerWrapper.scrollLeft;
				// Discretise the scrollbar position
				scrollSnapped = Math.round(scrollLeft / numItems) * numItems;
				currentId = Math.round(scrollSnapped / 54);
				delta = scrollSnapped - scrollTarget;
				scrollTarget += delta * 0.1;
				list.style.left = (-scrollTarget) + 'px';

				// Quit when it slows down enough
				if (Math.abs(delta) > 0.01) {

					for (var i = 0; i < numItems; i++) {
						item = items[i];
						itemOffset = item._offsetLeft - leftMargin;
						normOffset = (itemOffset - scrollTarget) / halfViewWidth;
						opacity = 1.2 - Math.abs(Math.pow(normOffset / 0.8, 8));
						item.style.opacity = opacity;
						itemClass = item.className;

						if (itemClass.length) {
							item.classList.remove('prev');
							item.classList.remove('next');
							item.classList.remove('current');
						}

						if (currentId > i) {
							item.classList.add('prev');
							item.style.zIndex = i;
						}

						else if (currentId < i) {
							item.classList.add('next');
							item.style.zIndex = numItems - i;
						}

						else {
							item.classList.add('current');
							item.style.zIndex = numItems;
						}

						// item.innerHTML = i + ':' + opacity;
					}
				}
			}
		})();
	}
};