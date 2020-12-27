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

  // Section active

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

  $('.mfiles-slider').owlCarousel({
    loop: true,
    nav: true,
    navText: ['<span class="icon-slider-arrow-left"></span>', '<span class="icon-slider-arrow-right"></span>'],
  });

  // CAT LINKS
  const $catBtn = $('.category__btn');

  $catBtn.on('change', function () {
    let $dataCat = $(this).attr('data-cat');
    $('.select_cat option[value="' + $dataCat + '"]')
      .prop('selected', true)
      .trigger('change');
  });

  // SELECTS
  $('.select select').select2({
    minimumResultsForSearch: -1,
  });

  const $subPic = $('.single__subpic');
  const $mainPic = $('.single__mainpic img');

  $subPic.on('click', () => {
    let $currentPic = $(this).attr('src');
    $mainPic
      .fadeOut(400, () => {
        $mainPic.attr('src', $currentPic);
        $mainPic.attr('srcset', '');
      })
      .fadeIn();
  });

  const $s_topic = $('.single__tabs-topic');
  const $s_content = $('.single__tabs-content');

  $s_topic.on('click', function () {
    let t_id = $(this).attr('data-tab');
    let t_active = 't_active';
    let c_active = 'c_active';

    $s_topic.removeClass(t_active);
    $s_content.removeClass(c_active);

    $(this).addClass(t_active);
    $(`#${t_id}`).addClass(c_active);
  });

  const $singleBtn = $('.single__btn');
  const $popup = $('.popup');
  const $popupClose = $('.popup__close');

  $singleBtn.on('click', (e) => {
    e.preventDefault();
    $popup.fadeIn();
    $popup.css({ display: 'flex' });
  });

  $popupClose.on('click', () => {
    $popup.fadeOut();
  });

  // ISOTOPE
  const $ISO_CONTENT = $('.page-products__content');
  const $SELECTS = $('.selects-block');
  const $NOT_FOUND = $('#not-found');

  const $grid = $ISO_CONTENT.isotope({
    itemSelector: '.product',
  });

  let $filters = {};

  $SELECTS.on('change', (e) => {
    let $select = $(e.target);

    let $filterGroup = $select.attr('value-group');

    $filters[$filterGroup] = e.target.value;

    let $filterValue = concatValues($filters);

    $grid.isotope({ filter: $filterValue });

    $grid.on('arrangeComplete', (e, items) => {
      if (items.length == 0) {
        $NOT_FOUND.css({ display: 'block' });
      } else {
        $NOT_FOUND.css({ display: 'none' });
      }
    });
  });

  function concatValues(obj) {
    let value = '';
    for (let prop in obj) {
      value += obj[prop];
    }
    return value;
  }
});
