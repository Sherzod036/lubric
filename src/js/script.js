$(() => {
  function fullpageInit() {
    $('#fullpage').fullpage({
      anchors: ['hero', 'categories', 'catalog', 'about', 'mfiles', 'contacts'],
      sectionsColor: ['#0445a3', '#ffcc29', '#fff', '#0445a3', '#fff', '#0445a3'],
      scrollingSpeed: 1000,
      navigation: true,
      onLeave: (origin, destination, direction) => {
        let section = destination.item;
        let title = section.querySelector('.title_anime');

        title.innerHTML = title.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        // Vars
        let letters = section.querySelectorAll('.letter');

        const tl = new TimelineMax({ delay: 0.3 });

        tl.staggerFrom(letters, 0.6, { opacity: 0, ease: Power4.easeInOut }, 0.06, 0);
      },
    });
  }

  fullpageInit();

  let $scrollDown = $('.scroll-down');

  $scrollDown.on('click', (e) => {
    e.preventDefault();
    fullpage_api.moveSectionDown();
  });

  $('.tabscaption li').on('click', function () {
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active')
      .closest('.tabs')
      .find('.tabcontent')
      .removeClass('active')
      .eq($(this).index())
      .addClass('active');
  });

  // Sliders
  $('.catalog-slider').owlCarousel({
    loop: true,
    nav: true,
    navText: ['<span class="icon-slider-arrow-left"></span>', '<span class="icon-slider-arrow-right"></span>'],
  });
});
