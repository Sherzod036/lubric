$(() => {
  function fullpageInit() {
    $('#fullpage').fullpage({
      anchors: ['hero', 'categories', 'catalog', 'contacts'],
      sectionsColor: ['#0445a3', '#ffcc29', '#fff', '#0445a3'],
      scrollingSpeed: 1000,
      navigation: true,
      onLeave: (origin, destination, direction) => {
        let section = destination.item;
        let title = section.querySelector('.title_anime');

        title.innerHTML = title.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        let letters = section.querySelectorAll('.letter');

        const tl = new TimelineMax();

        tl.staggerFrom(letters, 0.6, { opacity: 0, ease: Power4.easeInOut }, 0.06, 0);
      },
    });
  }

  fullpageInit();

  let $scrollDown = $('.scroll-down');

  $scrollDown.on('click', (e) => {
    e.preventDefault();
    $.fn.fullpage.moveSectionDown();
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

  // Flickity
  $('.catalog-slider').flickity({
    cellAlign: 'left',
    contain: true,
    draggable: false,
    pageDots: false,
    wrapAround: true,
  });
});
