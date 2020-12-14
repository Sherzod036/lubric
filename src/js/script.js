$(() => {
  function fullpageInit() {
    $('#fullpage').fullpage({
      licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
      anchors: ['hero', 'categories', 'catalog'],
      sectionsColor: ['#0445a3', '#ffcc29', '#fff'],
      scrollingSpeed: 1000,
      navigation: true,
    });
  }

  fullpageInit();

  let $scrollDown = $('.scroll-down');

  $scrollDown.on('click', (e) => {
    e.preventDefault();
    $.fn.fullpage.moveSectionDown();
  });
});
