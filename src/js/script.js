$(() => {
  function fullpageInit() {
    $('#fullpage').fullpage({
      anchors: ['hero', 'categories', 'catalog', 'about', 'mfiles', 'contacts'],
      sectionsColor: [
        '#0445a3',
        '#ffcc29',
        '#fff',
        '#0445a3',
        '#fff',
        '#0445a3',
      ],
      scrollingSpeed: 1000,
      navigation: true,
      onLeave: (origin, destination, direction) => {
        let section = destination.item;
        let title = section.querySelector('.title_anime');

        title.innerHTML = title.textContent.replace(
          /\S/g,
          "<span class='letter'>$&</span>"
        );

        // Vars
        let letters = section.querySelectorAll('.letter');

        const tl = new TimelineMax({ delay: 0.3 });

        tl.staggerFrom(
          letters,
          0.5,
          { opacity: 0, ease: Power4.easeInOut },
          0.05
        );
      },
    });
  }

  // MENU
  const $buger = $('.burger');
  const $menu = $('.menu');
  const $menuClose = $('.menu__list-close');
  const $menuList = $('.menu__list');
  const $verticalBlock = $('.vertical-block');
  const $topLink = $('.top-link');
  const $botLink = $('.bot-link');
  const $menuListCategory = $('.menu__list-category');
  const $subscribeTitle = $('.menu__list-subscribe-title');
  const $subscribeItem = $('.menu__list-subscribe-item');

  const menuTl = new TimelineMax({ paused: true });

  menuTl
    .to($menu, 0.4, { display: 'block' })
    .fromTo(
      $verticalBlock,
      0.3,
      { x: '100%', opacity: 0 },
      { x: '0%', opacity: 1 }
    )
    .fromTo(
      $menuList,
      0.4,
      { x: '100%', opacity: 0 },
      { x: '0%', opacity: 1 },
      '-=0.2'
    )
    .from($topLink, 0.3, { y: 50, opacity: 0 })
    .staggerFrom(
      $menuListCategory,
      0.3,
      {
        y: 50,
        opacity: 0,
      },
      0.1
    )
    .staggerFrom($botLink, 0.3, { y: 60, opacity: 0 }, 0.1)
    .from($subscribeTitle, 0.3, { y: 50, opacity: 0 })
    .staggerFrom($subscribeItem, 0.3, { x: -50, opacity: 0 }, 0.1);

  $buger.on('click', function (e) {
    e.preventDefault();
    menuTl.play();
  });

  $menuClose.on('click', function () {
    menuTl.reverse(-1);
  });

  $('.menu__list-link').on('click', function () {
    menuTl.reverse(-1);
  });

  const w_width = $(window).width();

  if (w_width > 1200) {
    fullpageInit();
  }

  // Section active

  let $scrollDown = $('.scroll-down');

  $scrollDown.on('click', (e) => {
    e.preventDefault();
    fullpage_api.moveSectionDown();
  });

  let $tablogoZoon = $('.logo_zoon span.tablogo');
  let $tablogoSynheon = $('.logo_synheon span.tablogo');
  let $tablogoGraumann = $('.logo_graumann span.tablogo');

  let bW = '1px solid #fff';
  let bS = '1px solid #d0d0d0';

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

    $('span.tablogo').removeClass('default-tab');

    let _this = $(this);

    if (_this.hasClass('logo_zoon')) {
      _this.find('.tablogo').css({ borderRight: bW, borderBottom: bS });
      $tablogoSynheon.css({
        borderBottom: bW,
        borderRight: bS,
      });
      $tablogoGraumann.css({ borderRight: bS });
    } else if (_this.hasClass('logo_synheon')) {
      _this.find('.tablogo').css({ borderRight: bW, borderBottom: bS });
      $tablogoZoon.css({
        borderRight: bS,
        borderBottom: bS,
      });
      $tablogoGraumann.css({ borderRight: bS });
    } else if (_this.hasClass('logo_graumann')) {
      _this.find('.tablogo').css({ borderRight: bW });
      $tablogoZoon.css({ borderBottom: bW });
      $tablogoSynheon.css({ borderRight: bS });
    }
  });

  // Sliders
  $('.catalog-slider').owlCarousel({
    loop: true,
    nav: true,
    navText: [
      '<span class="icon-slider-arrow-left"></span>',
      '<span class="icon-slider-arrow-right"></span>',
    ],
  });

  $('.mfiles-slider').owlCarousel({
    loop: true,
    nav: true,
    navText: [
      '<span class="icon-slider-arrow-left"></span>',
      '<span class="icon-slider-arrow-right"></span>',
    ],
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

  // MOBI MENU

  const $dropdown = $('.dropdown');
  const $mobiBurger = $('.mobi-burger');

  $mobiBurger.on('click', function (e) {
    e.preventDefault();
    $dropdown.slideToggle().css({ display: 'flex' });
  });
});
